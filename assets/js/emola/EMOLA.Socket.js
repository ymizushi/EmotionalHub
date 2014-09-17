EMOLA.Socket = function (socket) {
  socket.onopen = function (event) {
    socket.send("hello world!"); 
  };
  socket.onmessage = function (event) {
    console.log(event.data);
  };
  this.socket = socket;
};
