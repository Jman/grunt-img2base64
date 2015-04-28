/*
 * grunt-img2base64
 * https://github.com/jman/grunt-img2base64
 *
 * Copyright (c) 2015 Eugene Tereschenko
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path'),
    fs = require("fs"),
    imgSize = require('image-size'),
    types = {
      'svg' : 'svg+xml',
      'jpeg' : 'jpeg',
      'jpg' : 'jpeg',
      'gif' : 'gif',
      'png': 'png'
    },
    template = fs.readFileSync(path.resolve(__dirname, 'template.ejs')).toString();

module.exports = function(grunt) {

  grunt.template.addDelimiters('img2base64', '{{', '}}');

  grunt.registerMultiTask('img2base64', 'Encode images to base64 and create css file', function() {

    var options = this.options({
          prefix : '.',
          postfix : ''
        }),
        file_exist = function(filepath){
          if (!grunt.file.exists(filepath)) {
            grunt.log.warn('Source file "' + filepath + '" not found.');
            return false;
          } else {
            return true;
          }
        };

    this.files.forEach(function(files) {
      var src = files.src.filter(file_exist).map(function(file) {
        var ext = path.extname(file).toLowerCase().substr(1),
            buffer = fs.readFileSync(file),
            dimensions = imgSize(buffer);
        return grunt.template.process(template, {
          data : {
            prefix : options.prefix,
            class_name : path.basename(file, path.extname(file)),
            postfix : options.postfix,
            base64 : buffer.toString('base64'),
            width: dimensions.width,
            height: dimensions.height,
            type : types[ext]
          },
          delimiters: 'img2base64'
        })
      }).join('\n');

      grunt.file.write(files.dest, src);
      grunt.log.writeln('File "' + files.dest + '" created.');

    });
  });

};
