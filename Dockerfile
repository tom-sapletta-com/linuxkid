FROM python:3-alpine
WORKDIR /app
COPY index.html index.jsx ./
EXPOSE 3000
CMD ["python3", "-m", "http.server", "3000"]
