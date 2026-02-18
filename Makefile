.PHONY: build up stop clean

build:
	docker build -t linuxkid .

up:
	docker run -p 8080:80 --rm -d linuxkid

stop:
	docker stop $$(docker ps -q --filter "ancestor=linuxkid") 2>/dev/null || true

clean:
	docker rmi linuxkid 2>/dev/null || true

restart: stop up

help:
	@echo "Available targets:"
	@echo "  make build   - Build Docker image"
	@echo "  make up     - Run container on port 8080"
	@echo "  make stop    - Stop running container"
	@echo "  make clean   - Remove Docker image"
	@echo "  make restart - Restart container"
