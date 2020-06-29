class Asteroid {
  constructor({ posX, posY, radius }) {
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.xSpeed = 0;
    this.ySpeed = 0;
    this.rotated = 0;
    this.rotationSpeed = 0;
    this.collision = false;
  }
  draw() {
    context.save();
    context.translate(this.posX + this.radius, this.posY + this.radius);
    context.rotate(this.rotated);
    context.drawImage(
      asteroidImg,
      -this.radius,
      -this.radius,
      this.radius * 2,
      this.radius * 2
    );
    context.restore();
  }
  update() {
    this.draw();
    this.rotated += this.rotationSpeed;
    this.posX += this.xSpeed;
    this.posY += this.ySpeed;

    if (this.posX + this.radius * 2 >= canvas.width) {
      if (this.xSpeed > 0) this.xSpeed = -this.xSpeed;
      this.xSpeed -= this.xSpeed * 0.1;
      this.ySpeed -= this.ySpeed * 0.1;
      this.rotationSpeed -= this.rotationSpeed * 0.3;
      if (this.ySpeed > 0) {
        this.rotationSpeed -= (Math.PI / 700) * this.ySpeed;
      } else {
        this.rotationSpeed += -((Math.PI / 700) * this.ySpeed);
      }
    }
    if (this.posX <= 0) {
      if (this.xSpeed < 0) this.xSpeed = -this.xSpeed;
      this.xSpeed -= this.xSpeed * 0.1;
      this.ySpeed -= this.ySpeed * 0.1;
      this.rotationSpeed -= this.rotationSpeed * 0.3;
      if (this.ySpeed > 0) {
        this.rotationSpeed += (Math.PI / 700) * this.ySpeed;
      } else {
        this.rotationSpeed -= -((Math.PI / 700) * this.ySpeed);
      }
    }
    if (this.posY + this.radius * 2 >= canvas.height) {
      if (this.ySpeed > 0) this.ySpeed = -this.ySpeed;
      this.xSpeed -= this.xSpeed * 0.1;
      this.ySpeed -= this.ySpeed * 0.1;
      this.rotationSpeed -= this.rotationSpeed * 0.3;
      if (this.xSpeed > 0) {
        this.rotationSpeed += (Math.PI / 700) * this.xSpeed;
      } else {
        this.rotationSpeed -= -((Math.PI / 700) * this.xSpeed);
      }
    }
    if (this.posY <= 0) {
      if (this.ySpeed < 0) this.ySpeed = -this.ySpeed;
      this.xSpeed -= this.xSpeed * 0.1;
      this.ySpeed -= this.ySpeed * 0.1;
      this.rotationSpeed -= this.rotationSpeed * 0.3;
      if (this.xSpeed > 0) {
        this.rotationSpeed -= (Math.PI / 700) * this.xSpeed;
      } else {
        this.rotationSpeed += -((Math.PI / 700) * this.xSpeed);
      }
    }
    // collision detection
    const spaceshipCenterX = spaceship.posX + spaceship.width / 2;
    const spaceshipCenterY = spaceship.posY + spaceship.height / 2;
    const centerX = this.posX + this.radius;
    const centerY = this.posY + this.radius;
    let posXCrossing = false;
    let posYCrossing = false;
    if (
      (spaceshipCenterX < centerX &&
        centerX - spaceshipCenterX < spaceship.width / 2) ||
      (spaceshipCenterX > centerX &&
        spaceshipCenterX - centerX < spaceship.width / 2)
    ) {
      posXCrossing = true;
    } else {
      posXCrossing = false;
    }
    if (
      (spaceshipCenterY < centerY &&
        centerY - spaceshipCenterY < spaceship.height / 2) ||
      (spaceshipCenterY > centerY &&
        spaceshipCenterY - centerY < spaceship.height / 2)
    ) {
      posYCrossing = true;
    } else {
      posYCrossing = false;
    }
    if (posXCrossing && posYCrossing) {
      this.collision = true;
    } else {
      this.collision = false;
    }
    // collision logic
    if (this.collision) {
      if (
        (spaceship.xSpeed > 0 && centerX < spaceshipCenterX) ||
        (spaceship.xSpeed < 0 && centerX > spaceshipCenterX)
      ) {
        this.xSpeed *= 0.9;
        this.xSpeed -= spaceship.xSpeed * 0.7;
        spaceship.xSpeed *= 0.9;
        spaceship.xSpeed += this.xSpeed * 0.3;
      }
      if (
        (spaceship.xSpeed > 0 && centerX > spaceshipCenterX) ||
        (spaceship.xSpeed < 0 && centerX < spaceshipCenterX)
      ) {
        this.xSpeed *= 0.9;
        this.xSpeed += spaceship.xSpeed * 0.7;
        spaceship.xSpeed *= 0.9;
        spaceship.xSpeed -= this.xSpeed * 0.3;
      }
      if (
        (spaceship.ySpeed > 0 && centerY < spaceshipCenterY) ||
        (spaceship.ySpeed < 0 && centerY > spaceshipCenterY)
      ) {
        this.ySpeed *= 0.9;
        this.ySpeed -= spaceship.ySpeed * 0.7;
        spaceship.ySpeed *= 0.9;
        spaceship.ySpeed += this.ySpeed * 0.3;
      }
      if (
        (spaceship.ySpeed > 0 && centerY > spaceshipCenterY) ||
        (spaceship.ySpeed < 0 && centerY < spaceshipCenterY)
      ) {
        this.ySpeed *= 0.9;
        this.ySpeed += spaceship.ySpeed * 0.7;
        spaceship.ySpeed *= 0.9;
        spaceship.ySpeed -= this.ySpeed * 0.3;
      }
    }
    /*
    if (this.collision) {
      if (spaceship.xSpeed > spaceship.ySpeed) {
        this.xSpeed = spaceship.xSpeed;
        this.ySpeed += spaceship.ySpeed;
      } else if (spaceship.ySpeed > spaceship.xSpeed) {
        this.ySpeed = spaceship.ySpeed;
        this.xSpeed += spaceship.xSpeed;
      } else {
        this.xSpeed = spaceship.xSpeed;
        this.ySpeed = spaceship.ySpeed;
      }
    }
    */
  }
}
