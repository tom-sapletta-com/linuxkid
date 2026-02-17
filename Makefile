.PHONY: build run stop clean

build:
	docker build -t linuxkid .

run:
	docker run -p 3000:3000 --rm -d linuxkid

stop:
	docker stop $$(docker ps -q --filter "ancestor=linuxkid") 2>/dev/null || true

clean:
	docker rmi linuxkid 2>/dev/null || true

restart: stop run

help:
	@echo "Available targets:"
	@echo "  make build   - Build Docker image"
	@echo "  make run     - Run container on port 3000"
	@echo "  make stop    - Stop running container"
	@echo "  make clean   - Remove Docker image"
	@echo "  make restart - Restart container"
