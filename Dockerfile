FROM node:alpine as development 
WORKDIR /app
COPY package.json /app
RUN npm install 
COPY . /app

FROM development AS builder 
WORKDIR /app 
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

FROM nginx
EXPOSE 3000
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html