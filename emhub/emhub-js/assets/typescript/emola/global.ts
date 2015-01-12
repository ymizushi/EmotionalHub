/// <reference path="lang.ts" />
/// <reference path="reader.ts"/>
/// <reference path="shape.ts" />
/// <reference path="syntax_list.ts"/>
/// <reference path="canvas.ts"/>
/// <reference path="socket.ts"/>
/// <reference path="manager.ts"/>

module emola {
  export class Global {
    static env = new Env(null)
    static tokenReader: TokenReader = new TokenReader()
    static graphicContext:CanvasContext = null
    static socket: Socket = new Socket()
    static drawingManager: DrawingManager = new DrawingManager(Global.socket)
    static drugging = false
  }
}
