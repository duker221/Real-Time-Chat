install:
	npm install

build: install
	npm run build

start:
	npx start-server -s ./frontend/build

lint-frontend:
	make -C frontend lint