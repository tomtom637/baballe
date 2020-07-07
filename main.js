const canvas = document.getElementById('canvas');
const canvasContainer = document.querySelector('.canvas-container');
const context = canvas.getContext('2d');

const ship = new Image();
ship.src = 'ship.png';

const background = new Image();
background.src = 'background.jpg';

const asteroidImg = new Image();
asteroidImg.src = 'asteroid.png';

const blastImg = new Image();
blastImg.src = 'blast.png';

const blackholeImg = new Image();
blackholeImg.src = 'blackhole.png';

const blastAnimation = [
  0,
  0,
  0,
  50,
  50,
  50,
  50,
  100,
  100,
  100,
  100,
  100,
  150,
  150,
  150,
  150,
];
let blastAnimCounter = 0;

canvas.width = 350;
canvas.height = 350;

let spaceship = new Spaceship({
  posX: 60,
  posY: 60,
  width: 30,
  height: 27,
});

let asteroid = new Asteroid({
  posX: 200,
  posY: 200,
  radius: 7,
});

let blackhole = new Blackhole({
  posX: canvas.width / 2,
  posY: canvas.width / 2,
  radius: 60,
});

function loop() {
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  spaceship.update();
  asteroid.update();
  blackhole.update();

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
