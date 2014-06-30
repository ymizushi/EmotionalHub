function createBaseImg(id) {
  var img = document.createElement("img");
  img.id =  ":" + id + ":";
  img.class = "emoji"; 
  img.title = ":" + id + ":"; 
  img.alt = ":" + id + ":";
  img.src = "https://a248.e.akamai.net/assets.github.com/images/icons/emoji/" + id + ".png"; 
  img.height="20";
  img.width="20";
  img.align="absmiddle";
  img.draggable="true";
  img.setAttribute("ondragstart", "f_dragstart(event)");
  return img;
}

function createDropboxDiv(id) {
  var div = document.createElement("span");
  div.id = id;
  div.setAttribute("ondragover", "f_dragover(event)");
  div.setAttribute("ondrop", "f_drop(event)");
  return div;
}

function initPallet(pallet, height, width) {
  // パレット初期化
  for (var i=pallet.childNodes.length-1;i>=0; i--) {
    pallet.removeChild(pallet.childNodes[i]);
  }

  // パレット追加
  for (var i=0;i<EMOHUB.emojiTemplate.length;i++) {
    var img = createBaseImg(EMOHUB.emojiTemplate[i]);
    pallet.appendChild(img);
    if ((i+1)%40 == 0) {
      var br = document.createElement("br");
      pallet.appendChild(br);
    }
  }
  return pallet;
}

function initDropbox(dropbox) {
  for (var i =dropbox.childNodes.length-1; i>=0; i--) {
    dropbox.removeChild(dropbox.childNodes[i]);
  }
  for (var y=0;y<height;y++) {
    for (var x=0;x<width;x++) {
      var div = createDropboxDiv(x+"_"+y+"_"+"dropbox")
      var img = createBaseImg("arrow_down");
      div.appendChild(img);
      dropbox.appendChild(div);
    }
    var br = document.createElement("br")
    dropbox.appendChild(br);
  }
}

function generate() {
  width = document.getElementById("width_button").value;
  height = document.getElementById("height_button").value;

  var pallet = document.getElementById("pallet");
  initPallet(pallet, height, width);

  var dropbox = document.getElementById("dropbox");
  initDropbox(dropbox);
}

function f_dragstart(event){
  event.dataTransfer.setData("text", event.target.id);
}

function f_dragover(event){
  event.preventDefault();
}

function f_drop(event){
  var idName = event.dataTransfer.getData("text");
  var dragElem = document.getElementById(idName);
  var copyDragElem = dragElem.cloneNode(true);
  event.currentTarget.childNodes[0].remove();
  event.currentTarget.appendChild(copyDragElem);
  event.preventDefault();

  var dropbox = document.getElementById('dropbox');
  var outputText = "";
  for(var i=0;i<dropbox.childNodes.length;i++) {
    var childNode = dropbox.childNodes[i].childNodes[0];
    if (childNode) {
      outputText += childNode.id;
    } else {
    console.log("hoge");
      outputText += "\n";
    }
  }

  var generateTextInput = document.getElementById("generate_text"); 
  generateTextInput.value = outputText;
}
