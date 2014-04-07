/*
 * grunt-sassWatch
 * http://gruntjs.com/
 *
 * Copyright (c) 2013 Zeus Lalkaka
 * Licensed under the BSD license.
 */

'use strict';

module.exports = function (grunt) {
  // Quick and dirty grunt task to spawn sass --watch when starting the dev server
  grunt.registerMultiTask('sass-watch', 'Custom Sass Task', function(folderPath) {
    var done = this.async();

    var options = this.options();
    return sassWatch(folderPath);

    function sassWatch(relativePath) {

      // command line args
      var args = [
        "sass",
        "--watch",
        ".:.",
        "--style",
        "compressed",
        "--sourcemap"
      ];

      // get target styles folder path
      var targetPath = require('path').join(process.cwd(), (options.path || "/app/styles"));
      grunt.log.writeln('Watching', targetPath, 'with sass --watch');

      // check that targetPath exists
      if (!require('fs').existsSync(targetPath)) {
        grunt.log.error("ERROR: sassWatch could not locate the styles folder");
        grunt.log.error("Please pass the path of your styles folder to the sassWatch task");
        grunt.log.error("e.g - grunt sassWatch:/app/styles");
        return false;
      }

      // spawn sass --watch
      var child = grunt.util.spawn({
        cmd: args.shift(),
        args: args,
        opts: {
          cwd: targetPath,
          stdout:'inherit'
        }
      }, function() {
        // noop just to keep logs clear of "undefined is not a function" message
         done();
      });

      // pipe child process's error output to grunt
      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);

      return true;
    }
  });
}
