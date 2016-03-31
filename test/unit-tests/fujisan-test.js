var process = require('process');

var gulp = require('gulp');
var expect = require('chai').expect;

var fujisan = require('../../lib/fujisan');

describe('fujisan', function() {
  describe('.prepareOptions', function() {
    beforeEach(function () {
      fujisan.options = undefined;
    });

    it('sets default options', function () {
      fujisan.prepareOptions({ gulp: gulp });
      expect(fujisan.options.config.prefix).to.equal('fuji');
    });

    it('does not set options if they already set up', function () {
      fujisan.options = {
        config: {
          prefix: 'hola'
        }
      };
      fujisan.prepareOptions({ gulp: gulp });
      expect(fujisan.options.config.prefix).to.equal('hola');
    });

    it('sets passed options', function () {
      fujisan.prepareOptions({ gulp: gulp, config: { prefix: 'zoom' } });
      expect(fujisan.options.config.prefix).to.equal('zoom');
    });

    it('sets cwd', function () {
      fujisan.prepareOptions({ gulp: gulp });
      expect(fujisan.options.config.cwd).to.equal(process.cwd());
    });

    it('sets cwd', function () {
      fujisan.prepareOptions({ gulp: gulp });
      expect(fujisan.options.config.cwd).to.equal(process.cwd());
    });
  });
});
