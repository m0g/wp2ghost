var WpShortcode = function(html) {
  this.html = html;
};

WpShortcode.prototype.regExp = function(tag) {
  return new RegExp(
    '\\[(\\[?)(' + tag + ')(?![\\w-])([^\\]\\/]*(?:\\/(?!\\])[^\\]\\/]*)*?)(?:(\\/)\\]|\\](?:([^\\[]*(?:\\[(?!\\/\\2\\])[^\\[]*)*)(\\[\\/\\2\\]))?)(\\]?)',
    'g'
  );
};

WpShortcode.prototype.replace = function(tag) {
  tag = tag.toLowerCase();

  if (tag == 'soundcloud' && this.html.match(this.regExp(tag)))
    this.replaceSoundcloud();

  return this.html;
};

WpShortcode.prototype.replaceSoundcloud = function() {
  var shortcode = this.html.match(this.regExp('soundcloud'))[0];
};

module.exports = WpShortcode;
