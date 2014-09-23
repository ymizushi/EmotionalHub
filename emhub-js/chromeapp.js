chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('public/emola.html', {
    id: "mainWin",
    bounds: {
      width: 800,
      height: 600
    },
    minWidth: 600,
    minHeight: 450
  });
});
