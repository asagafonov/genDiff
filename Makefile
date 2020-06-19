install:
	npm install

help:
	gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

json:
	gendiff ./__fixtures__/before1.json ./__fixtures__/after1.json

yml:
	gendiff ./__fixtures__/before.yml ./__fixtures__/after.yml

ini:
	gendiff ./__fixtures__/before.ini ./__fixtures__/after.ini

jest:
	npx --node-arg --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8
