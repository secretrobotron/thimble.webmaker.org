module.exports = {
  defaultPage: function() {
    return "<!doctype html>\\n" +
           "<html>\\n" +
           "  <head>\\n" +
           "    <title>Your Awesome Webpage created on " + new Date(Date.now()).toUTCString() + "</title>\\n" +
           "    <script src=\"http://pomax.github.io/WebComponentDemo/platform/WebComponents/web-components.js\"></script>\\n" +
           "    <script src=\"http://pomax.github.io/WebComponentDemo/platform/CustomElements/custom-elements.js\"></script>\\n" +
           "  </head>\\n" +
           "  <body>\\n" +
           "    <p>Make something amazing with the web</p>\\n" +
           "  </body>\\n" +
           "</html>\\n";
  },
  slugify: function(s) {
    return s.toLowerCase().replace(/[^\w\s]+/g,'').replace(/\s+/g,'-');
  }
};
