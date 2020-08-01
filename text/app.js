const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
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
  for (let x = 0; x < 800; x += step) {
    for (let y = 0; y < 800; y += step) {
      if (Math.random() > 0.5) {
        const nx = math.mapRange(x, 0, 800, 0, 1);
        const ny = math.mapRange(y, 0, 800, 0, 1);
        points.push({
          position: [x, y],
          radius: Math.abs(random.noise2D(nx, ny, 0.1, 30)) + 5,
          color: random.rangeFloor(1, palette.length - 1),
          rotation: random.noise2D(nx, ny)
        });
      }
    }
  }

  return ({ context, width, height }) => {
    context.fillStyle = palette[0];
    context.fillRect(0, 0, width, height);

    points.forEach(({ color, position, radius, rotation }) => {
      const [x, y] = position;
      context.fillStyle = palette[color];
      context.save();
      context.font = `${Math.round(radius)}px Menlo`;
      context.rotate(rotation);
      context.fillText('#sfpc', x, y);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
