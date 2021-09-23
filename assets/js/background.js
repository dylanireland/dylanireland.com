export function drawBackground(w, h) {
  var canvas = document.querySelector('#background');
  canvas.width = w;
  canvas.height = h;
  var context = canvas.getContext('2d');
  context.clearRect(0, 0, w, h);

  var colors = ["#00FECA", "#FDF200", "#FF85EA", "#7B61F8", "#FF8B8B", "#F85125", "#00C2BA"];
  //var colors = ["#FFD700", "#F7E98E", "#FF3800", "#B2FFFF"];

  for (var i = 0; i < 20; i++) {
    var starWidth = Math.random() * 50;
    var colorIndex = Math.round(Math.random() * colors.length);
    context.shadowBlur = starWidth / 5;
    context.shadowColor = colors[colorIndex];
    context.beginPath();
    context.arc(Math.random() * w, Math.random() * h, Math.random() * 10, 0, Math.PI * 2, false);
    context.closePath();
    context.fillStyle = colors[colorIndex];
    context.fill();


    var starX = Math.random() * w;
    var starY = Math.random() * h;
    var tallStarOffset = Math.random() * starWidth / 4 + starWidth / 20;
    var weightOffset = 0; //beta

    context.moveTo(starX, starY);
    context.quadraticCurveTo(starX + starWidth / 2 + weightOffset, starY, starX + starWidth / 2, starY - starWidth / 2 - tallStarOffset);
    context.quadraticCurveTo(starX + starWidth / 2, starY + weightOffset, starX + starWidth, starY);
    context.quadraticCurveTo(starX + starWidth / 2 - weightOffset, starY, starX + starWidth / 2, starY + starWidth / 2 + tallStarOffset);
    context.quadraticCurveTo(starX + starWidth / 2, starY - weightOffset, starX, starY);
    context.fillStyle = colors[colorIndex];
    context.closePath();
    context.fill();
  }

}
