module.exports = function(text, options) {
  return '<strong>' + text+ '</strong><div class="wrapped">' +
    options.fn() + '</div>';
};
