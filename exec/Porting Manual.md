# CakeForU Porting Manual
- [Web FrontEnd](#web-frontend)
- [Web BackEnd](#web-backend)
- [Signaling Server](#signal-server)
- [Game Server](#game-server)
- [IOT](#iot)
- [Scenario](#scenario)

## Web FrontEnd
---
### What you need
- Visual Studio Code 1.75.1
- npm 8.19.3
- Node 16.19.1

### Dependencies
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.11.16",
    "@reduxjs/toolkit": "^1.9.1",
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.3.4",
    "gsap": "^3.11.5",
    "html2canvas": "^1.4.1",
    "http-proxy-middleware": "^2.0.6",
    "konva": "^8.4.2",
    "localforage": "^1.10.0",
    "match-sorter": "^6.3.1",
    "moment": "^2.29.4",
    "query-string": "^8.1.0",
    "react": "^18.2.0",
    "react-alice-carousel": "^2.7.0",
    "react-datepicker": "^4.11.0",
    "react-daum-postcode": "^3.1.1",
    "react-dom": "^18.2.0",
    "react-infinite-scroll-component": "^6.1.0",
    "react-konva": "^18.2.5",
    "react-konva-utils": "^0.3.2",
    "react-loader-spinner": "5.3.4",
    "react-redux": "^8.0.5",
    "react-responsive-carousel": "^3.2.23",
    "react-router-dom": "^6.9.0",
    "react-scripts": "^5.0.1",
    "react-select": "^5.7.2",
    "react-slick": "^0.29.0",
    "slick-carousel": "^1.8.1",
    "sort-by": "^1.2.0",
    "styled-components": "^5.3.8",
    "uuid": "^9.0.0",
    "uuidv4": "^6.2.13",
    "web-vitals": "^2.1.4"

### 환경변수
.env :
REACT_APP_BACKEND_URL="https://j8a604.p.ssafy.io/api"
REACT_APP_FRONTEND_URL="http://j8a604.p.ssafy.io"

## NGINX configuration
---

### root
---
```
upstream lb {
    least_conn ;
    server 15.164.236.172;
    server j8a604.p.ssafy.io;
}

server {
  listen 80;
  server_name j8a604.p.ssafy.io;

  location / {
    return 301 https://$host$request_uri;
  }

  location /.well-known/acme-challenge/ {
    root /var/www/certbot;
  }

  location /api/ {
    proxy_pass http://backend:8080/;
    proxy_http_version 1.1;
  }

  client_max_body_size 0;
}

server {
    listen 443 ssl;
    server_name j8a604.p.ssafy.io;
    
    # Proxy requests to frontend service
    location / {
        proxy_pass http://frontend:80;
        proxy_http_version 1.1;
    }

    # Proxy requests to backend service
    location /api/ {
        proxy_pass http://backend:8080/;
        proxy_http_version 1.1;
    }

    # SSL certificate settings
    ssl_certificate /etc/letsencrypt/live/j8a604.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/j8a604.p.ssafy.io/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
 
   client_max_body_size 0;
}
```

### frontend
---
```
server {
  listen 80;
  server_name j8a604.p.ssafy.io;

  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
}
```

## Web BackEnd
---
### What you need
- IntelliJ IDEA 2022.3
- Java 11
- Gradle 7.6.1

### Dependencies
```

```
### Application.yml
---
### JPA (Case Sensitivity)
- jpa.hibernate.namig.physical-strategy: org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl

### Spring Security (OAUTH2)
- security.oauth2.client.registration.google.clientId: {YOUR_ID}
- security.oauth2.client.registration.google.clientSecret: {YOUR_PASSWORD}
- security.oauth2.client.registration.google.scope: email, profile
- security.oauth2.client.registration.google.redirect-uri: {YOUR_REDIRECT_ADDRESS}

