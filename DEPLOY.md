# Woolley 官网部署手册（腾讯云）

## 当前线上状态

| 项 | 值 |
|---|---|
| 域名 | `woolleygoods.com` + `www.woolleygoods.com` |
| 服务器 | 腾讯云 `43.136.117.175`（SSH 别名 `tencent-2` / `tx-gz-2`，Ubuntu 24.04，root） |
| 架构 | 静态导出（`next.config.ts` 的 `output: "export"`）→ nginx 直接托管，**无运行时依赖** |
| 站点根目录 | `/var/www/woolleygoods` |
| 证书 | Let's Encrypt，`/etc/letsencrypt/live/woolleygoods.com/`（SAN 含裸域 + www），自动续期 |
| DNS | 阿里云 hichina（`dns1/dns2.hichina.com`），A 记录指向 `43.136.117.175` |
| 续期 | `certbot.timer` 已 enable；`certbot renew --dry-run` 通过 |
| 上次恢复 | 2026-10-31（服务器于 2026-10-01 被重装，站点全丢后按本手册重建） |

## 为什么是静态导出

原项目是 vinext + React + Cloudflare Worker 架构，不能直接扔给 nginx。做法：
`next.config.ts` 加 `output: "export"` + `images.unoptimized`，`vinext build` 产出纯静态站到
`dist/client/`，rsync 上传后由 nginx serve。无 Node 进程、无数据库，最稳。

## 部署步骤

```bash
cd ~/Documents/Codex/2026-08-04/new-chat

# 1. 构建（产物在 dist/client/）
npm install && npx vinext build

# 2. 同步到服务器（--delete 保证删除已下线文件）
rsync -az --delete dist/client/ tencent-2:/var/www/woolleygoods/

# 3. 校验（应全部 200，未知路径 404）
for p in / /about /products /ai-lab /en /products/th-1; do
  curl -s -o /dev/null -w "%{http_code} $p\n" \
    -H "Host: www.woolleygoods.com" http://43.136.117.175$p
done
```

nginx 配置变更时同步 `ops/` 下的文件（见下表），然后 `nginx -t && systemctl reload nginx`。

## 服务器配置清单（`ops/`）

| 本地文件 | 服务器路径 | 作用 |
|---|---|---|
| `ops/nginx/www.woolleygoods.com` | `/etc/nginx/sites-available/www.woolleygoods.com` | 站点主配置（80 跳转 + 443 托管），软链到 `sites-enabled/` |
| `ops/nginx/woolley-security-headers.conf` | `/etc/nginx/snippets/woolley-security-headers.conf` | 安全响应头（HSTS/CSP/X-Frame-Options 等） |
| `ops/nginx/options-ssl-nginx.conf` | `/etc/letsencrypt/options-ssl-nginx.conf` | TLS 参数（certbot nginx 插件默认会生成，这里随仓库备份） |
| `ops/nginx/00-security-hardening.conf` | `/etc/nginx/conf.d/00-security-hardening.conf` | `server_tokens off` |
| `ops/ssh/00-woolley-hardening.conf` | `/etc/ssh/sshd_config.d/00-woolley-hardening.conf` | 仅密钥登录、禁 root 密码 |
| `ops/fail2ban/sshd.local` | `/etc/fail2ban/jail.d/sshd.local` | SSH 防爆破 |

`ssl_dhparam`：`/etc/letsencrypt/ssl-dhparams.pem`（2048 位，openssl dhparam 生成，不入库）。

## clean-URL 注意事项

vinext 静态导出是**扁平 `.html`**（`about.html` / `products.html` / `en.html`），
所以 nginx 必须用 `try_files $uri.html $uri $uri/ =404;`，
否则 `/products`、`/en` 会命中目录 403、`/about` 会回退到首页。

## 证书

```bash
# 签发（裸域 + www 需要显式列两个 -d）
ssh tencent-2 'certbot certonly --webroot -w /var/www/letsencrypt \
  -d woolleygoods.com -d www.woolleygoods.com \
  --email sylviacccyu@gmail.com --agree-tos --non-interactive'

# 续期演练
ssh tencent-2 'certbot renew --dry-run'

# 改完 nginx 配置后
ssh tencent-2 'nginx -t && systemctl reload nginx'
```

ACME HTTP-01 需要 80 端口的 `/.well-known/acme-challenge/` 指向 `/var/www/letsencrypt`，
**不要把这条 location 删掉**，否则自动续期会失败。

## 踩坑记录

1. **hichina NS 会偶发 SERVFAIL**：Let's Encrypt 二次校验时可能拿到 `SERVFAIL looking up A`，
   表现为签发失败。NS 本身配置正常、重试即过。若频繁失败，考虑把 NS 切到 DNSPod
   （`bigmonsterclaw.com` 已经用 DNSPod，稳定）。
2. **`certonly --webroot` 不会生成 `options-ssl-nginx.conf` 和 `ssl-dhparams.pem`**，
   这两份要手工补（见 `ops/` 表）。用 `certbot --nginx` 才会自动生成。
3. **nginx 配置漏 `root` / `index` 会静默回落到默认站点**，表现为返回 "Welcome to nginx!"。
   改完配置务必用 `curl -H "Host: ..." http://127.0.0.1/` 验证内容而不只看状态码。

## 备份约定（吸取 2026-10-01 重装事故的教训）

- 站点是静态的，**任何时候都能从本仓库 `dist/client/` 重建**，这是最可靠的备份。
- `ops/` 必须入库——服务器被重装后 nginx 配置、证书路径、清理 URL 规则全靠它复原。
- 服务器上做一次快照（腾讯云整机快照），避免再出现"重装即全丢"。
- 其余站点（塔罗 / solo / neuroviz / brainos）共用同一台服务器，见
  `~/.qclaw/workspace/server-deploy-playbook_20260804.md`。
