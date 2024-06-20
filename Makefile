install:
    cd frontend && npm install

build: install
    cd frontend && npm run build

start:
	npx start-server -s ./frontend/build
