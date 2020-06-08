install:
	npm install

help:
	gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

json:
	gendiff before.json after.json

yml:
	gendiff before.yml after.yml

ini:
	gendiff before.ini after.ini

jest:
	npx --node-arg --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
