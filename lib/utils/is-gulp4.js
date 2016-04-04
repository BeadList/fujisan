'use strict';

const isGulp4 = (gulp) => {
  return !(typeof gulp.hasTask === 'function');
};

module.exports = isGulp4;
