build:
	rm -rf frontend/build
	npm run build
install:
	npm install

start:
	npx start-server -s ./frontend/build
