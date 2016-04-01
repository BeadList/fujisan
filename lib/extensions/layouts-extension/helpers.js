'use strict';

const helpers = {
  yieldContent(inKey, defaultValue) {
    let key = inKey || 'default';
    let blockValue = this.arguments &&
          this.arguments[0] &&
          this.arguments[0].fn &&
          this.arguments[0].fn(this);

    let value = this.file.contentFor[key] || blockValue || defaultValue;
    if(!value) {
      throw `cannot yield ${inKey}`;
    }
    return value;
  },

  contentFor(key, value) {
    let blockValue = this.arguments &&
          this.arguments[0] &&
          this.arguments[0].fn &&
          this.arguments[0].fn(this);
    this.file.contentFor = this.file.contentFor || {};
    this.file.contentFor[key] = blockValue || value;
  }
}

module.exports = helpers;
