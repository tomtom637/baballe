class Blackhole {
  constructor({ posX, posY, radius }) {
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.rotated = 0;
    this.rotationSpeed = -(Math.PI / 700) * 10;
    this.collision = false;
  }
  draw() {
    context.save();
    context.translate(this.posX + this.radius, this.posY + this.radius);
    context.rotate(this.rotated);
    context.drawImage(
      blackholeImg,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    context.restore();
    this.posX = canvas.width / 2 - this.radius;
    this.posY = canvas.height / 2 - this.radius;
  }
  update() {
    this.draw();
    this.rotated += this.rotationSpeed;

    // collision detection
    const spaceshipCenterX = spaceship.posX + spaceship.width / 2;
    const spaceshipCenterY = spaceship.posY + spaceship.height / 2;
    const centerX = this.posX + this.radius;
    const centerY = this.posY + this.radius;
    let a;
    let b;

    if (spaceshipCenterX > centerX) {
      a = spaceshipCenterX - centerX;
    } else {
      a = centerX - spaceshipCenterX;
    }
    if (spaceshipCenterY > centerY) {
      b = spaceshipCenterY - centerY;
    } else {
      b = centerY - spaceshipCenterY;
    }

    if (Math.sqrt(a ** 2 + b ** 2) <= spaceship.width / 2) {
      this.collision = true;
    } else {
      this.collision = false;
    }

    // collision logic
    // if (this.collision)
  }
}
