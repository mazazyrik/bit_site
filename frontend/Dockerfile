
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./


RUN npm install && \
    npm install webpack-cli@latest --save-dev

COPY . .

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY src/  /usr/share/nginx/html/src/
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]