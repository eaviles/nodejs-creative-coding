'use strict';

const canvasSketch = require('canvas-sketch');
const palettes = require('nice-color-palettes');
const random = require('canvas-sketch-util/random');
const { blend, relativeLuminance } = require('canvas-sketch-util/color');
const { lerp } = require('canvas-sketch-util/math');

const config = {
  gridSize: 16,
  intensity: 0.8,
  length: 0.04,
  margin: 0.1,
  thickness: 0.01
};

const settings = {
  animate: true,
  dimensions: [512, 512],
  duration: 60,
  timeScale: 0.5
};

function sketch() {
  const { margin } = config;

  const palette = random.pick(palettes);

  let minLum = 1;
  let bgColor;
  palette.forEach(i => {
    const lum = relativeLuminance(i);
    if (lum < minLum) {
      minLum = lum;
      bgColor = i;
    }
  });

  const extPalette = [];
  palette.forEach((color, index) => {
    if (index > 0) {
      const pastColor = extPalette[extPalette.length - 1];
      extPalette.push(blend(pastColor, color, 1 / 4).hex);
      extPalette.push(blend(pastColor, color, 2 / 4).hex);
      extPalette.push(blend(pastColor, color, 3 / 4).hex);
    }
    extPalette.push(color);
  });

  const colors = extPalette.filter(i => i !== bgColor);

  return props => {
    const { height, time, width } = props;
    const ctx = props.context;

    ctx.lineJoin = 'round';
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const total = 2 ** 12;
    function norm(x, y) {
      return [
        lerp(margin, width - margin, x),
        lerp(margin, height - margin, y)
      ];
    }

    const offset = 0;
    const tau = (1 + 5 ** 0.5) / 2; // golden ratio (~1.618033989)
    const inc = (2 - tau) * 2 * Math.PI + offset + time * 0.0001;
    let theta = 0;
    const k = 0.012;

    for (let i = 0; i < total; i += 1) {
      const r = k * i ** 0.5;
      theta += inc;

      const x = Math.cos(theta) * r + 0.5;
      const y = Math.sin(theta) * r + 0.5;

      const [cx, cy] = norm(x, y);

      const noise = random.noise3D(x, y, time, 1);
      const noise2 = random.noise3D(x, y, time, 1.2);
      const noise3 = random.noise3D(x, y, time + 10, 0.5);

      const nx = Math.round(lerp(0, width / 10, x));
      const ny = Math.round(lerp(0, height / 10, y));
      const odd = (nx + ny) % 2 === 0;

      const color = odd
        ? colors[Math.floor((noise * 0.5 + 0.5) * colors.length)]
        : colors[Math.floor((noise2 * 0.5 + 0.5) * colors.length)];

      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(cx, cy, Math.max(6 * noise3, 3), 0, Math.PI * 2, false);
      ctx.fill();
    }
  };
}

canvasSketch(sketch, settings);
