server {
    listen 80;
    listen [::]:80;
    server_name woolleygoods.com www.woolleygoods.com;

    root /var/www/woolleygoods;
    index index.html;

    # ACME HTTP-01: certbot renew 需要保留这条路径
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/letsencrypt;
        try_files $uri =404;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name woolleygoods.com www.woolleygoods.com;

    root /var/www/woolleygoods;
    index index.html;

    include /etc/nginx/snippets/woolley-security-headers.conf;

    ssl_certificate     /etc/letsencrypt/live/woolleygoods.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/woolleygoods.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # vinext 静态导出是扁平 .html，clean-URL 需要先试 $uri.html
    location / {
        try_files $uri.html $uri $uri/ =404;
    }

    error_page 404 /404.html;

    # 静态资源长缓存
    location ~* \.(?:js|css|png|jpg|jpeg|gif|svg|webp|avif|mp4|webm|woff2?)$ {
        include /etc/nginx/snippets/woolley-security-headers.conf;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # 不暴露构建元数据
    location ~ /\.(?:vite|assetsignore) {
        deny all;
    }
}
