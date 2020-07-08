class Spaceship {
  constructor({ posX, posY, width, height }) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.xSpeed = 2;
    this.ySpeed = -2;
    this.rotated = 0;
    this.rotationSpeed = 0;
    this.caught = false;
    this.thrown = false;
    this.lastMoves = [];
  }
  draw() {
    context.save();
    context.translate(this.posX + this.width / 2, this.posY + this.height / 2);
    context.rotate(this.rotated);
    context.drawImage(
      ship,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    context.restore();
  }
  update() {
    this.draw();
    this.rotated += this.rotationSpeed;
    this.posX += this.xSpeed;
    this.posY += this.ySpeed;

    /*
    if (this.posX + this.width >= canvas.width) {
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
    if (this.posY + this.height >= canvas.height) {
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
    */
    // calculating distance to blackhole
    const blackholeCenterX = blackhole.posX + blackhole.radius;
    const blackholeCenterY = blackhole.posY + blackhole.radius;
    const centerX = this.posX + this.width / 2;
    const centerY = this.posY + this.height / 2;
    let a;
    let b;

    if (blackholeCenterX > centerX) {
      a = blackholeCenterX - centerX;
    } else {
      a = centerX - blackholeCenterX;
    }
    if (blackholeCenterY > centerY) {
      b = blackholeCenterY - centerY;
    } else {
      b = centerY - blackholeCenterY;
    }
    const distanceToBlackhole = Math.sqrt(a ** 2 + b ** 2);
    // blackhole attraction
    if (!this.caught) {
      if (centerX > blackholeCenterX) {
        this.xSpeed -=
          ((centerX - blackholeCenterX) * 20) / distanceToBlackhole ** 2;
      }
      if (centerX < blackholeCenterX) {
        this.xSpeed +=
          ((blackholeCenterX - centerX) * 20) / distanceToBlackhole ** 2;
      }
      if (centerY > blackholeCenterY) {
        this.ySpeed -=
          ((centerY - blackholeCenterY) * 20) / distanceToBlackhole ** 2;
      }
      if (centerY < blackholeCenterY) {
        this.ySpeed +=
          ((blackholeCenterY - centerY) * 20) / distanceToBlackhole ** 2;
      }
    }
    this.lastMoves = [
      {
        posX: this.posX,
        posY: this.posY,
      },
      ...this.lastMoves,
    ];
    if (this.lastMoves.length > 3) {
      this.lastMoves.pop();
    }
  }
}
