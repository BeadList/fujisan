// Simple one
var gulp = require('gulp');
var fujisan = require('../../../lib/fujisan')({
  config: {
    layout: 'with-other-content'
  },
  gulp: gulp
});
