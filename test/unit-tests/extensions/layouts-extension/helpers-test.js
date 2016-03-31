'use strict';
var expect = require('chai').expect;

const helpers = require('../../../../lib/extensions/layouts-extension/helpers.js');

describe('helpers', () => {

  describe('.yieldContent', () => {
    let context = {};
    let yieldContent;

    beforeEach(()=> {
      yieldContent = helpers.yieldContent.bind(context);
    });

    it('yields default contents without argument', () => {
      context.file = {
        contentFor: {
          default: 'Chocolate Hills'
        }
      };

      expect(yieldContent()).to.equal('Chocolate Hills');
    });

    it('yields key', () => {
      context.file = {
        contentFor: {
          default: 'Chocolate Hills',
          nipple: 'Nipple Peak'
        }
      };

      expect(yieldContent('nipple')).to.equal('Nipple Peak');
    });
  });
});
