
var REPO_LIST = [
  {
    repo: 'GBA-Dev/BinaryGames',
    branch: 'master',
  },
  {
    repo: 'srojam/gba',
    branch: 'gh-pages',
  },
  {
    repo: 'DV8FromTheWorld/Gameboy-Emulator',
    branch: 'master',
  },
];

function doGet(e) {
  var listROM = [];
  var options = {
    headers: {
      'User-Agent': 'https://script.google.com',
      'Authorization': 'token ' + API_KEY,
    },
    muteHttpExceptions: true,
  };
  for (var i = 0; i < REPO_LIST.length; i++)
  {
    var repo = REPO_LIST[i];
    var url = 'https://api.github.com/repos/' + repo.repo + '/git/trees/' + repo.branch + '?recursive=1';
    var response = UrlFetchApp.fetch(url, options);
    var result = JSON.parse(response.getContentText());
    if (!result || !result.tree)
    {
      // listROM.push(result);
      continue;
    }

    for (var t in result.tree)
    {
      var path = result.tree[t].path;
      var filename = path.split('/');
      var fname = filename[filename.length - 1];
      var ext = fname.slice(-4);
      if ((ext.indexOf('.zip') >= 0) || (ext.indexOf('.gb') >= 0))
      {
        var rom = {
          url: 'https://raw.githubusercontent.com/' + repo.repo + '/' + repo.branch + '/' + path,
          filename: fname,
        };
        listROM.push(rom);
      }
    }
  }

  var returnValue = JSON.stringify(listROM);
  var callback = e ? (e.parameter ? e.parameter.callback : undefined) : undefined;
  if (callback !== undefined)
  {
    returnValue = callback + '(' + returnValue + ')';
  }

  return ContentService.createTextOutput(returnValue).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  return doget(e);
}


