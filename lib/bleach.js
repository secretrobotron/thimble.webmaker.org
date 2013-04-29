/**
 * Sanitize to-publish data by running it through a RESTful Bleach endpoint
 */
exports.bleachData = function(endpoint) {
  var sanitize = require("htmlsanitizer"),
  // Whitelist for HTML5 elements
  var ALLOWED_TAGS = [
      "!doctype",
      "html",
      "body",
      "a",
      "abbr",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "base",
      "bdi",
      "bdo",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "cite",
      "code",
      "col",
      "colgroup",
      //"command",
      //"datalist",
      "dd",
      "del",
      "details",
      "dfn",
      "div",
      "dl",
      "dt",
      "em",
      //"embed",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "h1","h2","h3","h4","h5","h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "keygen",
      "kbd",
      "label",
      "legend",
      "li",
      "link",
      "map",
      "mark",
      "menu",
      "meta",
      "meter",
      "nav",
      //"noscript",
      //"object",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "param",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "s",
      "samp",
      //"script",
      "section",
      "select",
      "small",
      "source",
      "span",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "title",
      "tr",
      //"track",
      "u",
      "ul",
      "var",
      "video",
      "wbr"
  ];
  // Whitelist for HTML5 element attributes.
  var ALLOWED_ATTRS = {
    "*": ["class", "id", "lang", "style", "tabindex", "title","disabled"],
    "a": ["href"],
    "audio": ["controls", "autoplay", "preload", "loop", "src"],
    "button": ["name", "type", "value"],
    "base": ["href"],
    "canvas": ["width", "height"]
    //"embed": ["height","src","type","width"],
    "iframe": ["src", "width", "height", "allowfullscreen"],
    "img": ["src", "width", "height", "alt"],
    "input": ["type","checked","min","max","maxlength","name","placeholder","pattern",
              "readonly","required","step","value"],
    "link": ["href", "rel", "type", "crossorigin", "media"],
    "menu": ["type", "label"],
    "meta": ["charset", "name", "content"],
    "meter": ["value","min","max","low","high","optimum"],
    //"object": ["data","height","width","name","type"],
    "optgroup": ["label"],
    "option": ["label", "selected", "value"],
    "output": ["for","name"],
    "param": ["name", "value"],
    "progress": ["max","value"],
    "q": ["cite"],
    "source": ["src","type","media"],
    //"script": ["type", "src"],
    "style": ["type","media","scoped"],
    "source": ["src", "type"],
    "textarea": ["cols","name","maxlength","readonly","placeholder","required","rows"
                 "selectionDirection","selectionStart","selectionEnd","wrap"],
    "th": ["colspan","rowspan"],
    "td": ["rowspan"],
    "time": ["datetime","pubdate"],
    //"track": ["default","kind","label","src","srclang"],
    "video": ["controls", "autoplay", "preload", "loop", "mediaGroup", "src",
              "poster", "muted", "width", "height"],
  };

  // Sanitize some HTML code by running it through Bleach
  return function(req, res, next) {
    sanitize({
      endpoint: endpoint,
      text: req.body.html,
      tags: ALLOWED_TAGS,
      attributes: ALLOWED_ATTRS,
      styles: [],
      strip: false,
      strip_comments: false,
      parse_as_fragment: false
    }, function(err, sanitizedData) {
      req.body.sanitizedHTML = sanitizedData;
      next(err);
    });
  };
};