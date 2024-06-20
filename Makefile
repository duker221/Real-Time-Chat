build:
	rm -rf frontend/build
	npm run build



install:
	npm ci

start:
	npx start-server -s ./frontend/build
