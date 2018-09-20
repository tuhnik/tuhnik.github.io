# Pixel board
[Socket.io](https://socket.io/) based pixel board where multiple users can have fun together. <br>
Meaningful UI coming soon™. Until then you can use the following shortcuts:
* Spacebar - acts as color picker.
* Enter - toggle grid on/off.
## Server config example
```javascript
let http = require('http')
var app = require("express")()
let server = http.createServer(app).listen(PORT)
let sockets = require('./app')(app, server);
app.use('/', express.static(__dirname+'/client'));
```
## Live version
[leib.duckdns.org](https://leib.duckdns.org/pix)
