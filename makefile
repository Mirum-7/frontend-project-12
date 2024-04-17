build:
	rm -rf frontend/build
	npm run build

start:
	npm start

lint:
	cd frontend; npx eslint --ext js,jsx --no-eslintrc --config .eslintrc.yml .

install: 
	npm install
	cd frontend; npm install
	npm run build
