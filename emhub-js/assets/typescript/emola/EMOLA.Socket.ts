EMOLA.Socket = function () {
  var socket = new WebSocket("ws://localhost:5000");
  socket.onopen = function (event) {
    console.log("web socket connection is established.");
  };
  socket.onmessage = function (event) {
    console.log(event.data);
  };
  this.socket = socket;
};

EMOLA.Socket.prototype.send = function (message) {
  this.socket.send(message);
};

