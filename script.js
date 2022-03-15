/**@type{HTMLCanvasElement} */

window.addEventListener("load", function () {
  const title = document.getElementById("text");
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.lineCap = "round";
  ctx.shadowColor = "rgba(0,0,0,0.7)";
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 10;
  // Effect settings
  let size =
    canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
  const maxLevel = 8;
  const branches = 1;
  let sides = 15;
  let scale = 0.85;
  let spread = -0.2;
  let color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
  let lineWidth = 30;

  //controls
  const randomizeBtn = document.getElementById("randomizeBtn");
  const resetBtn = this.document.getElementById("resetBtn");
  const spreadSlider = document.getElementById("spread");
  const spreadLabel = this.document.getElementById("spreadLabel");
  const sidesSlider = document.getElementById("sides");
  const sidesLabel = document.getElementById("sidesLabel");
  const lineSlider = document.getElementById("lineSlider");
  const lineLabel = document.getElementById("lineLabel");

  spreadSlider.addEventListener("change", function (e) {
    spread = e.target.value;
    updateSliders();
    drawFractal();
  });
  sidesSlider.addEventListener("change", function (e) {
    sides = e.target.value;
    updateSliders();
    drawFractal();
  });
  lineSlider.addEventListener("change", function (e) {
    lineWidth = e.target.value;
    updateSliders();
    drawFractal();
  });
  let pointX = 0;
  let pointY = size;

  function drawBranch(level) {
    if (level > maxLevel) {
      return;
    }
    ctx.beginPath();
    ctx.moveTo(pointX, pointY);
    ctx.bezierCurveTo(
      0,
      size * spread * -3,
      size * 5,
      size * 10 * spread,
      0,
      0
    );
    ctx.stroke();
    for (let i = 0; i < branches; i++) {
      ctx.save();
      ctx.translate(pointX, pointY);
      ctx.scale(scale, scale);

      ctx.save();
      ctx.rotate(spread);
      drawBranch(level + 1);
      ctx.restore();

      ctx.restore();
    }
    ctx.beginPath();
    ctx.arc(-size / 2, 0, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawFractal() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    for (let i = 0; i < sides; i++) {
      ctx.rotate((Math.PI * 6) / sides);
      drawBranch(0);
    }
    ctx.restore();
    randomizeBtn.style.backgroundColor = color;
  }
  drawFractal();

  function randomizeFractal() {
    sides = Math.floor(Math.random() * 10 + 2);
    scale = Math.random() * 0.4 + 0.4;
    spread = Math.random() * 0.6 - 0.3;
    color = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    lineWidth = Math.random() * 15 + 7;
    drawFractal();
    console.log(lineWidth);
  }
  randomizeBtn.addEventListener("click", function () {
    randomizeFractal();
    updateSliders();
    drawFractal();
  });

  function resetFractal() {
    sides = 15;
    scale = 0.85;
    spread = 0.1;
    color = "hsl(200, 100%, 50%)";
    lineWidth = 10;
  }
  resetBtn.addEventListener("click", function () {
    resetFractal();
    updateSliders();
    drawFractal();
  });
  function updateSliders() {
    spreadSlider.value = spread;
    spreadLabel.innerText = " spread: " + Number(spread).toFixed(1);
    sidesSlider.value = sides;
    sidesLabel.innerText = " side: " + sides;
    lineSlider.value = lineWidth;
    lineLabel.innerText = "lineWidth: " + Number(lineWidth).toFixed(1);
  }
  updateSliders();

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    size =
      canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
    ctx.shadowColor = "rgba(0,0,0,0.7)";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur = 10;
    drawFractal();
  });
});
