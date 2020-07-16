install:
	npm install

help:
	gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

stylish:
	gendiff ./__fixtures__/oldJSON.json ./__fixtures__/newJSON.json

plain:
	gendiff -f plain ./__fixtures__/oldJSON.json ./__fixtures__/newJSON.json

json:
	gendiff -f json ./__fixtures__/oldJSON.json ./__fixtures__/newJSON.json

jest:
	npx --node-arg --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
