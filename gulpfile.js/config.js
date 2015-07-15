var dest = './dist';
var src = './src';
var port = 3000;

var reactify = require('reactify');
var reactifyES6 = function(file) {
  return reactify(file, {'es6': true});
};

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest,
      port: port
    }
  },
  sass: {
    src: src + '/css/*.{sass,scss,css}',
    dest: dest + '/css',
    settings: {
      sourceComments: 'map',
      imagePath: '/img' // Used by the image-url helper
    }
  },
  lint: {
    src: [src + '/bundles/**/*.js', src + '/js/**/*.js']
  },
  images: {
    src: src + '/img/**',
    dest: dest + '/img'
  },
  markup: {
    src: [src + '/html/**/*.html', '!**/templates/**'],
    watch: src + '/html/**/*.html',
    dest: dest,
    swig: {
      defaults: {cache: false}
    }
  },
  misc: {
    src: src + '/misc/**',
    dest: dest
  },
  js: {
    src: src + '/js/**',
    dest: dest + '/js'
  },
  ngrok: {
    port: port
  },
  appx: {
    src: src + '/appxmanifest.xml',
    dest: dest + '/appxmanifest.xml'
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/bundles/bundle.jsx',
      transform: [reactifyES6],
      dest: dest + '/bundles',
      outputName: 'bundle.js'
    }]
  },
  nodeCopy: {
    dest: dest
  },
  production: {
    cssSrc: dest + '/**/*.css',
    jsSrc: [dest + '/**/*.js', '!' + dest + '/node_modules/**'],
    dest: dest
  },
  clean: {
    src: dest
  },
  deploy: {
    src: dest + '/**/*'
  }
};
