// NOTE: I previously suggested doing this through Grunt, but had plenty of problems with
// my set up. Grunt did some weird things with scope, and I ended up using nodemon. This
// setup is now using Gulp. It works exactly how I expect it to and is WAY more concise.
var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    node,
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('serve', () => {
  if (node) node.kill();
  node = spawn('node', ['server.js'], {stdio: 'inherit'});
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected - waiting for fix...');
    }
  });

})

/**
 * $ gulp
 * description: start the development environment
 */
gulp.task('default', () => {
  browserSync.init({
    server: {
      baseDir: './',
    },
    port: 8888
  })
  gulp.watch(['./server.js', './client/views/*.html'], ['serve']);
  // gulp.watch(['./server.js', './client/views/*.html']).on('change', reload);

  // Need to watch for sass changes too? Just add another watch call!
  // no more messing around with grunt-concurrent or the like. Gulp is
  // async by default.
})

// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})