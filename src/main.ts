import Konva from 'konva';

// first we need to create a stage
const stage = new Konva.Stage({
  container: 'container',
  width: window.innerWidth,
  height: window.innerHeight
});

// then create layer
const layer = new Konva.Layer();

// create our shape
const lemon = new Konva.Ellipse({
  x: stage.width()/2,
  y: stage.height()/2,
  radiusX: 100,
  radiusY: 47,
  fill: 'yellow',
  stroke: 'black',
  strokeWidth: 4,
  draggable : true,
});

lemon.on('mouseover', function (e) {
  e.target.getStage().container().style.cursor = 'pointer';
});

lemon.on('mouseout', function (e) {
  e.target.getStage().container().style.cursor = 'default';
});

const angularSpeed = 90;
let direction = 0;

const wiggle = new Konva.Animation(function(frame) {
    const angleDiff = (frame.timeDiff * angularSpeed) / 1500;
    const funky = Math.sin(frame.time * 2 * Math.PI / 250);
    if (funky > 0) {
        direction = 1;
    } else {
        direction = -1;
    }

    lemon.rotate(direction * angleDiff);
}, layer);

lemon.on('mousedown', function(e) {
    lemon.to({
    scaleX: 2,
    scaleY: 2,
    duration: 0.3,
    easing: Konva.Easings.EaseInOut,
  });
  wiggle.start();
});

lemon.on('mouseup', function(e) {
    wiggle.stop();
    lemon.to({
    scaleX: 1,
    scaleY: 1,
    duration: 0.3,
    easing: Konva.Easings.EaseInOut,
  });
});

// add the shape to the layer
layer.add(lemon);

// add the layer to the stage
stage.add(layer);

