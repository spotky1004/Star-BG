//init
var canvas = document.querySelector('#canvas');
var c = canvas.getContext('2d');
var stars = [];
var mousePos = [-1, -1];

//functions
function loop() {
  if (0.0001 < Math.random()) {
    stars.push({
    'r': Math.random()*Math.PI*2,
    'p':
    (
      Math.random() > 0.5 ?
        (
          Math.random() > 0.5 ?
          [Math.random()*canvas.height, 0] :
          [Math.random()*canvas.height, canvas.width]
        ) : (
          Math.random() > 0.5 ?
          [0, Math.random()*canvas.width] :
          [canvas.height, Math.random()*canvas.height]
        )
      )
    }
  );
  }
  for (var i = 0; i < stars.length; i++) {
    stars[i].p[0] += Math.sin(stars[i].r)*canvas.height/300;
    stars[i].p[1] -= Math.cos(stars[i].r)*canvas.height/300;
    if (!(0 < stars[i].p[0] && stars[i].p[0] < canvas.width) || !(0 < stars[i].p[1] && stars[i].p[1] < canvas.height)) {
      stars.splice(i, 1);
      i--;
      continue;
    }
  }
  c.clearRect(0, 0, canvas.width, canvas.height);
  c.beginPath();
  c.fill();
  for (var i = 0; i < stars.length; i++) {
    c.beginPath();
    c.arc(stars[i].p[0], stars[i].p[1], canvas.height/250, 0, 2*Math.PI);
    c.stroke();
    c.fill();
    if (Math.abs(mousePos[0]-stars[i].p[0]) < 80 && Math.abs(mousePos[1]-stars[i].p[1]) < 80) {
      var sPos = [stars[i].p[0], -stars[i].p[1]];
      for (var j = 0; j < stars.length; j++) {
        if (i == j) continue;
        if (Math.abs(stars[j].p[0]-stars[i].p[0]) < 80 && Math.abs(stars[j].p[1]-stars[i].p[1]) < 80) {
          c.beginPath();
          c.moveTo(stars[i].p[0], stars[i].p[1]);
          c.lineTo(stars[j].p[0], stars[j].p[1]);
          c.stroke();
        }
      }
    }
  }
}

//events
document.onmousemove = getMousePos;
function getMousePos(event) {
  mousePos = [event.clientX, event.clientY]
}

//loopInterval
setInterval( function () {
  loop();
}, 33);
