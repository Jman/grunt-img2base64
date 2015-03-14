/*
 * grunt-img2base64
 * https://github.com/jman/grunt-img2base64
 *
 * Copyright (c) 2015 Eugene Tereschenko
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');

module.exports = function(grunt) {

  grunt.registerMultiTask('img2base64', 'Encode images to base64 and create css file', function() {

    var options = this.options(),
        file_exist = function(filepath){
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        };

    this.files.forEach(function(file) {
      var src = file.src.filter(file_exist).map(grunt.file.read).map(function(data, i) {
        var css_classname = '.',
            css_content = '{ background-image: url("data:image/{type};charset=utf-8;base64,{base64content}"); }',
            base64;
        if(options.prefix){
          css_classname += options.prefix + '-' + path.basename(file.src[i], path.extname(file.src[i]));
        } else {
          css_classname += path.basename(file.src[i], path.extname(file.src[i]));
        }
        base64 = new Buffer(data).toString('base64');
        return css_classname + css_content.replace('{base64content}', base64).replace('{type}', 'svg+xml');
      }).join('\n');

      grunt.file.write(file.dest, src);
      grunt.log.writeln('File "' + file.dest + '" created.');

    });
  });

};
