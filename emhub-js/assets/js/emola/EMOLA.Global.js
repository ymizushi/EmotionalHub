EMOLA.Global = {};
EMOLA.Global.env = new EMOLA.DictEnv(null);
EMOLA.Global.tokenReader = new EMOLA.TokenReader();
EMOLA.Global.graphicContext = null;
EMOLA.Global.socket = new EMOLA.Socket();
EMOLA.Global.drawingManager = new EMOLA.DrawingManager(EMOLA.Global.socket);
EMOLA.Global.lastClickedPoint = null;
EMOLA.Global.drugging = false;
