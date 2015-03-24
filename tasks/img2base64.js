/*
 * grunt-img2base64
 * https://github.com/jman/grunt-img2base64
 *
 * Copyright (c) 2015 Eugene Tereschenko
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var fs = require("fs");

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
        var css_classname = '',
            css_content = ' { background-image: url("data:image/{type};charset=utf-8;base64,{base64content}"); }',
            ext = path.extname(file.src[i]).toLowerCase().substr(1),
            base64, type;
        css_classname += options.prefix ? options.prefix : '.';
        css_classname += path.basename(file.src[i], path.extname(file.src[i]));
        css_classname += options.postfix ? options.postfix : '';
        if(ext === 'svg'){
          base64 = new Buffer(data).toString('base64');
        } else {
          base64 = fs.readFileSync(file.src[i]).toString('base64');
        }
        switch (ext) {
          case 'svg':
            type = 'svg+xml';
            break;
          case 'jpeg':
            type = 'jpeg';
            break;
          case 'jpg':
            type = 'jpeg';
            break;
          case 'gif':
            type = 'gif';
            break;
          case 'png':
            type = 'png';
            break;
        }
        return css_classname + css_content.replace('{base64content}', base64).replace('{type}', type);
      }).join('\n');

      grunt.file.write(file.dest, src);
      grunt.log.writeln('File "' + file.dest + '" created.');

    });
  });

};
