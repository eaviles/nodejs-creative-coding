const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes');
const random = require('canvas-sketch-util/random');

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
      if (Math.abs(random.gaussian()) > 1.0) {
        points.push({
          position: [x, y],
          radius: Math.abs(random.noise2D(x, y, 0.0025, step / 2)),
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
