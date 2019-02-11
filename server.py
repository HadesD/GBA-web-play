#!/usr/bin/python

import SimpleHTTPServer
import SocketServer
import mimetypes
import sys
import os

PORT = 8000
if len(sys.argv) == 2:
  PORT = int(sys.argv[1])

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

Handler.extensions_map['.svg']='image/svg+xml'
httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()

