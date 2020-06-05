install:
	npm install

help:
	gendiff -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	gendiff before.json after.json

test-coverage:
	npm test -- --coverage --coverageProvider=v8
