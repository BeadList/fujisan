'use strict';

const helpers = {
  yieldContent(inKey) {
    let key = inKey || 'default';
    return this.file.contentFor[key];
  }
}

module.exports = helpers;
