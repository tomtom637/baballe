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

const blastAnimation = [0, 0, 50, 50, 100, 100, 100, 150, 150, 150, 150];
let blastAnimCounter = 0;

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

function renderBlastAnimation() {
  if (blastAnimCounter <= 10) {
    context.drawImage(
      blastImg,
      blastAnimation[blastAnimCounter],
      0,
      50,
      60,
      spaceship.posX,
      spaceship.posY,
      60,
      60
    );
    blastAnimCounter++;
  }
}

function loop() {
  context.drawImage(background, 0, 0, canvas.width, canvas.height);
  spaceship.update();
  asteroid.update();
  //if (asteroid.collision && blastAnimCounter === 11) {
  //blastAnimCounter = 0;
  //}
  //renderBlastAnimation();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
