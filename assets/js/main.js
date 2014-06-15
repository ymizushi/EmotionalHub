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

function createImg(x, y) {
  var img = document.createElement("img");
  img.src = "https://a248.e.akamai.net/assets.github.com/images/icons/emoji/arrow_down.png"; 
  img.id= x + "_" + y + "_" + "emoji";
  img.alt=":arrow_down:";
  img.class = "emoji"; 
  img.draggable="true";
  img.height="20";
  img.width="20";
  img.align="absmiddle";
  img.setAttribute("ondragstart", "f_dragstart(event)");
  return img;
}

function createDropboxDiv(id) {
  var div = document.createElement("span");
  div.id = id;
  div.setAttribute("ondragover", "f_dragover(event)");
  div.setAttribute("ondrop", "f_drop(event)");
  return div
}

function generate() {
  width = document.getElementById("width_button").value;
  height = document.getElementById("height_button").value;

  var palette = document.getElementById("palette");
  for (var i =palette.childNodes.length-1; i>=0; i--) {
    palette.removeChild(palette.childNodes[i]);
  }
  for (i=0;i<EMOHUB.emojiTemplate.length;i++) {
    var img = createBaseImg(EMOHUB.emojiTemplate[i]);
    palette.appendChild(img);
    if (i%40==0) {
      var br = document.createElement("br");
      palette.appendChild(br);
    }
  }

  var dropbox = document.getElementById("dropbox");
  for (var i =dropbox.childNodes.length-1; i>=0; i--) {
    dropbox.removeChild(dropbox.childNodes[i]);
  }
  for (y=0;y<height;y++) {
    for (x=0;x<width;x++) {
      var div = createDropboxDiv(x+"_"+y+"_"+"dropbox")
      var img = createImg(x, y);
      div.appendChild(img);
      dropbox.appendChild(div);
    }
    var br = document.createElement("br")
    dropbox.appendChild(br);
  }
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
