'use strict';

const helpers = {
  yieldContent(inKey, defaultValue) {
    let key = inKey || 'default';
    let value = this.file.contentFor[key] || defaultValue;
    if(!value) {
      throw `cannot yield ${inKey}`;
    }
    return value;
  },

  contentFor(key, value) {
    this.file.contentFor = this.file.contentFor || {};
    this.file.contentFor[key] = value;
  }
}

module.exports = helpers;
