gendiff:
	node home/liya/frontend-project-46/src/gendiff.js
lint:
	npx eslint .
lintfix:
	npx eslint --fix .
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
