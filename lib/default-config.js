var defaultConfig = {
  prefix: 'fuji',
  cwd: undefined,

  layout: 'default',

  babel: {
    presets: ['es2015']
  },

  preprocessors: {
    all: {},
    normalizeHelpers: true,
    helpers: {}
  },

  paths: {
    source: {
      public: 'source/public/**/*',
      pages: 'source/pages/**/*',
      stylesheets: 'source/stylesheets/**/*',
      javascripts: 'source/javascripts/**/*',
      images: 'source/images/**/*',
      helpers: 'source/helpers',
      partials: 'source/partials/**/*',
      layouts: 'source/layouts/**/*'
    },

    build: {
      public: 'build',
      pages: 'build',
      stylesheets: 'build/stylesheets',
      javascripts: 'build/javascripts',
      images: 'build/images'
    }
  }
};

module.exports = defaultConfig;
