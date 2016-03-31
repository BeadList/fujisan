'use strict';
var expect = require('chai').expect;

const cleanName = require('../../../lib/utils/clean-name');

describe('cleanName', () => {
  it('strips file base path and extension', () => {
    const file = {
      base: '/root/long/path/project/base/',
      path: '/root/long/path/project/base/dir/name.html.md.ejs'
    };
    expect(cleanName(file)).to.equal('dir/name');
  });
});
