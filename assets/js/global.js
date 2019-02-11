window.indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.OIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.OIDBTransaction || window.msIDBTransaction;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
  window.MozBlobBuilder;
var idxDB;
var animationFrameId;

function createidxDB()
{
  var DBOpenRequest = window.indexedDB.open('gbidxdb', 1.1);

  DBOpenRequest.onsuccess = function(event) {
    // store the result of opening the database in the db variable. This is used a lot below
    idxDB = DBOpenRequest.result;
  };

  DBOpenRequest.onupgradeneeded = function(event) {
    var idxDB = event.target.result;

    idxDB.onerror = function(event) {
    };

    // Create an objectStore for this database

    var romsStore = idxDB.createObjectStore('roms', {
      keyPath: 'id',
      autoIncrement : true,
    });
    romsStore.createIndex('name', 'name', { unique: false });
    romsStore.createIndex('emu', 'emu', { unique: false });
    romsStore.createIndex('data', 'data', { unique: true });

    var statesStore = idxDB.createObjectStore('states', {
      keyPath: 'id',
      autoIncrement : true,
    });
    statesStore.createIndex('name', 'name', { unique: false });
    statesStore.createIndex('data', 'data', { unique: false });
    statesStore.createIndex('rom_id', 'rom_id', { unique: false });
    statesStore.createIndex('rom_name', 'rom_name', { unique: false });

    // define what data items the roms will contain

  }
};

var db = openDatabase('gbwdb', '1.0', 'amebo state and rom store', 2 * 1024 * 1024); //, createDB
var mainUI;
var currentGB = {
  emu: null,
  isPaused: true,
  canvas: document.getElementById('emulator'),

  setPause: function (pause)
  {
    currentGB.isPaused = pause;
    if (currentGB.emu instanceof GameBoyAdvance)
    {
      (pause ? gba.pause() : gba.runStable());
    }
    else if (currentGB.emu instanceof gb)
    {
      gameboy.paused = pause;
    }
  },

  /**
   * @param {float} Value of volume
   */
  setVolume: function (value)
  {
    gba.audio.masterVolume = Math.pow(2, value) - 1;
    gameboy.setAudioEngineVolume(value);
  },

  /**
   * Set speed
   * @param {float} Speed
   */
  setSpeed: function (speed)
  {
  },

  getSaveState: function()
  {
    if (currentGB.emu instanceof GameBoyAdvance)
    {
      return gba.mmu.save.buffer;
    }
    else if (currentGB.emu instanceof gb)
    {
      return gameboy.saveState();
    }
  },

  loadState: function(data)
  {
    if (currentGB.emu instanceof GameBoyAdvance)
    {
      gba.setSavedata(data);
    }
    else if (currentGB.emu instanceof gb)
    {
      gameboy.loadState(data);
    }
    else
    {
      console.log(111);
      setTimeout(function(){
        currentGB.loadState(data);
      }, 1000);
    }
  },

  /**
   *
   */
  loadROM: function(rom, emu)
  {
    currentGB.setPause(true);
    gameboy.canvas = null;
    gba.targetCanvas = null;

    var buffer;
    if (rom instanceof ArrayBuffer)
    {
      buffer = rom;
    }
    else if (typeof rom === 'string')
    {
      var internalCanvas = document.createElement("canvas");
      var internalCtx = internalCanvas.getContext('2d');
      var canvas = currentGB.canvas;
      var ctx = canvas.getContext('2d');
      function drawProgress(e)
      {
        var progressSeg = ["#B90546", "#5255A5", "#79AD36", "#DDB10A", "#009489"]

        internalCtx.fillStyle = "#FFFFFF";
        internalCtx.fillRect(0, 0, 160, 144);

        internalCtx.fillStyle = "#EEEEEE";
        internalCtx.fillRect(30, 71, 100, 2);
        var percent = e.loaded/e.total;

        for (var i=0; i<5; i++) {
          var ext = Math.min(0.2, percent-(i*0.2));
          if (ext > 0) {
            internalCtx.fillStyle = progressSeg[i];
            internalCtx.fillRect(30+i*20, 71, ext*100, 2);
          }
        }

        internalCtx.fillStyle = "rgba(0, 0, 0, 0.2)"
        internalCtx.fillRect(30, 71, 100, 2);

        ctx.drawImage(internalCanvas, 0, 0, canvas.width, canvas.height);
      }

      var url = rom;
      var loadfile = new XMLHttpRequest();
      loadfile.onprogress = drawProgress;
      loadfile.open('GET', url);
      loadfile.responseType = 'arraybuffer';

      if (!url)
      {
        errorScreen('URL is empty');
        return;
      }
      var filename = url.split('/').pop();
      loadfile.onload = function() {
        var ext = filename.slice(-4);
        buffer = loadfile.response;
        if (ext === '.zip')
        {
          if (!JSZip)
          {
            return;
          }
          var zip = new JSZip(loadfile.response);
          var file = zip.file(/.gba/)[0];
          if (file)
          {
            emu = 'gba';
          }
          else
          {
            file = zip.file(/.gb/)[0];
            emu = 'gb';
          }

          if (file)
          {
            filename = file.name;
            buffer = file.asArrayBuffer();
          }
          else
          {
            // TODO: Error
            return;
          }
        }
        else if (ext === '.gba')
        {
          emu = 'gba';
        }
        else if ((ext.slice(-3) === '.gb') || (ext.slice(-4) === '.gbc'))
        {
          emu = 'gb';
        }
        else
        {
          // TODO: Unsupported
          return;
        }
        addROM(filename, emu, buffer, populateRecentFiles);
        currentGB.loadROM(buffer, emu);
      };
      loadfile.onerror = function() {
        loadfile.open('POST', url);
        loadfile.onerror = function(err) {
          // errorScreen(err);
        }
        loadfile.send();
      }
      loadfile.send();
    }
    else
    {
      // TODO: Unsupported
      return;
    }

    if (emu === 'gb')
    {
      gameboy.canvas = currentGB.canvas;
      currentGB.emu = gameboy;
      gameboy.loadROMBuffer(buffer);
    }
    else if (emu === 'gba')
    {
      gba.setCanvas(currentGB.canvas);
      currentGB.emu = gba;
      gba.setRom(buffer);
      gba.runStable();
    }

    backButtonDisp("block");
    closeFileSelect();
    renderUI();
    currentGB.setPause(buffer ? false : true);
  },

  saveState: function() {
    if (!currentGB.emu)
    {
      return;
    }
  },
};

window.onload = function(evt) {
  // UI Init

  window.URL = window.URL || window.webkitURL;
  createidxDB();
  createDB();

  loadStyle(localStorage["currentStyle"],
    function(){
      installStyle(defaultControls, function(id) {
        localStorage["currentStyle"] = id;
        console.log('style', id);
        loadStyle(id, showUI, function(){
          loadStyle(0, showUI, function(){
            console.error('Load style error');
          });
        });
      })
    }, showUI
  );
  UIcanvas = document.getElementById("ui");
  UIctx = UIcanvas.getContext("2d");

  // end UI init

  // Enable Load Bios
  var gbSettings = localStorage.getItem('GameBoySettings');
  if (!gbSettings)
  {
    gbSettings = {
      audioEngineVolume: 0.5,
      enableLoadBios: true,
    };
  }
  else
  {
    gbSettings = JSON.parse(gbSettings);
  }

  var enableLoadBiosController = document.getElementById('enableLoadBiosControl');
  var currentEnableLoadBios = gbSettings.enableLoadBios;
  enableLoadBiosController.checked = currentEnableLoadBios;
  enableLoadBiosController.onchange = function (e)
  {
    gbSettings.enableLoadBios = e.target.checked;
    localStorage.setItem('GameBoySettings', JSON.stringify(gbSettings));
    alert('You must restart / refresh this app to apply setting');
  }

  gba = new GameBoyAdvance();
  gba.setCanvas(currentGB.canvas);
  gba.logLevel = gba.LOG_ERROR;
  loadRom('assets/libs/GBA.js/resources/bios.bin', function (bios) {
    gba.setBios(bios);
  });

  gameboy = new gb(null, currentGB.canvas, {
    cButByte: true,
    rootDir: '',
    enableLoadBios: currentEnableLoadBios,
  });
  backButtonDisp('none');
  setUpButtons();

  // Selections
  initROMSelection(null, false);

  // Volume
  var volumeController = document.getElementById('audioEngineVolumeControl');
  volumeController.onchange = function(e) {
    gbSettings.audioEngineVolume = e.target.value;
    currentGB.setVolume(gbSettings.audioEngineVolume);
    localStorage.setItem('GameBoySettings', JSON.stringify(gbSettings));
  };
  var currentVolume = gbSettings.audioEngineVolume;
  volumeController.value = currentVolume;
  currentGB.setVolume(gbSettings.audioEngineVolume);

  document.getElementById('chooseFile').onchange = function (e) {
    if (!e.target.files.length)
    {
      return;
    }
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.gb = gameboy;
    gameboy.onload = function() {
      addROM(file.name, byteToString(gameboy.game), populateRecentFiles);
    }
    reader.onload = function(e) {
      e.target.gb.loadROMBuffer(e.target.result, e.target.result);
    };
    reader.readAsArrayBuffer(file);
  };

  setTimeout(function(){
    setActiveMenu(1);
  }, 16);

  setInterval(periodicState, 1000);

  window.addEventListener('unload', gameboy.saveBattery);
  var p = navigator.platform;
  var iOS = ( p === 'iPad' || p === 'iPhone' || p === 'iPod' );
  if (iOS) setInterval(gameboy.saveBattery, 1000);

  // Event Handle
  var ui = document.getElementById('ui');
  ui.addEventListener('touchmove', handleTouch);
  ui.addEventListener('touchstart', handleTouch);
  ui.addEventListener('touchend', handleTouch);
  ui.addEventListener('mousedown', handleMouse);
  ui.addEventListener('mouseup', handleMouse);
  ui.addEventListener('mousemove', handleMouse);
  window.addEventListener("keydown", handleKeyboard);
  window.addEventListener("keyup", handleKeyboard);
  window.addEventListener('resize', renderUI);
  window.addEventListener('scroll', scrollFix);
  window.addEventListener('orientationchange', scrollFix);
  window.addEventListener('message', handleMessage);
  window.addEventListener('touchstart', function onFirstHover() {
    ui.removeEventListener('mouseup', handleMouse, false);
    ui.removeEventListener('mousedown', handleMouse, false);
    ui.removeEventListener('mousemove', handleMouse, false);
    window.removeEventListener('touchstart', onFirstHover, false);
  }, false);
};

