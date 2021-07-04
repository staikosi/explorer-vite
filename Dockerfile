FROM node:14.7.0 as build

WORKDIR /app

COPY . /app

RUN npm ci && npm run build

FROM nginx:1.20.1

COPY --from=build /app/dist /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]