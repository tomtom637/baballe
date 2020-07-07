class Asteroid {
  constructor({ posX, posY, radius }) {
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
    this.xSpeed = -2;
    this.ySpeed = 2;
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
    if (!spaceship.caught) {
      if (this.collision) {
        if (
          (spaceship.xSpeed >= 0 && centerX < spaceshipCenterX) ||
          (spaceship.xSpeed < 0 && centerX > spaceshipCenterX)
        ) {
          this.xSpeed *= 0.9;
          this.xSpeed -= spaceship.xSpeed * 0.7;
          spaceship.xSpeed *= 0.9;
          spaceship.xSpeed += this.xSpeed * 0.3;
        }
        if (
          (spaceship.xSpeed >= 0 && centerX > spaceshipCenterX) ||
          (spaceship.xSpeed < 0 && centerX < spaceshipCenterX)
        ) {
          this.xSpeed *= 0.9;
          this.xSpeed += spaceship.xSpeed * 0.7;
          spaceship.xSpeed *= 0.9;
          spaceship.xSpeed -= this.xSpeed * 0.3;
        }
        if (
          (spaceship.ySpeed >= 0 && centerY < spaceshipCenterY) ||
          (spaceship.ySpeed < 0 && centerY > spaceshipCenterY)
        ) {
          this.ySpeed *= 0.9;
          this.ySpeed -= spaceship.ySpeed * 0.7;
          spaceship.ySpeed *= 0.9;
          spaceship.ySpeed += this.ySpeed * 0.3;
        }
        if (
          (spaceship.ySpeed >= 0 && centerY > spaceshipCenterY) ||
          (spaceship.ySpeed < 0 && centerY < spaceshipCenterY)
        ) {
          this.ySpeed *= 0.9;
          this.ySpeed += spaceship.ySpeed * 0.7;
          spaceship.ySpeed *= 0.9;
          spaceship.ySpeed -= this.ySpeed * 0.3;
        }
      }
    }
    // blackhole attraction
    if (this.posX + this.radius > blackhole.posX + blackhole.radius) {
      this.xSpeed -=
        (this.posX + this.radius - (blackhole.posX + blackhole.radius)) / 1000; // 0.02
    }
    if (this.posX + this.radius < blackhole.posX + blackhole.radius) {
      this.xSpeed +=
        (blackhole.posX + blackhole.radius - (this.posX + this.radius)) / 1000; // 0.02
    }
    if (this.posY + this.radius > blackhole.posY + blackhole.radius) {
      this.ySpeed -=
        (this.posY + this.radius - (blackhole.posY + blackhole.radius)) / 1000; // 0.02
    }
    if (this.posY + this.radius < blackhole.posY + blackhole.radius) {
      this.ySpeed +=
        (blackhole.posY + blackhole.radius - (this.posY + this.radius)) / 1000; // 0.02
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
