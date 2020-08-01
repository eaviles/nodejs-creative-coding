const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [500, 500]
};

const sketch = ({ canvas, render }) => {
  let mouseX = 250;
  let mouseY = 250;

  canvas.addEventListener('mousemove', event => {
    mouseX = event.layerX;
    mouseY = event.layerY;
    render();
  });

  return ({ context: ctx, width, height }) => {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = 'white';
    for (let i = 0; i < 500; i++) {
      const freq = math.mapRange(mouseY, 0, 500, 0.0, 0.5, true);
      const y = 250 + random.noise1D(i + mouseX, freq, 100);
      ctx.beginPath();
      ctx.arc(i, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };
};

canvasSketch(sketch, settings);
