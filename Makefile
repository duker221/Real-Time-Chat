build:
	npm run build

lint-frontend:
	make -C frontend lint

install:
	npm ci


start-frontend:
	make -C frontend start