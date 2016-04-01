module.exports = function(text, options) {
  return '<strong>' + text+ '</strong><div class="wrapped">' +
    this.arguments[0].fn() + '</div>';
};
