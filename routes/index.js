/**
 * GET for the index.html template
 */
var fs = require('fs');

exports.index = function(utils, env, appName, defaultContentFilePath) {
  var defaultContent = '';
  var alreadyReading = false;

  function readDefaultContentFile () {
    if (!alreadyReading) {
      alreadyReading = true;
      fs.readFile(defaultContentFilePath, 'utf8', function (err, data) {
        if (!err) {
          defaultContent = data.replace(/'/g, '\\\'').replace(/\//g, '\\\/').replace(/\n/g, '\\n');
        }
        else {
          console.error(err);
        }
        alreadyReading = false;
      });
    }
  }

  if (defaultContentFilePath) {
    readDefaultContentFile();
    fs.watchFile(defaultContentFilePath, readDefaultContentFile);
  }

  return function(req, res) {
    var content = defaultContent,
        contentType = "defaultContent";

    if(req.pageData) {
      content = req.pageData.replace(/'/g, '\\\'').replace(/\n/g, '\\n');
    } else if (req.pageToLoad) {
      contentType = "pageToLoad";
      content = req.pageToLoad;
    }
    if (req.body.pageOperation === "remix") {
      content = content.replace(/<title([^>]*)>/, "<title$1>Remix of ");
    }

    res.render('index.html', {
      appname: appName,
      appURL: env.get("HOSTNAME"),
      audience: env.get("AUDIENCE"),
      content: content,
      contentType: contentType,
      csrf: req.session._csrf,
      email: req.session.email || '',
      HTTP_STATIC_URL: '/',
      MAKE_ENDPOINT: env.get("MAKE_ENDPOINT"),
      pageOperation: req.body.pageOperation,
      origin: req.params.id,
      tutorialUrl: req.tutorialUrl,
      userbar: env.get("USERBAR")
    });
  };
};
