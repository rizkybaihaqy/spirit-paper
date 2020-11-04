var text_title = "Overlay text";
var imageLoader = document.getElementById("imageLoader");
imageLoader.addEventListener("change", handleImage, false);
var canvas = document.getElementById("imageCanvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.crossOrigin = "anonymous";

window.addEventListener("load", DrawPlaceholder);

function DrawPlaceholder() {
  img.onload = function () {
    DrawOverlay(img);
    DrawText();
    DynamicText(img);
  };
  img.src = "imgs/es.png";
}
function DrawOverlay(img) {
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function DrawText() {
  ctx.fillStyle = "white";
  ctx.textBaseline = "middle";
  ctx.font = "20px 'Montserrat'";
  //ctx.fillText(text_title, 170, 190);
}
function DynamicText(img) {
  document.getElementById("name").addEventListener("keyup", function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    DrawOverlay(img);
    DrawText();
    text_title = this.value;
    // ctx.fillText(text_title, 170, 190);
    var a = 170;
    var b = 190;
    var lineheight = 20;
    var lines = text_title.split("  ");

    for (var j = 0; j < lines.length; j++)
      ctx.fillText(lines[j], a, b + j * lineheight);
  });
}
function handleImage(e) {
  var reader = new FileReader();
  var img = "";
  var src = "";
  reader.onload = function (event) {
    img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = event.target.result;
    src = event.target.result;
    canvas.classList.add("show");
    DrawOverlay(img);
    DrawText();
    DynamicText(img);
  };

  reader.readAsDataURL(e.target.files[0]);
}
function convertToImage() {
  //   window.open(canvas.toDataURL("png"));
  var dataURL = canvas.toDataURL("png");
  button.href = dataURL;
}
document.getElementById("download").onclick = function download() {
  saveAs();
};

function saveAs() {
  var a = document.createElement("a");
  a.href = dataURL = canvas.toDataURL("png");
  a.download = "image.png";

  a.click();
}
