/*global module */
var defaultConfig = {
  prefix: 'fuji',
  cwd: undefined,

  babel: {
    presets: ['es2015']
  },

  preprocessors: {
    all: {
      helpers: {}
    }
  },

  paths: {
    source: {
      public: 'source/public/**/*',
      pages: 'source/pages/**/*',
      stylesheets: 'source/stylesheets/**/*',
      javascripts: 'source/javascripts/**/*',
      helpers: 'source/helpers',
      partials: 'source/partials/**/*'
    },

    build: {
      public: 'build',
      pages: 'build',
      stylesheets: 'build/stylesheets',
      javascripts: 'build/javascripts'
    }
  }
};

module.exports = defaultConfig;
