# bigmonsterclaw.com / woolleygoods.com — 服务器重装后全站恢复交接（2026-10-31）

## 一句话

服务器 `43.136.117.175` 于 **2026-10-01 18:29 被重装系统**（第二次重装，第一次是 2026-08-03），
nginx、全部站点、证书、systemd 服务清零，但 **DNS 记录一直完好**——所以表现为"域名还在、站点全挂"。
2026-10-31 已按本地源码重建 **12 个域名，全部 200 + HTTPS 正常 + 自动续期已配**。

## 当前线上全量清单（已验证）

| 域名 | 类型 | 服务器目录 | 端口 | systemd | 源（本机） |
|---|---|---|---|---|---|
| `woolleygoods.com` / `www` | 静态导出 | `/var/www/woolleygoods` | 80/443 | nginx 直出 | `~/Documents/Codex/2026-08-04/new-chat` |
| `brainos.bigmonsterclaw.com` | 静态 | `/var/www/brainos` | 80/443 | nginx 直出 | `~/projects/BrainDataOS/deploy` |
| `ai.bigmonsterclaw.com` | 静态 | `/var/www/ai-landing` | 80/443 | nginx 直出 | `~/.qclaw/workspace/nowis-landing` |
| `szzhiyuan.bigmonsterclaw.com` | 静态 | `/var/www/szzhiyuan-static/current` | 80/443 | nginx 直出 | `~/Documents/Codex/2026-06-03/new-chat/outputs/shenzhen-zhiyuan-mvp` |
| `jh.bigmonsterclaw.com` | Node + WS | `/var/www/youling-mojin` | 8090 | `youling-mojin` | `~/WorkBuddy/2026-08-02-22-22-13/youling-mojin` |
| `cv.bigmonsterclaw.com` | Node | `/opt/miaojian/app` | 3001 | `miaojian` | `~/.qclaw/workspace/miaojian-app` |
| `gaokaozy.bigmonsterclaw.com` | vinext SSR | `/var/www/gaokao` | 3002 | `gaokao` | `~/Documents/Codex/2026-06-08/985-211` |
| `solo.bigmonsterclaw.com` | vinext SSR | `/var/www/solo` | 8787 | `solo` | `~/Documents/Codex/2026-08-19/.../outputs/solo-export-20260820` |
| `neuroviz.bigmonsterclaw.com` | FastAPI/uvicorn | `/home/ubuntu/neuroviz` | 8080 | `neuroviz` | `~/projects/neuroviz` |
| `woolleytarot.bigmonsterclaw.com` | 静态 + FastAPI | `/var/www/tarot` + `/opt/tarot-api/src` | 8000 | `tarot-api` | `~/Desktop/Tarot_Web` + `~/Documents/ChatGPT/蒸馏模型/src/tarot_api` |
| `tarot.bigmonsterclaw.com` | 同上（暂搁置域） | 同上 | — | — | 同上 |

DNS 托管：`woolleygoods.com` → 阿里云 hichina；`bigmonsterclaw.com` → 腾讯云 DNSPod。
**恢复过程无需改任何 DNS**，A 记录一直指向 `43.136.117.175`。

## 服务器运行环境

| 项 | 值 |
|---|---|
| 主机 | 腾讯云轻量云 `43.136.117.175`，Ubuntu 24.04.4，3.7G RAM |
| SSH | 别名 `tencent-2` / `tx-gz-2`，用户 `root`（密钥 `~/.ssh/tencent`） |
| nginx | 1.24.0，`/etc/nginx/sites-enabled/` + `conf.d/` |
| 证书 | certbot 2.9.0，Let's Encrypt，11 张，`certbot.timer` 已 enable |
| Node | v22.23.4（NodeSource） |
| Python | 3.12.3（venv） |
| 防火墙 | **ufw 已启用**：只放行 22/80/443，其余入站全拒 |
| 远程装包 | `registry.npmjs.org` / `pypi.org` / `github.com` / `hf-mirror.com` / `modelscope.cn` 均可达 |

## 服务与自启

```
nginx  youling-mojin  miaojian  gaokao  solo  neuroviz  tarot-api
```
全部 `systemctl is-enabled` = enabled、`is-active` = active。

## 数据恢复情况

| 数据 | 位置 | 状态 |
|---|---|---|
| solo 云端数据（用户笔记等，AES-256 加密） | `/var/lib/solo/state.json` | ✅ 从 COS 桶 `solo-backup-1410922640` 恢复（最新 `solo-backup-20260920-042301.tar.gz`，2468B 真实数据） |
| solo 主人令牌 | `/etc/solo.env`（600） | ✅ 用本机钥匙串 `solo.bigmonsterclaw.com` 的原令牌，**旧数据才能解** |
| solo 异地备份 cron | `/home/ubuntu/backup-solo.sh`，`23 4 * * *` | ✅ 已重建并实测上传成功 |
| woolleygoods 静态产物 | `/var/www/woolleygoods` | ✅ 来自本机 `dist/client/`（41M，128 文件，21 条路由） |
| neuroviz 前端 WS 地址 | `/home/ubuntu/neuroviz/frontend/index.html` | ✅ 已改写为 `wss://neuroviz.bigmonsterclaw.com/ws` |
| cv 密钥 | `/opt/miaojian/app/.env`（600） | ✅ 从本机同步（DEEPSEEK / JWT / SMS 配置） |

### 无法恢复的

- **n8n 工作流**：Docker 卷已清，**无导出文件**，无法恢复。
- **stock-analysis 后端**：只有 skill，**无源码**，无法恢复。
- **塔罗站的 ollama 模型**：2026-09-18 上线时服务器上的 ollama **二进制就没装成功**（部署记录原文："binary 未生成"），
  所以站点一直跑 `reader.py` 本地规则引擎兜底。恢复后状态与事故前一致。

## 踩坑清单（下次重建照着做）

1. **静态导出的 clean-URL**：vinext 产物是扁平 `.html`，nginx 必须 `try_files $uri.html $uri $uri/ =404;`，
   否则 `/products`、`/en` 命中目录 403、`/about` 回退首页。
2. **nginx 配置漏 `root` / `index` 会静默回落到默认站点**，返回 "Welcome to nginx!"——
   改完务必 `curl -H "Host: ..." http://127.0.0.1/` 看内容，别只看状态码。
3. **`certonly --webroot` 不生成** `options-ssl-nginx.conf` 和 `ssl-dhparams.pem`，要手工补
   （`openssl dhparam -out /etc/letsencrypt/ssl-dhparams.pem 2048`）。
4. **Node 服务 + systemd `MemoryDenyWriteExecute=true` 会崩**：V8 JIT 需要 mprotect PROT_EXEC，
   报 `V8_Fatal Check failed: 12 == errno` + core dump。cv 的 `miaojian.service` 已移除该行，
   其余加固项保留。
5. **相对导入的包要按包运行**：`tarot_api/main.py` 用 `from .cards import ...`，
   必须是 `/opt/tarot-api/src/tarot_api/` 结构 + `uvicorn tarot_api.main:app`，
   直接 `uvicorn main:app` 会 ImportError。
6. **tarot_api 依赖数据文件** `/opt/tarot-api/data/gateway-symbol-basis.json`（只拷这一个 json，不要整包 data/，
   整包 149M 且大部分是 MLX 适配器）。
7. **rsync 会保留本机 uid/gid（501:staff）**，nginx 的 www-data 读不到 → 403。
   静态目录传完必须 `chown -R www-data:www-data`。
8. **多站点时 nginx 第一个 443 块会成为隐式 default_server**：
   请求 Host 不匹配时会串到别的站。加 `00-default-ssl.conf`（`default_server` + `return 444`）兜底。
9. **远端写 heredoc 的 `$uri` / `$host` 会被 shell 吞掉**：
   用 `ssh host 'cat > f <<EOF ... EOF'`（外层单引号）且写成 `\$uri`；不要用双引号包裹整条 ssh 命令。
10. **阿里云 hichina NS 会偶发 SERVFAIL**，Let's Encrypt 二次校验时可能报
    `DNS problem: SERVFAIL looking up A`，重试即可；频繁失败可考虑把 NS 切到 DNSPod。
11. **服务器出海不稳**：`github.com` 时通时不通（曾 136s 超时），大文件用本机下载 + rsync。

## 日常运维命令

```bash
# 站点状态
ssh tencent-2 'for s in nginx youling-mojin miaojian gaokao solo neuroviz tarot-api; do printf "%-16s %s\n" "$s" "$(systemctl is-active $s)"; done'

# 证书
ssh tencent-2 'certbot certificates'
ssh tencent-2 'certbot renew --dry-run'

# 改 nginx 后
ssh tencent-2 'nginx -t && systemctl reload nginx'

# 更新静态站（woolleygoods）
cd ~/Documents/Codex/2026-08-04/new-chat && npx vinext build && \
  rsync -az --delete dist/client/ tencent-2:/var/www/woolleygoods/ && \
  ssh tencent-2 'chown -R www-data:www-data /var/www/woolleygoods'

# 更新塔罗前端 / API
rsync -az --delete --exclude serve.py ~/Desktop/Tarot_Web/ tencent-2:/var/www/tarot/
rsync -az --delete --exclude __pycache__ ~/Documents/ChatGPT/蒸馏模型/src/tarot_api/ \
  tencent-2:/opt/tarot-api/src/tarot_api/
ssh tencent-2 'chown -R www-data:www-data /var/www/tarot && systemctl restart tarot-api'
```

## 备份约定（这次教训换来的）

1. **每台服务器先打整机快照**（腾讯云轻量云支持快照），重装前一定先快照。
2. **nginx 配置全部入库**：`ops/` 目录随代码仓库走，服务器被清空后可照此复原。
3. **用户数据必须有异地副本**：solo 已配 COS 每日备份（cron + coscmd），恢复流程见上文"数据恢复情况"。
4. **证书可用 `certonly --webroot` 重新签发**（DNS 指向不变即可），不必备份。

## 相关仓库 / 文档

- `woolleygoods` 站点：`https://github.com/sylvia-ccc/woolleygoods`（`DEPLOY.md` + `ops/`）
- 服务器运维手册：`~/.qclaw/workspace/server-deploy-playbook_20260804.md`
- 本机历史记录：`~/.qclaw/workspace/` 下 `*_deploy_*.md`、`*_redeploy_*.md`
