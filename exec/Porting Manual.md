# CakeForU Porting Manual

- [Web FrontEnd](#web-frontend)
- [Web BackEnd](#web-backend)
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
buildscript {
	ext {
		queryDslVersion = "5.0.0"
	}
}

plugins {
	id 'java'
	id 'org.springframework.boot' version '2.7.9'
	id 'io.spring.dependency-management' version '1.0.15.RELEASE'
	// querydsl 플러그인 추가
	id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"
}

group = 'com'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'


configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

jar{
	manifest{
		attributes 'Main-Class': 'com.a604.cake4u.BackendApplication'
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// querydsl 디펜던시 추가
	implementation "com.querydsl:querydsl-jpa:${queryDslVersion}"
	implementation "com.querydsl:querydsl-apt:${queryDslVersion}"
	// Swagger
	implementation 'io.springfox:springfox-boot-starter:3.0.0'
	implementation 'io.springfox:springfox-swagger-ui:3.0.0'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.boot:spring-boot-starter-mustache'
	//  security
	implementation 'org.springframework.boot:spring-boot-starter-security'
	implementation 'org.springframework.boot:spring-boot-starter-oauth2-client'
	implementation 'org.springframework.boot:spring-boot-starter-validation'
	implementation 'io.jsonwebtoken:jjwt-api:0.11.2'
	runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.2'
	runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.2'
	//  database
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	runtimeOnly 'com.mysql:mysql-connector-j'
	//  file upload dependency
	implementation 'commons-io:commons-io:2.6'
	implementation 'org.springframework.boot:spring-boot-starter-mail'

	implementation group: 'org.springframework.cloud', name: 'spring-cloud-starter-aws', version: '2.2.6.RELEASE'
	implementation group: 'org.springframework.cloud', name: 'spring-cloud-aws-context', version: '2.2.6.RELEASE'
	implementation group: 'org.springframework.cloud', name: 'spring-cloud-aws-autoconfigure', version: '2.2.6.RELEASE'

	//  lombok
	compileOnly 'org.projectlombok:lombok'
	annotationProcessor 'org.projectlombok:lombok'

	//  spring test
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'org.springframework.security:spring-security-test'

	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	annotationProcessor 'org.springframework.boot:spring-boot-configuration-processor'
	implementation group: 'org.json', name: 'json', version: '20220924'

	//  JUnit4
	testImplementation('org.junit.vintage:junit-vintage-engine') {
		exclude group: "org.hamcrest", module: "hamcrest-core"
	}
}

// querydsl 사용할 경로
def querydslDir = "$buildDir/generated/'querydsl'"

// JPA 사용여부 및 사용 경로
querydsl {
	jpa = true
	querydslSourcesDir = querydslDir
}

// build시 사용할 sourceSet 추가 설정
sourceSets {
	main.java.srcDir querydslDir
}


// querydsl 컴파일 시 사용할 옵션 설정
compileQuerydsl {
	options.annotationProcessorPath = configurations.querydsl
}

// querydsl이 compileClassPath를 상속하도록 설정
configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
	querydsl.extendsFrom compileClasspath
}
```

### Application.yml

```
spring:
  datasource:
    url: jdbc:mysql://${MYSQL_ENDPOINT}/${DB_NAME}?serverTimezone=UTC
    username: ${USERNAME}
    password: ${PASSWORD}
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    database: mysql
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    open-in-view: false
    show-sql: false
    generate-ddl: true
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
      open-in-view: false
  messages:
    basename: i18n/exception
    encoding: UTF-8
  security:
    oauth2.client:
      registration:
        google:
          clientId: ${CLIENT_ID}
          clientSecret: ${CLIENT_SECRET}
          scope:
            - email
            - profile
        naver:
          client-id: ${CLIENT_ID}
          client-secret: ${CLIENT_SECRET}
          client-name: Naver
          authorization-grant-type: authorization_code
          redirect-uri: ${BACKEND_URL}/login/oauth2/code/naver
      provider:
        naver:
          authorization-uri: https://nid.naver.com/oauth2.0/authorize
          token_uri: https://nid.naver.com/oauth2.0/token
          user-info-uri: https://openapi.naver.com/v1/nid/me
          user_name_attribute: response

  servlet:
    multipart:
      max-request-size: -1
      max-file-size: -1
      location: ${LOCATION}

  mail:
    host: ${HOST}
    port: 587
    username: ${USERNAME}
    password: ${PASSWORD}
    properties:
      mail:
        smtp:
          starttls:
            enable: true
          auth: true
          timeout: 5000

cors:
  allowed-origins: ${ALLOWED_ORIGINS}
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS
  allowed-headers: '*'
  max-age: 3600

app:
  auth:
    tokenSecret: 926D96C90030DD58429D2751AC1BDBBC
    tokenExpiry: 1800000
    refreshTokenExpiry: 604800000
  oauth2:
    authorizedRedirectUris:
      - ${EXAMPLE/oauth/redirect}

jwt.secret: ${YOUR_JWT_SECRET}
password: ${YOUR_CUSTOM_PASSWORD}
flask.baseurl: ${YOUR_FLASK_BASEURL}
cloud:
  aws:
    credentials:
      access-key: ${YOUR_ACCESS_KEY}
      secret-key: ${YOUR_SECRET_KEY}
    stack:
      auto: false
    s3:
      bucket: cake-for-you
      url: ${YOUR_S3_ENDPOINT}
    region:
      static: ap-northeast-2

```

### DB

mysql version 8.0.32
