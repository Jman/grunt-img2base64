'use strict';

var grunt = require('grunt');

exports.img2base64 = {
  setUp: function(done) {
    done();
  },
  main : function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/main.css');
    var expected = grunt.file.read('test/expected/main.css');
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  },
  empty : function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/empty.css');
    var expected = grunt.file.read('test/expected/empty.css');
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  },
  prefix : function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/prefix.css');
    var expected = grunt.file.read('test/expected/prefix.css');
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  },
  postfix : function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/postfix.css');
    var expected = grunt.file.read('test/expected/postfix.css');
    test.equal(actual, expected, 'Generated file needs to be equal');

    test.done();
  }
};
