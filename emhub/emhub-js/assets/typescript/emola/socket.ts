///<reference path="reader.ts"/>
///<reference path="emola.ts"/>

module emola {
  export class Socket {
    static DEFAULT_PORT = 5000
    static DEFAULT_HOST = "localhost"

    socket: WebSocket

    constructor() {
        var socket = new WebSocket("ws://" + Socket.DEFAULT_HOST + ":" + Socket.DEFAULT_PORT);
        socket.onopen = (event)  => console.log("web socket connection is established.");
        socket.onmessage = (event) => {
          var result = Main.read(event.data);
          console.log(result);
        };
        this.socket = socket
    }

    send(message: string) {
        this.socket.send(message);
    }
  }
}
