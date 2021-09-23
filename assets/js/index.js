import { drawBackground } from './background.js';

var dylanPic = new Image();
dylanPic.src = 'assets/photos/headshot.jpg';

var jukePic = new Image();
jukePic.src = 'assets/photos/juke.svg';

var githubPic = new Image();
githubPic.src = 'assets/photos/github.svg';

var lIPic = new Image();
lIPic.src = 'assets/photos/linkedin.svg';

var tBPic = new Image();
tBPic.src = 'assets/photos/TBLogoSq.svg';

var twitterPic = new Image();
twitterPic.src = 'assets/photos/twitter.svg';

var backgroundFrame = 0;
var totalNodes = 6;

var frame = 0;
var totalFrames = 628;

var wobbleVelos = []

for (var i = 0; i < totalNodes; i++) {
  wobbleVelos.push(Math.random() * 3 + 2);
}

function makeCoord(isX, index, mobile) {
  var velo = wobbleVelos[index];
  if (mobile) {
    velo *= 2;
  }

  if (isX) {
    return velo * Math.sin(frame / 100);
  } else {
    return velo * Math.cos(frame / 100);
  }
}

function shouldDraw4Desktop() {
  if (window.innerHeight / window.innerWidth >= 1) {
    return false;
  } else {
    return true;
  }
}

function drawCircle(context, lineWidth, x, y, radius, radiusMult, img) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2, false);
  context.save();
  context.clip();
  context.drawImage(img, x - radius * radiusMult / 2, y - radius * radiusMult / 2, radius * radiusMult, radius * radiusMult);
  context.restore();
  context.strokeStyle = "#FFFFFF";
  context.lineWidth = lineWidth;
  context.stroke();
  context.closePath();
  return { x, y, radius };
}

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function drawLink(id, url, x, y, radius) {
  var link = document.getElementById(id);
  if (!! link) {
    link.style.left = (x - radius).toString() + "px";
    link.style.top = (y - radius).toString() + "px";
    return
  }

  var link = document.createElement("div");
  link.setAttribute("id", id);
  link.addEventListener("click", function() { window.open(url, '_blank'); });
  link.style.position = "absolute";
  link.style.zIndex = 3;
  link.style.cursor = "pointer";
  link.style.left = (x - radius).toString() + "px";
  link.style.top = (y - radius).toString() + "px";
  link.style.width = (radius * 2).toString() + "px";
  link.style.height = (radius * 2).toString() + "px";
  link.style.borderRadius = (radius).toString() + "px";
  document.getElementById("home-view").appendChild(link);
}


function draw() {
  var h = $('#home-view').height();
  var w = $('#home-view').width();
  var canvas = document.querySelector('#network');
  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);

  //Define Attributes
  var dylanA = {x: w / 8 + makeCoord(false, 0, false), y: h - w / 10 - h / 15 + makeCoord(true, 0, false), radius: w / 10, lineWidth: w / 90};
  var jukeA = {x: w / 3.3 + makeCoord(true, 1, false), y: h / 5 + makeCoord(false, 1, false), radius: w / 20, lineWidth: w / 120};
  var githubA = {x: w / 2.5 + makeCoord(false, 2, false), y: h / 1.9 + makeCoord(true, 2, false), radius: w / 23, lineWidth: w / 120};
  var lIA = {x: w / 2 + makeCoord(true, 3, false), y: h / 5 + makeCoord(false, 3, false), radius: w / 26, lineWidth: w / 120};
  var tBA = {x: w / 1.65 + makeCoord(false, 4, false), y: h / 2.1 + makeCoord(true, 4, false), radius: w / 22, lineWidth: w / 120};
  var twitterA = {x: w / 1.4 + makeCoord(true, 5, false), y: h / 5 + makeCoord(false, 5, false), radius: w / 28, lineWidth: w / 120};

  //Draw Art
  var vals = drawCircle(context, dylanA.lineWidth, dylanA.x, dylanA.y, dylanA.radius, 2, dylanPic);
  drawLine(context, vals.x + vals.radius / 1.3, vals.y - vals.radius / 1.6, jukeA.x - jukeA.radius / 1.3, jukeA.y + jukeA.radius / 1.6);
  var vals = drawCircle(context, jukeA.lineWidth, jukeA.x, jukeA.y, jukeA.radius, 1.5, jukePic);
  drawLink("jukeLink", "https://jukeboxdapp.com", vals.x, vals.y, vals.radius);
  drawLine(context, vals.x + vals.radius / 1.7, vals.y + vals.radius / 1.4, githubA.x - githubA.radius / 1.5, githubA.y - githubA.radius / 1.5);
  var vals = drawCircle(context, githubA.lineWidth, githubA.x, githubA.y, githubA.radius, 1.5, githubPic);
  drawLink("githubLink", "https://github.com/dylanireland", vals.x, vals.y, vals.radius);
  drawLine(context, vals.x + vals.radius / 1.4, vals.y - vals.radius + vals.radius / 5, lIA.x - lIA.radius / 1.7, lIA.y + lIA.radius / 1.5);
  var vals = drawCircle(context, lIA.lineWidth, lIA.x, lIA.y, lIA.radius, 1.1, lIPic);
  drawLink("lILink", "https://www.linkedin.com/in/dylanireland/", vals.x, vals.y, vals.radius);
  drawLine(context, vals.x + vals.radius / 1.6, vals.y + vals.radius / 1.5, tBA.x - tBA.radius / 1.3, tBA.y - tBA.radius / 1.9);
  var vals = drawCircle(context, tBA.lineWidth, tBA.x, tBA.y, tBA.radius, 1.5, tBPic);
  drawLink("tBLink", "https://new.thompsonbarney.com/", vals.x, vals.y, vals.radius);
  drawLine(context, vals.x + vals.radius / 1.2, vals.y - vals.radius / 1.7, twitterA.x - twitterA.radius / 1.2, twitterA.y + twitterA.radius / 1.5);
  var vals = drawCircle(context, twitterA.lineWidth, twitterA.x, twitterA.y, twitterA.radius, 1.2, twitterPic);
  drawLink("twitterLink", "https://twitter.com/DylanIrel", vals.x, vals.y, vals.radius);

  frame += 1;
  if (frame == totalFrames) {
    frame = 0;
  }
}

function drawMobile(w, h) {
  var canvas = document.querySelector('#network');
  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);

  //Define Attributes
  var dylanA = {x: w / 3.25 + makeCoord(false, 0, true), y: w / 3.25 + makeCoord(true, 0, true), radius: w / 4, lineWidth: w / 40};
  var jukeA = {x: w / 1.3 + makeCoord(true, 1, true), y: h / 3.7 + makeCoord(false, 1, true), radius: w / 6, lineWidth: w / 45};
  var githubA = {x: w / 3.7 + makeCoord(false, 2, true), y: h / 3.5 + dylanA.radius + makeCoord(true, 2, true), radius: w / 6.5 - dylanA.radius / 10, lineWidth: w / 50};
  var tBA = {x: w / 1.5 + makeCoord(true, 3, true), y: h / 2.1 + makeCoord(false, 3, true), radius: w / 6.5, lineWidth: w / 45};
  var lIA = {x: w / 3.7 + makeCoord(false, 4, true), y: h / 1.6 + makeCoord(true, 4, true), radius: w / 6.5, lineWidth: w / 55};
  var twitterA = {x: w / 1.3 + makeCoord(true, 5, true), y: h / 1.55 + makeCoord(false, 5, true), radius: w / 9, lineWidth: w / 55};

  //Draw Art
  var vals = drawCircle(context, dylanA.lineWidth, dylanA.x, dylanA.y, dylanA.radius, 2, dylanPic);
  //drawLine(context, vals.x + vals.radius / 1.3, vals.y - vals.radius / 1.6, jukeA.x - jukeA.radius / 1.3, jukeA.y + jukeA.radius / 1.6);
  var vals = drawCircle(context, jukeA.lineWidth, jukeA.x, jukeA.y, jukeA.radius, 1.5, jukePic);
  drawLink("jukeLink", "https://jukeboxdapp.com", vals.x, vals.y, vals.radius);
  //drawLine(context, vals.x + vals.radius / 1.7, vals.y + vals.radius / 1.4, githubA.x - githubA.radius / 1.5, githubA.y - githubA.radius / 1.5);
  var vals = drawCircle(context, githubA.lineWidth, githubA.x, githubA.y, githubA.radius, 1.5, githubPic);
  drawLink("githubLink", "https://github.com/dylanireland", vals.x, vals.y, vals.radius);
  //drawLine(context, vals.x + vals.radius / 1.4, vals.y - vals.radius + vals.radius / 5, lIA.x - lIA.radius / 1.7, lIA.y + lIA.radius / 1.5);
  var vals = drawCircle(context, lIA.lineWidth, lIA.x, lIA.y, lIA.radius, 1.1, lIPic);
  drawLink("lILink", "https://www.linkedin.com/in/dylanireland/", vals.x, vals.y, vals.radius);
  //drawLine(context, vals.x + vals.radius / 1.6, vals.y + vals.radius / 1.5, tBA.x - tBA.radius / 1.3, tBA.y - tBA.radius / 2);
  var vals = drawCircle(context, tBA.lineWidth, tBA.x, tBA.y, tBA.radius, 1.5, tBPic);
  drawLink("tBLink", "https://new.thompsonbarney.com/", vals.x, vals.y, vals.radius);
  //drawLine(context, vals.x + vals.radius / 1.2, vals.y - vals.radius / 1.7, twitterA.x - twitterA.radius / 1.2, twitterA.y + twitterA.radius / 1.5);
  var vals = drawCircle(context, twitterA.lineWidth, twitterA.x, twitterA.y, twitterA.radius, 1.2, twitterPic);
  drawLink("twitterLink", "https://twitter.com/DylanIrel", vals.x, vals.y, vals.radius);

  frame += 1;
  if (frame == totalFrames) {
    frame = 0;
  }
}

var initWidth = $('#home-view').width();
var initHeight = $('#home-view').height();
var initDocWidth = $(document).width();
var initDocHeight = $(document).height();


function animate() {
  requestAnimationFrame(animate);
  shouldDraw4Desktop() ? draw(): drawMobile(initWidth, initHeight);
}

drawBackground(initDocWidth, initDocHeight);
animate();


function resize() {
  var h = $('#home-view').height();
  var w = $('#home-view').width();
  var canvas = document.querySelector('#network');
  canvas.width = w;
  canvas.height = h;
  shouldDraw4Desktop() ? draw(): drawMobile(w, h);
  drawBackground($(document).width(), $(document).height())
  //shouldDraw4Desktop() ? drawBackground(screen: ($(document).height(), $(document).width());
}

window.onresize = resize;
