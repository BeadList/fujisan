/*global module */
var defaultConfig = {
  prefix: 'fuji',

  build: {
    babel: {
      presets: ['es2015']
    }
  },

  paths: {
    source: {
      public: 'source/public/**/*',
      pages: 'source/pages/**/*',
      stylesheets: 'source/stylesheets/**/*',
      javascripts: 'source/javascripts/**/*'
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
