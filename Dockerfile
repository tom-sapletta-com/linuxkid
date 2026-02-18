FROM nginx:alpine

# Copy static site to nginx default root
COPY index.html style.css progress.js /usr/share/nginx/html/
COPY przylot/ /usr/share/nginx/html/przylot/
COPY cyberquest/ /usr/share/nginx/html/cyberquest/
COPY serwer/ /usr/share/nginx/html/serwer/
COPY automatyzacja/ /usr/share/nginx/html/automatyzacja/
COPY konteneryzacja/ /usr/share/nginx/html/konteneryzacja/
COPY kod/ /usr/share/nginx/html/kod/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
