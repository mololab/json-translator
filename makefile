run-win:
	yarn
	npm link

cli-d-win:
	del /f "C:\Program Files\nodejs\jsontt"
	del /f "C:\Program Files\nodejs\jsontt.cmd"

cli-d-mac:
	sudo rm -rf /usr/local/bin/jsontt

run-only-cli:
	yarn
	tsdx build
	npm link
	jsontt

run-cli-win:
	make cli-d-win
	yarn
	tsdx build
	npm link
	jsontt

run-cli-mac:
	make cli-d-mac
	sudo yarn
	sudo tsdx build
	sudo npm link
	jsontt

link:
	sudo npm link