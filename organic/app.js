const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes');
const random = require('canvas-sketch-util/random');
const math = require('canvas-sketch-util/math');

random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [800, 800]
};

const sketch = () => {
  const points = [];
  const palette = random.shuffle(random.pick(palettes));

  const step = 10;
  for (let x = step; x < 800; x += step) {
    for (let y = step; y < 800; y += step) {
      if (Math.abs(random.gaussian()) > 0.2) {
        const nx = math.mapRange(x, 0, 800, 0, 1);
        const ny = math.mapRange(y, 0, 800, 0, 1);
        points.push({
          position: [x, y],
          radius: Math.abs(random.noise2D(nx, ny, 0.75, step / 2)),
          color: random.rangeFloor(1, palette.length - 1)
        });
      }
    }
  }

  return ({ context, width, height }) => {
    context.fillStyle = palette[0];
    context.fillRect(0, 0, width, height);

    points.forEach(({ color, position, radius }) => {
      const [x, y] = position;
      context.fillStyle = palette[color];
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);
