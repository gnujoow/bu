#app
build

	browserify -t [ babelify --presets [ react ] ] source.js -o static/js/app.js