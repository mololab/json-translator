run-win:
	yarn
	npm link

cli-d:
	del /f "C:\Program Files\nodejs\jsontt"
	del /f "C:\Program Files\nodejs\jsontt.cmd"

run-cli:
	make cli-d
	yarn
	tsdx build
	npm link
	jsontt