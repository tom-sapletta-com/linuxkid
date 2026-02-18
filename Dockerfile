FROM php:8.2-fpm-alpine

# Install nginx and enable curl (built into PHP, just needs libcurl)
RUN apk add --no-cache nginx curl libcurl && \
    mkdir -p /var/www/html/api /run/nginx

# Copy nginx config
COPY nginx.conf /etc/nginx/http.d/default.conf

# Copy static site
COPY index.html style.css progress.js i18n.js config.html chat-modal.js /var/www/html/
COPY api/ /var/www/html/api/
COPY przylot/ /var/www/html/przylot/
COPY cyberquest/ /var/www/html/cyberquest/
COPY serwer/ /var/www/html/serwer/
COPY automatyzacja/ /var/www/html/automatyzacja/
COPY konteneryzacja/ /var/www/html/konteneryzacja/
COPY kod/ /var/www/html/kod/

# NOTE: Mount your .env at runtime:
#   docker run -v $(pwd)/.env:/var/www/html/.env planetax

# Set permissions
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80

# Start both php-fpm and nginx
CMD sh -c "php-fpm -D && nginx -g 'daemon off;'"
