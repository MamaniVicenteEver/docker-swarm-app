FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*

# Copiar archivos locales al contenedor
COPY html/ /usr/share/nginx/html

EXPOSE 80