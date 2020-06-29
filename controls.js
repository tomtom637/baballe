let mouseX;
let mouseY;

// pc
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);
window.addEventListener('mousemove', handleMouseMove);

// touchscreen
window.addEventListener('touchstart', handleMouseDown);
window.addEventListener('touchend', handleMouseUp);
window.addEventListener('touchmove', handleMouseMove);

// controls handlers
function handleMouseDown(e) {
  if (e.clientX === undefined) {
    mouseX = e.changedTouches[0].clientX - canvas.offsetLeft;
    mouseY = e.changedTouches[0].clientY - canvas.offsetTop;
  } else {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  }
  if (
    mouseX >= spaceship.posX &&
    mouseX <= spaceship.posX + spaceship.width &&
    mouseY >= spaceship.posY &&
    mouseY <= spaceship.posY + spaceship.height
  ) {
    spaceship.caught = true;
    spaceship.xSpeed = 0;
    spaceship.ySpeed = 0;
  }
}

function handleMouseUp(e) {
  if (e.clientX === undefined) {
    mouseX = e.changedTouches[0].clientX - canvas.offsetLeft;
    mouseY = e.changedTouches[0].clientY - canvas.offsetTop;
  } else {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  }
  // on caught
  if (
    spaceship.caught &&
    mouseX >= spaceship.posX &&
    mouseX <= spaceship.posX + spaceship.width &&
    mouseY >= spaceship.posY &&
    mouseY <= spaceship.posY + spaceship.height
  ) {
    spaceship.caught = false;
    spaceship.thrown = true;
    // on thrown
    if (spaceship.thrown) {
      spaceship.xSpeed =
        spaceship.lastMoves[0].posX -
        spaceship.lastMoves[spaceship.lastMoves.length - 1].posX;
      spaceship.ySpeed =
        spaceship.lastMoves[0].posY -
        spaceship.lastMoves[spaceship.lastMoves.length - 1].posY;
      if (spaceship.posX < 0) {
        spaceship.posX = 0;
      }
      if (spaceship.posX + spaceship.width > canvas.width) {
        spaceship.posX = canvas.width - spaceship.width;
      }
      if (spaceship.posY < 0) {
        spaceship.posY = 0;
      }
      if (spaceship.posY + spaceship.height > canvas.height) {
        spaceship.posY = canvas.height - spaceship.height;
      }
      spaceship.thrown = false;
    }
  }
}

function handleMouseMove(e) {
  if (e.clientX === undefined) {
    mouseX = e.touches[0].clientX - canvas.offsetLeft;
    mouseY = e.touches[0].clientY - canvas.offsetTop;
  } else {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
  }
  if (spaceship.caught) {
    spaceship.posX = mouseX - spaceship.width / 2;
    spaceship.posY = mouseY - spaceship.height / 2;
  }
}
