var defaultControls = {
  "images": [
    "assets/resources/styles/default/abtn.svg",
    "assets/resources/styles/default/bbtn.svg",
    "assets/resources/styles/default/start.svg",
    "assets/resources/styles/default/select.svg",
    "assets/resources/styles/default/dpad.svg",
    "assets/resources/styles/default/bg.svg",
    "assets/resources/styles/default/menu.svg",
    "assets/resources/styles/default/indent.svg",
    "assets/resources/styles/default/lbtn.svg",
    "assets/resources/styles/default/rbtn.svg",
  ],

  "name": "Default",
  "bgColour": "#313123",
  "background": 5,
  "gbborder": 7,
  "l_halign": "center",
  "l_valign": "center",
  "p_halign": "center",
  "p_valign": "top",
  "indent": 8,

  "landscape": [
    {"type": "button", "x":-12, "y":45, "mask":16, "radius":17, "halign":"right", "image":0, "imgwidth":18.3333333, "imgheight":18.3333333}, // A Button
    {"type": "button", "x":-29, "y":61, "mask":32, "radius":17, "halign":"right", "image":1, "imgwidth":18.3333333, "imgheight":18.3333333},// B Button
    {"type": "dpad", "x":20, "y":53, "radius":29, "halign":"left", "image":4, "imgwidth":35, "imgheight":35,
      "segments": [
        {"mask":1, "start":0.7853981633974483, "end":2.356194490192345}, 	//start: (Math.PI/4), end: (3*Math.PI/4)
        {"mask":2, "start":-2.356194490192345, "end":-0.7853981633974483}, 	//start: (3*Math.PI/(-4)), end: (Math.PI/(-4))
        {"mask":4, "start":2.356194490192345, "end":200}, 					//start: (3*Math.PI/4), end: infinity
        {"mask":4, "start":-200, "end":-2.356194490192345},					//start: -infinity, end: (3*Math.PI/(-4))
        {"mask":8, "start":-0.7853981633974483, "end":0.7853981633974483} 	//start: (Math.PI/(-4)), end: (Math.PI/4)
      ]
    },
    {"type": "recbutton", "x":-21, "y":93, "imgwidth":18.33333333, "imgheight":8.33333333, "width": 40, "height":10, "halign":"right", "mask":128, "image":2}, //start
    {"type": "recbutton", "x":21, "y":93, "imgwidth":18.33333333, "imgheight":8.33333333, "width": 40, "height":10, "halign":"left", "mask":64, "image":3}, //select
    {"type": "specialbutton", "btype": "menu", "y":0, "x":0, "image":6, "imgheight":16.6666667, "imgwidth":16.6666667, "halign":"right", "radius":10},
    {"type": "button", "x":20, "y":15, "mask":256, "radius":17, "halign":"left", "image":0, "imgwidth":18.3333333, "imgheight":18.3333333}, // L Button
    {"type": "button", "x":-20, "y":15, "mask":512, "radius":17, "halign":"right", "image":1, "imgwidth":18.3333333, "imgheight":18.3333333},// R Button
  ],

  "portrait": [
    {"type": "button", "x":-16.25, "y":111, "mask":16, "radius":17, "halign":"right", "image":0, "imgwidth":18.3333333, "imgheight":18.3333333}, // A Button
    {"type": "button", "x":-31.875, "y":126.25, "mask":32, "radius":17, "halign":"right", "image":1, "imgwidth":18.3333333, "imgheight":18.3333333},// B Button
    {"type": "dpad", "x":25.625, "y":118.4375, "radius":29, "halign":"left", "image":4, "imgwidth":35, "imgheight":35,
      "segments": [
        {"mask":1, "start":0.7853981633974483, "end":2.356194490192345}, 	//start: (Math.PI/4), end: (3*Math.PI/4)
        {"mask":2, "start":-2.356194490192345, "end":-0.7853981633974483}, 	//start: (3*Math.PI/(-4)), end: (Math.PI/(-4))
        {"mask":4, "start":2.356194490192345, "end":200}, 					//start: (3*Math.PI/4), end: infinity
        {"mask":4, "start":-200, "end":-2.356194490192345},					//start: -infinity, end: (3*Math.PI/(-4))
        {"mask":8, "start":-0.7853981633974483, "end":0.7853981633974483} 	//start: (Math.PI/(-4)), end: (Math.PI/4)
      ]
    },
    {"type": "recbutton", "x":-40, "y":151.25, "imgwidth":18.33333333, "imgheight":8.33333333, "width": 40, "height":10, "halign":"right", "mask":128, "image":2}, //start
    {"type": "recbutton", "x":40, "y":151.25, "imgwidth":18.33333333, "imgheight":8.33333333, "width": 40, "height":10, "halign":"left", "mask":64, "image":3}, //select
    {"type": "specialbutton", "btype": "menu", "y":151.25, "x":-14, "image":6, "imgheight":16.6666667, "imgwidth":16.6666667, "halign":"right", "radius":10},
    {"type": "button", "x": 15, "y":85, "mask":256, "radius":17, "halign":"left", "image":0, "imgwidth":18.3333333, "imgheight":18.3333333}, // L Button
    {"type": "button", "x": -15, "y":85, "mask":512, "radius":17, "halign":"right", "image":1, "imgwidth":18.3333333, "imgheight":18.3333333},// R Button
  ]
};

function installStyle(style, callback) {
  var imgdata = []
  var obj = style;
  var loaded = 0;
  var toLoad = obj.images.length;

  for (var i = 0; i < obj.images.length; i++) {
    (function(i){
      var mime = ""
      var xhr = new XMLHttpRequest();
      xhr.open("GET", obj.images[i]);
      xhr.responseType = "text";

      xhr.onreadystatechange = function() {mime = this.getResponseHeader('content-type');};

      xhr.onload = function() {
        imgdata[i] = "data:"+mime+";base64,"+btoa(xhr.response)
        if (++loaded == toLoad) {
          console.log("loadedall")
          db.transaction(function (tx) {
            tx.executeSql('INSERT INTO styles (name, data) VALUES (?, ?)', [obj.name, JSON.stringify(obj)], function (tx, results) {

              var inserted = 0;
              var toinsert = imgdata.length;
              var styleid = results.insertId;
              for (var j=0; j<imgdata.length; j++) {
                tx.executeSql('INSERT INTO styleres (res_id, style_id, data) VALUES (?, ?, ?)', [j, results.insertId, imgdata[j]], function (tx, results) {
                  if (++inserted == toinsert) callback(styleid);
                }, function(tx, err) { console.log(err) });
              }

            }, function(tx, err) { console.log(err) });
          })
        }
      }
      xhr.send();
    })(i);
  }
}

function loadStyle(id, failed, callback) {
  db.transaction(function (tx) {
    tx.executeSql('SELECT data, id FROM styles WHERE id = ?', [id], function (tx, results) {
      if (results.rows.length > 0) {
        mainUI = new gbTouchUI(JSON.parse(results.rows.item(0).data), results.rows.item(0).id, callback);
        mainUI.onload = function() {mainUI.setBG(document.getElementById("container")); renderUI();};
        // TEST
        tx.executeSql('DELETE FROM styles',[],function(){});
        tx.executeSql('DELETE FROM stylesres',[],function(){});
      } else if (typeof failed == "function") failed();
    }, function(tx, err){
      console.error(err)
    });
  });
}

function gbTouchUI(input, id, callback) {
  var images = []
  var obj = input;
  var loaded = 0;
  var toLoad = obj.images.length;
  var me = this;
  this.loaded = false;
  this.images = images;

  db.transaction(function (tx) {
    tx.executeSql('SELECT res_id, data FROM styleres WHERE style_id = ?', [id], function (tx, results) {
      var i;
      var rl = results.rows.length;
      for (i = 0; i < rl; i++) {
        item = results.rows.item(i);
        var img = new Image();
        img.src = item.data;
        img.onload = function() {
          if (++loaded == toLoad) finishedLoading();
        }
        images[item.res_id] = img;
      }
    },
      function(tx, err){console.log(err)});
  });

  this.drawBG = function(ctx, ratio) {
    var img = images[obj.background];
    if (!img)
    {
      return;
    }

    var canvas = ctx.canvas;
    ctx.fillStyle = obj.bgColour || "#313123";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    var hSeg = Math.ceil(document.body.clientWidth/img.width);
    var vSeg = Math.ceil(document.body.clientHeight/img.height);
    if ((canvas.width > canvas.height) != (hSeg > vSeg)) { //if horiz to vertical ratio is inconsistient, then flip values. This is used for the thumbnails.
      var temp = hSeg;
      hSeg = vSeg;
      vSeg = temp
      var scale = canvas.height/document.body.clientWidth;
    } else {
      var scale = canvas.height/document.body.clientHeight;
    }
    ctx.scale(scale, scale);
    for (var x=0; x<hSeg; x++) {
      for (var y=0; y<vSeg; y++) {
        ctx.drawImage(img, x*img.width, y*img.height);
      }
    }
    ctx.restore();
  }

  this.drawUI = function(ctx) {
    var ratio = window.devicePixelRatio || 1

    this.drawBG(ctx, ratio);

    ctx.save();
    var canvas = ctx.canvas;
    var square = Math.min(canvas.height, canvas.width);
    var height = canvas.height

    var iPStatus = (("standalone" in window.navigator) && window.navigator.standalone)
    var statusO = 20*(canvas.height/document.body.clientHeight);
    if (iPStatus) {
      height -= statusO
      if (canvas.width > canvas.height) square -= statusO;
      ctx.translate(0, statusO);
    }
    var scale = square/100



    this.GBScale = Math.floor(Math.min((canvas.width/160),(height/144)))/ratio;
    this.GBx = ((canvas.width/ratio)/2)-(80*this.GBScale)
    var prefix = (canvas.width > height)?"l":"p"
    var valign = obj[prefix+"_valign"]
    if (valign == "center") this.GBy = ((height/ratio)/2)-(72*this.GBScale)
    else if (valign == "top") this.GBy = 0;
    else if (valign == "bottom") this.GBy = (height/ratio)-(144*this.GBScale);


    if (obj.gbborder) {
      ctx.save()
      ctx.scale(ratio, ratio);

      var img = images[obj.gbborder]
      ctx.translate((this.GBx-(img.width-160)), (this.GBy-(img.height-144)));
      ctx.scale(this.GBScale, this.GBScale);
      ctx.drawImage(img, 0, 0)

      ctx.restore();
    }

    if (iPStatus) this.GBy += 20;

    ctx.scale(scale, scale);

    var i;
    var elems = (canvas.width > height)?obj.landscape:obj.portrait;
    var elmsl = elems.length;
    for (i=0; i < elmsl; i++) {
      var t = elems[i]
      var img = images[t.image];
      ctx.save();

      if (t.halign == "right") ctx.translate(100*Math.max(1, (canvas.width/height)), 0);
      ctx.translate(t.x, t.y);
      ctx.scale(t.imgheight/img.height, t.imgwidth/img.width)
      ctx.drawImage(img, -img.width/2, -img.height/2);

      ctx.restore();
    }

    ctx.restore();
  }

  this.setBG = function(elem) {
    var img = images[obj.background];
    elem.style.backgroundImage = "url("+img.src+")";
  }

  this.getButtons = function(touches, event) {
    var buttonByte = 0;

    var i;
    var tl = touches.length;
    for (i = 0; i < tl; i++) {
      var x = touches[i].pageX;
      var y = touches[i].pageY;

      var width = document.body.clientWidth;
      var height = document.body.clientHeight;
      if (("standalone" in window.navigator) && window.navigator.standalone) {
        height -= 40;
        y -= 40;
      }
      var square = Math.min(height, width);

      var scale = 100/square;

      x *= scale;
      y *= scale;

      var elems = (width > height)?obj.landscape:obj.portrait;

      var j;
      var elmsl = elems.length;
      for (j = 0; j < elmsl; j++) {
        var t = elems[j]

        var rx = x;
        if (t.halign == "right") x -= 100*Math.max(1, (width/height))

        switch (t.type) {
          case "button":
            if (Math.sqrt(Math.pow(x-t.x, 2)+Math.pow(y-t.y, 2)) < t.radius) buttonByte |= t.mask;
            break;
          case "dpad":
            if (Math.sqrt(Math.pow(x-t.x, 2)+Math.pow(y-t.y, 2)) < t.radius) {
              var angle = Math.atan2(x-t.x, y-t.y)
              var k;
              var sgml = t.segments.length;
              for (k = 0; k < sgml; k++) {
                var seg = t.segments[k];
                if (angle > (seg.start) && angle < (seg.end)) buttonByte |= seg.mask;
              }
            }
            break;
          case "recbutton":
            if ((x > t.x-t.width/2) && (x < t.x+t.width/2) && (y > t.y-t.width/2) && (y < t.y+t.width/2)) buttonByte |= t.mask;
            break;
          case "specialbutton":
            if ((event.type === 'mousemove') || (event.type === 'touchmove'))
            {
              break;
            }
            if (Math.sqrt(Math.pow(x-t.x, 2)+Math.pow(y-t.y, 2)) < t.radius) {
              switch (t.btype) {
                case "menu":
                  isMouseClicked = false;
                  openFileSelect();
                  break;
              }
            }
            break;
        }
        x = rx;
      }
    }

    if (currentGB.emu instanceof GameBoyAdvance)
    {
      gba.keypad.joypadHandler(buttonByte, event);
    }
    else
    {
      gameboy.setButtonByte(255-buttonByte);
    }
  }

  function finishedLoading() {
    me.loaded = true;
    if (typeof me.onload == "function") me.onload();
    if (typeof callback == "function") callback();
  }
}

function drawUIThumbs() {
  var ratio = window.devicePixelRatio || 1;
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;
  var largest = Math.max(width, height);
  var smallest = Math.min(width, height);
  var newLarge = (largest/smallest)*75

  var lC = document.getElementById("landscapeThumb");
  lC.width = newLarge*ratio;
  lC.height = 75*ratio;
  lC.style.width = newLarge;
  lC.style.height = 75;
  mainUI.drawUI(lC.getContext("2d"));

  var pC = document.getElementById("portraitThumb");
  pC.height = newLarge*ratio;
  pC.width = 75*ratio;
  pC.style.height = newLarge;
  pC.style.width = 75;
  mainUI.drawUI(pC.getContext("2d"));
}

function resizeGB(zoom) {
  var width = 160;
  var height = 144;
  if (currentGB.emu instanceof GameBoyAdvance)
  {
    width = 240 / 1.5;
    height = 160 / 1.5;
  }

  currentGB.canvas.width = width * zoom;
  currentGB.canvas.height = height * zoom;

  if (gb.ctx)
  {
    if (typeof gb.ctx.webkitImageSmoothingEnabled !== "undefined") {
      gameboy.ctx.webkitImageSmoothingEnabled = false;
    } else if (typeof gb.ctx.imageSmoothingEnabled !== "undefined") {
      gameboy.ctx.imageSmoothingEnabled = false;
    }
  }
}

function renderUI() {
  scrollTo(0, 0);
  var ratio = window.devicePixelRatio || 1;
  UIcanvas.width = document.body.clientWidth*ratio;
  UIcanvas.height = document.body.clientHeight*ratio;
  UIctx.clearRect(0, 0, UIcanvas.width, UIcanvas.height);
  mainUI.drawUI(UIctx);
  resizeGB(mainUI.GBScale);
  currentGB.canvas.style.left = mainUI.GBx+"px";
  currentGB.canvas.style.top = mainUI.GBy+"px";
  var cont = document.getElementById("appcontainer");
  cont.style.width = document.body.clientWidth+"px";
  cont.style.height = document.body.clientHeight+"px";
}

function periodicState()
{
  if (!(currentGB.isPaused)) {
    if ((activeROM != null) || (activeROM != -1))
    {
      localStorage.setItem('lastState', JSON.stringify(currentGB.getSaveState()));
    }
  }
  localStorage.setItem("lastROM", activeROM);
}

function applyTransform(elem, trans) {
  elem.style.webkitTransform = trans;
  elem.style.MozTransform = trans;
  elem.style.oTransform = trans;
  elem.style.msTransform = trans;
  elem.style.Transform = trans;
}

var takeInput = false;
var activeMenu = 1;
var activeROM = -1;
var aROMname = "";

function createDB() {
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS styles (id integer PRIMARY KEY AUTOINCREMENT, name varchar, data varchar);', [], function(){}, function(t, e){console.log(t, e)});
    tx.executeSql('CREATE TABLE IF NOT EXISTS styleres (id integer PRIMARY KEY AUTOINCREMENT, res_id integer, style_id integer, data varchar);', [], function(){}, function(t, e){console.log(t, e)});
  });
}

function handleMessage(e) {
  try {
    var data = JSON.parse(e.data);
  } catch (err) {
    return;
  }

  if (data.type === 'ROMURL')
  {
    loadURL(data.url); //.replace("http://dl.coolrom.com", "http://fs1.coolrom.com"));
    closeBrowser();
  }
}

function showUI() {
  document.getElementById('splash').style.opacity = 0;
  if (localStorage.getItem("lastROM")) {
    takeInput = true;
    gameboy.onstart = function() {
      if (localStorage.getItem('lastState'))
      {
        gameboy.loadState(JSON.parse(localStorage.getItem("lastState")));
      }
    }
    loadDownloaded(localStorage.getItem("lastROM"));
  } else { openFileSelect(); }
}

function setUpButtons() {
  for (var i=1; i<=4; i++) {
    document.getElementById("mb"+i).ontouchstart = eval("(function(evt){setActiveMenu("+i+"); evt.preventDefault();})");
    document.getElementById("mb"+i).onclick = eval("(function(){setActiveMenu("+i+")})");
  }

  document.getElementById("editROM").ontouchstart = eval("(function(evt){triggerEdit(false); evt.preventDefault();})");
  document.getElementById("editROM").onclick = eval("(function(){triggerEdit(false)})");

  document.getElementById("editState").ontouchstart = eval("(function(evt){triggerEdit(true); evt.preventDefault();})");
  document.getElementById("editState").onclick = eval("(function(){triggerEdit(true)})");

  var back = document.getElementsByClassName("mbackBtn");
  var i;
  var bl = back.length;
  for (i = 0; i < bl; i++) {
    back[i].onclick = closeFileSelect;
    back[i].ontouchstart = closeFileSelect;
  }
}

function triggerEdit(state) {
  var expands = document.getElementsByClassName("fileEx");
  var fEdit = document.getElementsByClassName("fEditControls");
  if (state)
  {
    expands = document.getElementsByClassName("stateEx");
    fEdit = document.getElementsByClassName("sEditControls");
  }

  var trigger = state? editingStates:editingFiles;
  var i;
  var epsl = expands.length;
  if (trigger) {
    for (i = 0; i < epsl; i++) {
      expands[i].style.opacity = 0;
      applyTransform(expands[i], "translate(30px, 0)");
    };
    for (i = 0; i < fEdit.length; i++) {
      applyTransform(fEdit[i], "translate(100%, 0)");
      if (state) statesState[i].editing = false;
      else recentFilesState[i].editing = false;
    };
  } else {
    for (i = 0; i < epsl; i++) {
      expands[i].style.opacity = 1;
      applyTransform(expands[i], "translate(0, 0)");
    };
  }
  if (state) editingStates = !(editingStates);
  else editingFiles = !(editingFiles);

}

function scrollFix()
{
  window.scrollTo(0, 0);
}

var isMouseClicked = false;
function handleMouse(evt)
{
  if (evt.type === 'mousedown')
  {
    isMouseClicked = true;
  }
  else if (evt.type === 'mouseup')
  {
    isMouseClicked = false;
  }
  if (takeInput)
  {
    var pos = [{pageX: evt.pageX, pageY: evt.pageY}];
    if (currentGB.emu instanceof gb)
    {
      if ((event.type === 'mouseup') || !isMouseClicked)
      {
        pos = [];
      }
    }

    evt.preventDefault();
    mainUI.getButtons(pos, evt);
  }
}

function handleTouch(evt) {
  if (!takeInput)
  {
    return;
  }

  var pos = evt.touches;

  if (currentGB.emu instanceof GameBoyAdvance)
  {
    if (evt.type === 'touchend')
    {
      pos = evt.changedTouches;
    }
  }

  evt.preventDefault();
  mainUI.getButtons(pos, evt);
}


function handleKeyboard(evt) {
  if (!takeInput)
  {
    return;
  }

  if (evt.keyCode !== 116)
  {
    evt.preventDefault();
    var btnByte = 0;
    if (evt.type === 'keydown')
    {
      switch (evt.keyCode)
      {
        case 88:
          btnByte = 16;
          break;
        case 90:
          btnByte = 32;
          break;
        case 32:
          btnByte = 64;
          break;
        case 13:
          btnByte = 128;
          break;
        case 38:
          btnByte = 4;
          break;
        case 40:
          btnByte = 72;
          break;
        case 37:
          btnByte = 2;
          break;
        case 39:
          btnByte = 1;
          break;
      }
    }
    gameboy.setButtonByte(255 - btnByte);
  }
}

function dropboxChoose(files) {
  loadURL(files[0].link);
}

function backButtonDisp(disp) {
  var back = document.getElementsByClassName("mbackBtn");
  for (var i=0; i<back.length; i++) {
    back[i].style.display = disp;
  }
}

function openFileSelect() {
  populateRecentFiles();
  populateStates();
  populateControlsDrop();
  var fs = document.getElementById("fileCtr");
  applyTransform(fs, "translate(-100%, 0)");
  currentGB.setPause(true);
  takeInput = false;

  drawUIThumbs();
}

function openBrowser(url) {
  var ext = document.getElementById("external");
  applyTransform(ext, "translate(0, 0)");
  var frame = document.getElementById("extiFrame");
  ext.style.display = "block";
  frame.src = url;
}

function closeBrowser() {
  var ext = document.getElementById("external");
  applyTransform(ext, "translate(0, -100%)");
  var frame = document.getElementById("extiFrame");
  setTimeout(function(){ext.style.display = "none";}, 500);
  frame.src = "about:blank";
}

function setActiveMenu(a) {
  activeMenu = a;
  applyTransform(document.getElementById("submenus"), "translate("+((activeMenu-1)*(-100))+"%, 0)");
  for (var i=1; i<=4; i++) {
    applyTransform(document.getElementById("bb"+i), "translate(0, "+((i == activeMenu)?-50:0)+"px)");
  }
}

function closeFileSelect() {
  var fs = document.getElementById("fileCtr");
  document.getElementById("container").className = ""
  applyTransform(fs, "translate(0, 0)");
  currentGB.setPause(false);
  takeInput = true;
}

function chooseURL() {
  loadURL(prompt("Enter the URL of the ROM file you want to run:"));
}

function downloadStyle() {
  var url = prompt("Enter the URL of the Style you wish to install:");
  if (!url)
  {
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "text";
  xhr.onload = function() {
    installStyle(JSON.parse(xhr.responseText), function(id){
      localStorage["currentStyle"] = id;
      loadStyle(id, showUI, function(){alert("Failed to load Style")});
    });
  }
  xhr.onerror = function() {
    alert("Could not download Style.")
  }
  xhr.send();
}

function renameStyle() {
  var newName = prompt("What do you want to rename this style to?");
  if (!newName)
  {
    return;
  }

  db.transaction(function (tx) {
    tx.executeSql('UPDATE styles SET name = ? WHERE id = ?', [newName, localStorage["currentStyle"]], function (tx, results) {
      populateControlsDrop();
    })
  })
}

function deleteStyle() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT id FROM styles', [], function (tx, results) {
      if (results.rows.length < 2) {
        alert("You can't delete the only style!")
        return;
      }
      if (confirm("Are you sure you want to delete this style?")) {
        tx.executeSql('DELETE FROM styles WHERE id = ?', [localStorage["currentStyle"]], function (tx, results) {
          tx.executeSql('SELECT id FROM styles', [], function (tx, results) {
            localStorage["currentStyle"] = results.rows.item(0).id;
            populateControlsDrop();
          })
        })
      }
    });
  })
}

function addROM(name, emu, data, callback) {
  var transaction = idxDB.transaction(['roms'], 'readwrite');
  var romsStore = transaction.objectStore('roms');
  var id = Math.random().toString(36).substring(2);
  romsStore.put({
    id: id,
    name: name,
    emu: emu,
    data: data,
  });
  aROMname = name;
  activeROM = id;
  if (callback)
  {
    callback();
  }
}

function loadState(id, rom_id) {
  var statesStore = idxDB.transaction(['states'], 'readonly').objectStore('states');
  var statesStoreRequest = statesStore.get(id);
  statesStoreRequest.onsuccess = function() {
    var state = statesStoreRequest.result;
    if (!state)
    {
      return;
    }
    var romsStore = idxDB.transaction(['roms'], 'readonly').objectStore('roms');
    var romsStoreRequest = romsStore.get(rom_id);
    romsStoreRequest.onsuccess = function() {
      var rom = romsStoreRequest.result;
      if (!rom)
      {
        alert('ROM not found');
        return;
      }
      aROMname = rom.name;
      activeROM = rom.id;
      currentGB.loadROM(rom.data, rom.emu);
      currentGB.loadState(state.data);
    };
  };
}

function uploadState(event, rom_id)
{
  var file = event.target.files[0];
  if (!file)
  {
    return;
  }

  var reader = new FileReader();
  reader.onload = function (e) {
    var state = e.target.result;
    if (!state)
    {
      return;
    }

    db.transaction(function (tx) {
      var name = file.name.slice(0, file.name.indexOf('.gba-state'));
      tx.executeSql('SELECT name FROM roms WHERE id=?', [rom_id], function (tx, result) {
        console.log(result);
        var row = results.rows.item(0);
        var rom_name = row.rom_name;
        tx.executeSql('INSERT INTO states (name, data, rom_id, rom_name) VALUES (?, ?, ?, ?)', [name, state, rom_id, rom_name], function (tx, results) {
        }, function(tx, err) {
          console.log(err);
        });
      }, function(tx, err) {
        console.log(err);
      });

    });
    alert('Upload successed!');
    statesState.push({editing:false});
    event.target.value = null;
    populateStates();
  };
  reader.readAsText(file);
}

function downloadState(i, menuID, name) {
  if (!confirm('Download '+name+' ?'))
  {
    return;
  }

  db.transaction(function(tx){
    tx.executeSql('SELECT data FROM states WHERE id = ?', [i], function(tx, result) {
      if (result.rows.length <= 0)
      {
        return;
      }
      var row = result.rows.item(0);
      var state = row.data;
      var url = window.URL.createObjectURL(
        new Blob([state], { type: 'application/octet-stream' })
      );
      var a = document.createElement('a');
      a.href = url;
      a.style.display = 'none';
      a.download = name + '.gba-state';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  });
}

function renameState(i, menuID, oldName) {
  var newName = prompt("What do you want to rename the state "+oldName+" to?", oldName);
  if (!newName)
  {
    return;
  }

  if (newName != oldName) {
    db.transaction(function (tx) {
      tx.executeSql('UPDATE states SET name = ? WHERE id = ?', [newName, i], function (tx, results) {
        populateStates();
      })
    })
  }
}

function deleteState(id, menuID, name) {
  if (!confirm('You want to delete state ' + name + '?'))
  {
    return;
  }
  var statesStore = idxDB.transaction(['states'], 'readwrite').objectStore('states');
  var statesStoreRequest = statesStore.delete(id);
  populateStates();
}

function stateMenu(id, romid, menuID) {
  if (editingStates) {
    if (statesState[menuID].editing) {
      statesState[menuID].editing = false;
      var e = document.getElementById("seC"+menuID)
      applyTransform(e, "translate(135px, 0)");
      return;
    } else {
      expandSEdit(menuID);
      return;
    }
  }
  loadState(id, romid);
}

function populateStates() {
  var stateCont = document.getElementById('stateCont');
  var html = '';
  var thisRomHTML = '';
  function uploadStateHTML(rom_id){
    return '<div>'
      + 'Upload State: '
      + '<input type="file" onchange="uploadState(event, \''+rom_id+'\')" accept=".gba-state" />'
      + '</div>'
    ;
  }
  editingStates = false;
  var prevRomID = -1;
  statesState = [];

  var statesStore = idxDB.transaction('states').objectStore('states');
  var statesIndex = statesStore.index('name');
  var i = 0;
  statesIndex.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (!cursor)
    {
      if ((thisRomHTML.length > 0) || (activeROM != -1))
      {
        thisRomHTML = '<div class="sectDivider" style="background-color:#B90546">'
          + 'For Current Game ('+htmlSafe(aROMname)+')'
          + uploadStateHTML(activeROM)
          + '</div>'
          + thisRomHTML
        ;
      }

      stateCont.innerHTML = thisRomHTML + html;
      return;
    }

    var row = cursor.value;

    var downloadStr = 'downloadState(\''+row.id+'\', '+i+', \''+singleQSafe(row.name)+'\');'
    var renameStr = 'renameState(\''+row.id+'\', '+i+', \''+singleQSafe(row.name)+'\');'
    var deleteStr = 'deleteState(\''+row.id+'\', '+i+', \''+singleQSafe(row.name)+'\');'

    var temp = '<div class="fileEntry" onclick="stateMenu(\''+row.id+'\', \''+row.rom_id+'\', '+i+'); event.preventDefault();">'
      + '<div class="entryText">'+htmlSafe(row.name)+'</div>'
      + '<div class="expandDiv">'
      + '<img src="assets/images/expandr.svg" class="expBut stateEx" id="SExp'+i+'" onclick="expandSEdit('+i+'); event.stopPropagation();" />'
      + '<div class="sEditControls" id="seC'+i+'">'
      + '<img src="assets/images/download.svg" width="30" height="30" class="download" onclick="' + downloadStr + '" />'
      + '<img src="assets/images/rename.svg" class="rename" onclick="' + renameStr + '" />'
      + '<img src="assets/images/bin.svg" class="delete" onclick="' + deleteStr + '" />'
      + '</div>'
      + '</div>'
      + '</div>'
    ;

    if (row.rom_id == activeROM)
    {
      thisRomHTML += temp;
      statesState.push({editing:false});
    }
    else
    {
      if (prevRomID != row.rom_id)
      {
        prevRomID = row.rom_id;
        html += '<div class="sectDivider" style="background-color:#B90546">'
          + htmlSafe(row.rom_name)
          + uploadStateHTML(row.rom_id)
          + '</div>'
        ;
      }
      html += temp;
      statesState.push({editing:false});
    }
    i++;
    cursor.continue();
  };
}

function expandSEdit(i) {
  var e = document.getElementById("seC"+i);
  applyTransform(e, "translate(0, 0)");
  statesState[i].editing = true;
}

function expandEdit(i) {
  var e = document.getElementById("feC"+i)
  applyTransform(e, "translate(0, 0)");
  recentFilesState[i].editing = true;
}

function renameFile(i, menuID, oldName) {
  var newName = prompt("What do you want to rename "+oldName+" to?", oldName);
  if (!newName)
  {
    return;
  }
  if ((newName != oldName) && (newName != null)) {
    db.transaction(function (tx) {
      tx.executeSql('UPDATE roms SET name = ? WHERE id = ?', [newName, i], function (tx, results) {
        tx.executeSql('UPDATE states SET rom_name = ? WHERE rom_id = ?', [newName, i], function (tx, results) {
          aROMname = newName;
          populateRecentFiles();
          populateStates();
        })
      })
    })
  }
}

function deleteFile(id, menuID, name) {
  if (!confirm("Are you sure you want to delete "+name+"? This will delete all states associated to it!"))
  {
    return;
  }
  if (activeROM == id) activeROM = null;
  db.transaction(function (tx) {
    tx.executeSql('DELETE FROM roms WHERE id = ?', [i], function (tx, results) {
      tx.executeSql('DELETE FROM states WHERE rom_id = ?', [i], function (tx, results) {
        populateRecentFiles();
        populateStates();
      })
    })
  })
}

var recentFilesState = [];
var statesState = [];
var editingFiles = false;
var editingStates = false;

function populateControlsDrop() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT id, name FROM styles', [], function (tx, results) {
      var cDrop = document.getElementById("controlsDrop");
      var html = ""
      var style = localStorage["currentStyle"];
      for (var i=0; i<results.rows.length; i++) {
        var row = results.rows.item(i);
        html += "<option id='"+row.id+"'"+((row.id == style)?" selected='selected'":"")+">"+htmlSafe(row.name)+"</option>"
      }
      cDrop.innerHTML = html;
    });
  });
}

function changeControls() {
  var el = document.getElementById("controlsDrop");
  var id = el.options[el.selectedIndex].id;
  loadStyle(id, function(){populateControlsDrop(); drawUIThumbs()});
}

function htmlSafe(input) {
  if (input == null) return "";
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;")
}

function singleQSafe(input) {
  if (input == null) return "";
  return input.replace(/'/g, "\\'")
}

function populateRecentFiles() {
  if (!idxDB)
  {
    setTimeout(populateRecentFiles, 100);
    return;
  }
  editingFiles = false;
  var rFCont = document.getElementById('rFCont');
  recentFilesState = [];
  var html = '';
  var romsStore = idxDB.transaction('roms').objectStore('roms');
  var indexRoms = romsStore.index('name');
  var i = 0;
  indexRoms.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (!cursor)
    {
      rFCont.innerHTML = html;
      return;
    }
    var row = cursor.value;
    var filename = htmlSafe(row.name);
    var loadStr = 'loadMenu(\''+row.id+'\', '+i+'); event.preventDefault();'
    var renameStr = 'renameFile('+row.id+', '+i+', \''+singleQSafe(filename)+'\');'
    var deleteStr = 'deleteFile('+row.id+', '+i+', \''+singleQSafe(filename)+'\');'

    html += '<div class="fileEntry" onclick="'+loadStr+'">'
      + '<div class="entryText">'+filename+'</div>'
      + '<div class="expandDiv">'
      + '<img src="assets/images/expandb.svg" class="expBut fileEx" id="FExp'+i+'" onclick="expandEdit('+i+'); event.preventDefault();" ontouchstart="expandEdit('+i+'); event.preventDefault();" />'
      + '<div class="fEditControls" id="feC'+i+'">'
      + '<img src="assets/images/rename.svg" class="rename" onclick="'+renameStr+'" />'
      + '<img src="assets/images/bin.svg" class="delete" onclick="'+deleteStr+'" />'
      + '</div>'
      + '</div>'
      + '</div>'
    ;

    recentFilesState.push({editing: false});
    i++;
    cursor.continue();
  };
}

function loadMenu(id, menuID) {
  if (editingFiles) {
    if (recentFilesState[menuID].editing) {
      recentFilesState[menuID].editing = false;
      var e = document.getElementById("feC"+menuID)
      applyTransform(e, "translate(90px, 0)");
    } else {
      expandEdit(menuID);
    }
    return;
  }
  loadDownloaded(id);
}

function loadDownloaded(id)
{
  if (!idxDB)
  {
    setTimeout(loadDownloaded, 100);
    return;
  }
  if (!id || (id == -1))
  {
    openFileSelect();
    return;
  }
  var romsStore = idxDB.transaction(['roms'], 'readonly').objectStore('roms');
  var request = romsStore.get(id);
  request.onsuccess = function() {
    var rom = request.result;

    if (!rom)
    {
      openFileSelect();
      return;
    }

    currentGB.loadROM(rom.data, rom.emu);
    activeROM = rom.id;
    aROMname = rom.name;

    // UI
    backButtonDisp("block");
    closeFileSelect();
  };
}

function saveCurrentState() {
  if (activeROM < 0)
  {
    alert('You must play a game!');
    return;
  }

  var d = new Date();
  var suggestedName = d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" - "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
  var name = prompt("What would you like to name the state?", suggestedName)
  if (!name) return;

  var state = currentGB.getSaveState();
  if (!state)
  {
    return;
  }

  var transaction = idxDB.transaction(['states'], 'readwrite');
  var statesStore = transaction.objectStore('states');
  var id = Math.random().toString(36).substring(2);
  statesStore.put({
    id: id,
    name: name,
    data: state,
    rom_id: activeROM,
    rom_name: aROMname,
  });

  populateStates();
}

function loadURL(url) {
  if (!url)
  {
    return;
  }

  currentGB.loadROM(url);
}

function initROMSelection(event, update)
{
  function renderChooseROMSelection(data) {
    romList = data;
    var parent = document.getElementById('chooseROMSelection');
    var selection = parent.getElementsByTagName('select')[0];
    var options_html = '<option disabled selected>---</option>';
    var i;
    var rl = romList.length;
    for (i = 0; i < rl; i++)
    {
      options_html += '<option value="'
        + romList[i].url
        + '">'
        + romList[i].filename
        + '</option>'
    }
    if (rl)
    {
      selection.innerHTML = options_html;
      parent.style.display = 'block';
      localStorage.setItem('romList', JSON.stringify(romList));
    }
  }
  var romList = localStorage.getItem('romList');
  if (typeof romList === 'string')
  {
    renderChooseROMSelection(JSON.parse(romList));
  }

  if (update || (romList ? false : true))
  {
    if (event)
    {
      event.target.onclick = function(e) {
        alert('Updating...');
      };
    }
    function jsonp(url, callback) {
      var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
      window[callbackName] = function(data) {
        delete window[callbackName];
        document.body.removeChild(script);
        callback(data);
      };

      var script = document.createElement('script');
      script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
      document.body.appendChild(script);
    }

    var GoogleAppScript_ID = 'AKfycbzzoS36cl8dSCYExKyyzpnLEMeUfclfno0hA37nbFTF8tuKFeRV';

    jsonp('https://script.google.com/macros/s/' + GoogleAppScript_ID + '/exec', function(data){
      renderChooseROMSelection(data);
      if (event)
      {
        event.target.onclick = function(e) {
          initROMSelection(e, update);
        };
      }
      if (update)
      {
        alert('Updated ROM selection');
      }
    });
  }
}

function chooseROMSelection(event)
{
  loadURL(event.target.value);
}

function chooseROMSearchSectionToggle(event)
{
  var searchResultSection = document.getElementById('chooseROMSearchResult');
  var textControl = event.target.parentElement.getElementsByTagName('input')[0];
  var selectControl = event.target.parentElement.getElementsByTagName('select')[0];
  if (searchResultSection.style.display === 'block')
  {
    textControl.style.display = 'none';
    selectControl.style.display = 'inline-block';
    searchResultSection.style.display = 'none';
    applyTransform(event.target, 'scaleY(1)');
  }
  else
  {
    var selection = document.getElementById('chooseROMSelection');
    selection.parentElement.scrollTop = selection.offsetTop - selection.parentElement.offsetTop;
    selectControl.style.display = 'none';
    textControl.style.display = 'inline-block';
    searchResultSection.style.display = 'block';
    applyTransform(event.target, 'scaleY(-1)');
    textControl.focus();
  }
}

function chooseROMSearchOnInput(event)
{
  // https://www.quora.com/Algorithms/How-is-the-fuzzy-search-algorithm-in-Sublime-Text-designed-How-would-you-design-something-similar
  var romList = JSON.parse(localStorage.getItem('romList'));
  var query = event.target.value;

  var tokens = query.toLowerCase().split('');
  var rsHTML = '<div style="margin:10px;max-height: 200px;overflow-x: hidden;border: 1px solid #ccc;">';
  romList.forEach(function(rom) {
    var tokenIndex = 0;
    var stringIndex = -1;

    string = rom.filename.toLowerCase();

    while ((stringIndex++) < string.length) {
      if (string[stringIndex] === tokens[tokenIndex])
      {
        tokenIndex++;
        if (tokenIndex >= tokens.length)
        {
          rsHTML += romElm(rom);
          break;
        }
      }
    }
  });
  rsHTML += '</div>';

  function romElm(rom) {
    return '<div class="fileEntry" onclick="loadURL(\''+rom.url.replace(/'/g, "\\'")+'\');">'
      + '<span style="padding-left:5px;">'
      + rom.filename
      + '</span>'
      + '</div>'
    ;
  };

  document.getElementById('chooseROMSearchResult').innerHTML = rsHTML;
}

function loadRomFromUrl(url, callback)
{
  function drawProgress(e) {
    var progressSeg = ["#B90546", "#5255A5", "#79AD36", "#DDB10A", "#009489"]

    var internalCanvas = currentGB.canvas;
    var internalCtx = internalCanvas.getContext('2d');
    internalCtx.fillStyle = "#FFFFFF"
    internalCtx.fillRect(0, 0, 160, 144);

    internalCtx.fillStyle = "#EEEEEE"
    internalCtx.fillRect(30, 71, 100, 2);
    var percent = e.loaded/e.total;

    for (var i=0; i<5; i++) {
      var ext = Math.min(0.2, percent-(i*0.2));
      if (ext > 0) {
        internalCtx.fillStyle = progressSeg[i]
        internalCtx.fillRect(30+i*20, 71, ext*100, 2);
      }
    }

    internalCtx.fillStyle = "rgba(0, 0, 0, 0.2)"
    internalCtx.fillRect(30, 71, 100, 1);

    ctx.drawImage(internalCanvas, 0, 0, canvas.width, canvas.height);
  }

  var loadfile = new XMLHttpRequest();
  // loadfile.onprogress = drawProgress;
  loadfile.open('GET', url);
  loadfile.responseType = 'arraybuffer';

  if (!url)
  {
    errorScreen('URL is empty');
    return;
  }
  var filename = url.split('/').pop();
  loadfile.onload = function() {
    var emu = filename.slice(-4) === '.gba' ? 'gba' : 'gb';
    addROM(filename, emu, loadfile.response, populateRecentFiles);
    callback(loadfile.response);
    renderUI();
  };
  loadfile.onerror = function() {
    loadfile.open('POST', url);
    loadfile.onerror = function(err) {
      // errorScreen(err);
    }
    loadfile.send();
  }
  loadfile.send();
};

