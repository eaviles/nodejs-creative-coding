const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [800, 800],
  animate: true,
  timeScale: 2,
  duration: 15,
  fps: 60
};

const sketch = () => {
  const trail = [];

  return {
    begin() {
      trail.splice(0, trail.length);
    },
    render({ context, width, height, time }) {
      context.fillStyle = 'black';
      context.fillRect(0, 0, width, height);

      const xOrg = 400;
      const yOrg = 400;
      const radius = 300;
      const angle = time;
      const x = xOrg + radius * Math.cos(angle * 3);
      const y = yOrg + radius * Math.sin(angle * 3.7);
      trail.push({ x, y });

      context.fillStyle = 'white';
      context.strokeStyle = 'white';

      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2);
      context.fill();

      if (trail.length > 750) {
        trail.splice(0, 1);
      }

      context.beginPath();
      context.moveTo(trail[0].x, trail[0].y);
      for (let i = 1; i < trail.length; i++) {
        context.lineTo(trail[i].x, trail[i].y);
      }
      context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
