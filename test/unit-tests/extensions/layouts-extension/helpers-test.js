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

    it('yields block if value is not defined', () => {
      context.file = {
        contentFor: {
          default: 'Chocolate Hills'
        }
      };

      context.arguments = [{
        fn: () => {
          return 'Mount Toogood';
        }
      }];

      expect(yieldContent('nipple', 'Head-Smashed-In Buffalo Jump'))
        .to.equal('Mount Toogood');
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

    it('stores block content', () => {
      context.file = {};
      context.arguments = [{
        fn: () => {
          return 'Chocolate Mountain';
        }
      }];

      contentFor('chocolate');
      expect(context.file.contentFor.chocolate).to.equal('Chocolate Mountain');
    });
  });
});
