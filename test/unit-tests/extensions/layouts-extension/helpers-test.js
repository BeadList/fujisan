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

    it('yields default value if value is not defined', () => {
      context.file = {
        contentFor: {
          default: 'Chocolate Hills'
        }
      };

      expect(yieldContent('nipple', 'Head-Smashed-In Buffalo Jump'))
        .to.equal('Head-Smashed-In Buffalo Jump');
    });
  });

  describe('.contentFor', () => {
    let context = {};
    let contentFor;

    beforeEach(()=> {
      contentFor = helpers.contentFor.bind(context);
    });

    it('stores content', () => {
      context.file = {};
      contentFor('nipple', 'Nipple Peak');
      expect(context.file.contentFor.nipple).to.equal('Nipple Peak');
    });
  });
});
