// Confetti animation with canvas
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confetti = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height - canvas.height,
  r: Math.random() * 6 + 4,
  d: Math.random() * 50 + 10,
  color: `hsl(${Math.random() * 360}, 100%, 70%)`,
  tilt: Math.random() * 10 - 10,
  tiltAngle: 0,
  tiltAngleIncrement: Math.random() * 0.07 + 0.05,
}));

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  confetti.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
    ctx.stroke();
  });
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confetti.forEach(c => {
    c.y += Math.cos(c.d / 10) + 1 + c.r / 2;
    c.x += Math.sin(c.d / 10);
    c.tiltAngle += c.tiltAngleIncrement;
    c.tilt = Math.sin(c.tiltAngle) * 15;

    if (c.y > canvas.height) {
      c.y = -10;
      c.x = Math.random() * canvas.width;
    }
  });
}

drawConfetti();
