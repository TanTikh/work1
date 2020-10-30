
const projectFolder = "C:/Users/-user-/Downloads/OpenServer/domains/new-majoroff",
	// const projectFolder = require("path").basename(__dirname),
	sourceFolder = "#src";

const path = {
	build: {
		html: projectFolder + "/",
		css: projectFolder + "/css/",
		js: projectFolder + "/js/",
		img: projectFolder + "/img/",
		fonts: projectFolder + "/fonts/",
		php: projectFolder + "/",
		phpMailer: projectFolder + "/phpmailer/"
	},
	src: {
		html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
		css: [sourceFolder + "/scss/**/*.scss", "!" + sourceFolder + "/scss/**/_*.scss"], // sourceFolder + "/scss/style.scss"
		js: sourceFolder + "/js/**/*.js",
		img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico}",
		fonts: sourceFolder + "/fonts/*.ttf",
		php: sourceFolder + "/*.php",
		phpMailer: sourceFolder + "/phpmailer/*.php"
	},
	watch: {
		html: sourceFolder + "/**/*.html",
		css: sourceFolder + "/scss/**/*.scss",
		js: sourceFolder + "/js/**/*.js",
		img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico}",
		php: sourceFolder + "/*.php",
	},
	clean: "./" + projectFolder + "/"
}

const { src, dest } = require('gulp'),
	gulp = require('gulp'),
	browsersync = require("browser-sync").create(),
	del = require("del"),
	scss = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	group_media = require("gulp-group-css-media-queries"),
	clean_css = require("gulp-clean-css"),
	rename = require("gulp-rename"),
	uglify = require("gulp-uglify-es").default,
	imagemin = require("gulp-imagemin"),
	ttf2woff = require('gulp-ttf2woff'),
	ttf2woff2 = require('gulp-ttf2woff2'),
	babel = require('gulp-babel'),
	include = require('gulp-include');




function clean() {
	return del(path.clean);
}



function browserSync(done) {
	browsersync.init({
		server: {
			// baseDir: "./" + projectFolder + "/"
			baseDir: projectFolder
		},
		port: 3000,
		notify: false
	})
	done();
}

function html() {
	return src(path.src.html)
		.pipe(include())
		.pipe(dest(path.build.html))
		// .pipe(browsersync.stream());
		.on("end", browsersync.reload);

}
function php() {
	return src(path.src.php)
		// .pipe(include())
		.pipe(dest(path.build.php))
		// .pipe(browsersync.stream());
		.on("end", browsersync.reload);
}
function phpMailer() {
	return src(path.src.phpMailer)
		// .pipe(include())
		.pipe(dest(path.build.phpMailer))
		// .pipe(browsersync.stream());
		.on("end", browsersync.reload);
}

function css() {
	return src(path.src.css)
		.pipe(
			scss({
				outputStyle: "expanded"
			})
		)
		.pipe(
			group_media()
		)
		.pipe(
			autoprefixer({
				grid: true,
				cascade: true
			})
		)
		.pipe(dest(path.build.css))
		.pipe(clean_css())
		.pipe(
			rename({
				extname: ".min.css"
			})
		)
		.pipe(dest(path.build.css))
		.on("end", browsersync.reload);
	// .pipe(browsersync.stream());
}

function js() {
	return src(path.src.js)
		.pipe(include())
		.pipe(dest(path.build.js))
		// .pipe(babel({
		// 	presets: ['@babel/env']
		// }))
		.pipe(
			uglify()
		)
		.pipe(
			rename({
				extname: ".min.js"
			})
		)
		.pipe(dest(path.build.js))
		.on("end", browsersync.reload);
	// .pipe(browsersync.stream());
	// return j;
}

function images() {
	return src(path.src.img)
		.pipe(imagemin([
			imagemin.gifsicle({ interlaced: true }),
			imagemin.mozjpeg({ quality: 75, progressive: true }),
			imagemin.optipng({ optimizationLevel: 5 }),
			imagemin.svgo({
				plugins: [
					{ removeViewBox: true },
					{ cleanupIDs: false }
				]
			})
		]))
		.pipe(dest(path.build.img))
		.on("end", browsersync.reload);
	// .pipe(browsersync.stream());
}

function fonts() {
	src(path.src.fonts)
		.pipe(ttf2woff())
		.pipe(dest(path.build.fonts));
	return src(path.src.fonts)
		.pipe(ttf2woff2())
		.pipe(dest(path.build.fonts));
};


function watchFiles(done) {

	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.img], images);
	gulp.watch([path.watch.php], php);
	done();
}
// function cb() { }

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts, php, phpMailer));
const watch = gulp.parallel(build, watchFiles, browserSync);



exports.fonts = fonts;
// exports.PHPMailer = PHPMailer;
// exports.php = php;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;