import urllib2
import json

data = json.load(urllib2.urlopen(
  'https://api.github.com/repos/GBA-Dev/BinaryGames/git/trees/master?recursive=1'
))

roms = [];

dl_url = 'https://raw.githubusercontent.com/GBA-Dev/BinaryGames/master/'
for file in data['tree']:
  fpath = file['path']
  if ('.zip' not in fpath[-4:]):
    if ('.gb' not in fpath[-4:]):
      continue
  roms.append(dl_url + fpath)

f = open('../roms.json', 'w')
f.write(json.dumps(roms))
f.close()

