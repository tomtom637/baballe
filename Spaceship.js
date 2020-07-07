class Spaceship {
  constructor({ posX, posY, width, height }) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.xSpeed = 2;
    this.ySpeed = -3;
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
    // blackhole attraction
    if (!this.caught) {
      if (this.posX + this.width / 2 > blackhole.posX + blackhole.radius) {
        this.xSpeed -=
          (this.posX + this.width / 2 - (blackhole.posX + blackhole.radius)) /
          1000; // 0.02
      }
      if (this.posX + this.width / 2 < blackhole.posX + blackhole.radius) {
        this.xSpeed +=
          (blackhole.posX + blackhole.radius - (this.posX + this.width / 2)) /
          1000; // 0.02
      }
      if (this.posY + this.height / 2 > blackhole.posY + blackhole.radius) {
        this.ySpeed -=
          (this.posY + this.height / 2 - (blackhole.posY + blackhole.radius)) /
          1000; // 0.02
      }
      if (this.posY + this.height / 2 < blackhole.posY + blackhole.radius) {
        this.ySpeed +=
          (blackhole.posY + blackhole.radius - (this.posY + this.height / 2)) /
          1000; // 0.02
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
