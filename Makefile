install:
	npm install

help:
	npx babel-node bin/gendiff.js -h

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npx babel-node bin/gendiff.js before.json after.json
