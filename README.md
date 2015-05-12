# grunt-img2base64

> Encode images to base64 and generate stylesheet file  

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-img2base64 --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-img2base64');
```

## The "img2base64" task

### Overview
In your project's Gruntfile, add a section named `img2base64` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  img2base64: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.prefix
Type: `String`
Default value: `'.'`

Prefix for selector

#### options.postfix
Type: `String`
Default value: `''`

Postfix for selector


### Usage Examples

#### Default Options
The generated result will be file `icons.css` 
contains rules like `.filename { background-image:url(base64Url); width:imgWidth; height:imgHeight; }`

```js
grunt.initConfig({
  img2base64: {
    main: {
      files: {
        'dest/css/icons.css': ['src/img/icons/*']
      }
    }
  },
});
```

#### Define custom prefix and postfix
The generated result will be file `icons.css` 
contains rules like `.icon-filename span { background-image:url(base64Url); width:imgWidth; height:imgHeight; }`

```js
grunt.initConfig({
  img2base64: {
    main: {
      options: {
        prefix: '.icon-',
        postfix: ' span'
      },
      files: {
        'dest/css/icons.css': ['src/img/icons/*']
      }
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

#### 0.0.7
  * Add .npmignore

#### 0.0.6
  * Fix README

#### 0.0.5
  * Fix bug with wrong height

#### 0.0.4
  * Add image size support 

#### 0.0.3
  * Add `postfix` option 

#### 0.0.2
  * Add support for PNG, JPG, GIF files 

#### 0.0.1
  * Initial Release (SVG files only)
