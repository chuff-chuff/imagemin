const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const pngquant = require("imagemin-pngquant");
const mozjpeg = require("imagemin-mozjpeg");

//画像圧縮
gulp.task("imagemin", () => {
  return gulp
    .src("./original/*.{png,jpg,jpeg,gif,svg}")
    .pipe(changed("./compressed"))
    .pipe(
      imagemin([
        pngquant({
          quality: [.7, .85]
        }),
        mozjpeg({
          quality: 85
        }),
        imagemin.svgo(),
        imagemin.gifsicle()
      ])
    )
    .pipe(gulp.dest("./compressed"));
});

//ファイルの監視
gulp.task("watch", () => {
  gulp.watch("./original/*.{png,jpg,jpeg,gif,svg}", gulp.task("imagemin"));
});

//デフォルトのタスク作成
gulp.task("default",
  gulp.series("imagemin", "watch")
);