///<reference path="reader.ts"/>
///<reference path="emola.ts"/>

module emola {
  export class Socket {
    static DEFAULT_PORT = 49387
    //static DEFAULT_HOST = "localhost"
    static DEFAULT_HOST = "emohub-ws.paas.db.dwango.co.jp"

    socket: WebSocket

    constructor() {
        this.socket = new WebSocket("ws://" + Socket.DEFAULT_HOST + ":" + Socket.DEFAULT_PORT);
        this.socket.onopen = (event)  => console.log("web socket connection is established.");
    }

    onMessage(callback: (event) => any) {
      this.socket.onmessage = callback;
    }

    send(message: string) {
        this.socket.send(message);
    }
  }
}
