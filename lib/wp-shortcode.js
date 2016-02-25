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
};

WpShortcode.prototype.replaceSoundcloud = function() {
  //console.log('\n\nbefore replacesoundcloud', this.html);
  this.html = this.html.replace(
    this.regExp('soundcloud'), 
    this.scPatternReplace
  );
  //console.log('after replacesoundcloud', this.html);
};

WpShortcode.prototype.scPatternReplace = function (match, left, tag, attrs) {
  attrs = attrs.replace('=" ', '="');

  //console.log("\n\nattrs", attrs, "\n\n");
  var data = attrs.split(' ');

  var iframe =  "<iframe ";
  var apiUrl;

  if (data.length >= 5)
    iframe += data[3] + " " + data[4] + " scrolling=\"no\" frameborder=\"no\" ";
  else
    iframe += "width=\"100%\" height=\"450\" "
            + "scrolling=\"no\" frameborder=\"no\" ";

  if (data.length >= 3 && data[2].match(/\w+="(.+)"/i))
    apiUrl = [
      data[1].match(/\w+="(.+)"/i)[1],
      data[2].match(/\w+="(.+)"/i)[1]
    ].join("?");
  else
    apiUrl = data[1].match(/\w+="(.+)"/i)[1];


  iframe += "src=\"https://w.soundcloud.com/player/?url="
          + encodeURIComponent(apiUrl)
          + "\"></iframe>";

  //console.log('api url', apiUrl);
  //console.log("\n\n", iframe, "\n\n");

  return iframe;
}

module.exports = WpShortcode;
