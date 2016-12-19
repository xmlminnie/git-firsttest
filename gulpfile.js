'use strict';
var gulp=require('gulp');
var less=require('gulp-less');
var cssnano=require('gulp-cssnano');
var concat=require('gulp-concat');
var browser=require('browser-sync');
var html=require('gulp-htmlmin');
//1.less转换，压缩
gulp.task('css',function(){
	gulp.src('src/css/app.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browser.reload({
		stream:true
	}));
});
var uglify=require('gulp-uglify');
//2.js合并压缩混淆
gulp.task('js',function(){
	gulp.src('src/js/*.js')
	.pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browser.reload({stream:true}));
});
//3.img转存
gulp.task('img',function(){
	gulp.src('src/img/*.*')
	.pipe(gulp.dest('dist/img'))
	.pipe(browser.reload({stream:true}));
});
//4.html压缩
gulp.task('html',function(){
	gulp.src('src/view/*.html')
	.pipe(html({
		collapseWhitespace:true,
		removeComments:true
	}))
	.pipe(gulp.dest('dist/view'))
	.pipe(browser.reload({stream:true}));
});
//服务器同步
gulp.task('serve', function() {
  browser({
    server: {
      baseDir: ['dist/view']
    },
  }, function(err, bs) {
    console.log(bs.options.getIn(["urls", "local"]));
  });
	gulp.watch('src/css/app.less',['css']);
	gulp.watch('src/js/*.js',['js']);
	gulp.watch('src/img/*.*',['img']);
	gulp.watch('src/view/*.html',['html']);
});

