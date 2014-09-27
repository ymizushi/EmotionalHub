var EMOLA;
(function (EMOLA) {
    var WindowManager = (function () {
        function WindowManager() {
          this.drugging = false;
        }
        return WindowManager;
    })();

    window.onmousedown = function (event) {
      WindowManager.drugging = true;
    };
    
    window.onmouseup = function (event) {
      WindowManager.drugging = false;
    };
    
    window.onmousemove = function (event) {
      if (drugging) {
        drugging.point = getPosition();
      }
    };

    EMOLA.WindowManager = WindowManager;
})(EMOLA || (EMOLA = {}));

