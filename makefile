build:
	rm -rf frontend/build
	npm run build

start:
	npm start

start-server:
	npm start

start-client:
	cd frontend && npm start

start-app:
	make -j 2 start-client start-server

lint:
	cd frontend; npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .

install: 
	npm install
	cd frontend && npm install


deploy: install build
