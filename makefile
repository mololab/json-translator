run-win:
	yarn
	npm link

cli-d:
	del /f "C:\Program Files\nodejs\jsontt"
	del /f "C:\Program Files\nodejs\jsontt.cmd"

run-only-cli:
	yarn
	tsdx build
	npm link
	jsontt

run-cli:
	make cli-d
	yarn
	tsdx build
	npm link
	jsontt