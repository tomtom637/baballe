const canvas = document.getElementById('canvas');
const canvasContainer = document.querySelector('.canvas-container');
const context = canvas.getContext('2d');

let ship = new Image();
ship.src = 'ship.png';

let background = new Image();
background.src = 'background.jpg';

let asteroidImg = new Image();
asteroidImg.src = 'asteroid.png';

canvas.width = 350;
canvas.height = 350;

let spaceship = new Spaceship({
  posX: 60,
  posY: 60,
  width: 65,
  height: 50,
});

let asteroid = new Asteroid({
  posX: 200,
  posY: 200,
  radius: 12,
});

function loop() {
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  spaceship.update();
  asteroid.update();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
