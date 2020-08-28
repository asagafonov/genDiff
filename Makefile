install:
	npm install

help:
	gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

stylish:
	gendiff ./__fixtures__/before.json ./__fixtures__/after.json

plain:
	gendiff -f plain ./__fixtures__/before.json ./__fixtures__/after.json

json:
	gendiff -f json ./__fixtures__/before.json ./__fixtures__/after.json

jest:
	npx --node-arg --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
