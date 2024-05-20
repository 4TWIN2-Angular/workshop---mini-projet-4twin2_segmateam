FROM nginx:la

COPY dist/vuexy /usr/share/nginx/html

EXPOSE 80
