import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

export class PongComponent extends React.Component<any, any> {
  // Variables for the ball
  diameter: number = 20;

  // Variables for the paddle
  paddleWidth = 16;
  paddleHeight = 150;
  borderOffset = 1;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  paddleStep = this.windowHeight / 8;
  xPaddleLeft = 50;
  yPaddleLeft = 50;
  xPaddleRight = 50;
  yPaddleRight = 50;
  cpuSpeed = 7;
  // fix start ball position
  xBall = Math.floor(Math.random() * 300) + 150;
  yBall = 50;
  xBallChange = 10;
  yBallChange = 10;
  scoreLeft = 0;
  scoreRight = 0;
  started = false;
  diff = 0;

  setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(this.windowWidth, this.windowHeight, "p2d").parent(canvasParentRef);
  };

  draw = (p5: p5Types) => {
    p5.background(0,0,0);
    
    // Ball bounces off walls
    this.xBall += this.xBallChange;
    this.yBall += this.yBallChange;
    
    // Detect collision with paddle left
    if (
      this.xBall <= 0 + this.xPaddleLeft + this.paddleWidth + this.borderOffset + (this.diameter / 2)&&
      this.yBall < this.yPaddleLeft + this.paddleHeight &&
      this.yBall >= this.yPaddleLeft
    ) {
      if (
        this.yBall > this.yPaddleLeft &&
        this.yBall < (this.yPaddleLeft + (0.5 * this.paddleHeight))
      ) {
        this.yBallChange *= this.yBallChange < 0 ? -1 : 1;
      }
      if (
        this.yBall < this.yPaddleLeft &&
        this.yBall > (this.yPaddleLeft + (0.5 * this.paddleHeight))
      ) {
        this.yBallChange *= this.yBallChange > 0 ? -1 : 1;
      }
      else {
        this.xBallChange *= -1;
        this.yBallChange *= -1;
      }
    }
    // points only if behind left wall
    else if (this.xBall < this.diameter / 2) {
      this.xBallChange *= -1;
      this.scoreRight++;
    }

    // Detect collision with paddle right
    // if hit with upper half of paddle, redirect up, if lower half, redirect down
    if (
      this.xBall >= this.windowWidth - this.borderOffset - this.paddleWidth - (this.diameter / 2) &&
      this.yBall <= this.yPaddleRight + this.paddleHeight &&
      this.yBall >= this.yPaddleRight
    ) {
      if (
        this.yBall > this.yPaddleRight &&
        this.yBall < (this.yPaddleRight + (0.5 * this.paddleHeight))
      ) {
        this.yBallChange *= this.yBallChange < 0 ? -1 : 1;
      }
      if (
        this.yBall < this.yPaddleRight &&
        this.yBall > (this.yPaddleRight + (0.5 * this.paddleHeight))
      ) {
        this.yBallChange *= this.yBallChange > 0 ? -1 : 1;
      }
      else {
        this.xBallChange *= -1;
        this.yBallChange *= -1;
      }
    }
    // points if behind right wall
    else if (this.xBall + this.diameter / 2 > this.windowWidth) {
      this.xBallChange *= -1;
      this.scoreLeft++;
    }

    // bounce from top and bottom
    if (this.yBall < this.diameter / 2 || this.yBall > this.windowHeight - this.diameter) {
        this.yBallChange *= -1;
    }

    // Draw ball
    p5.fill(255, 255, 255);
    p5.ellipse(this.xBall, this.yBall, this.diameter, this.diameter);

    // Update paddle location
    if (!this.started) {
      this.xPaddleLeft = this.borderOffset;
      this.yPaddleLeft = this.windowHeight / 2;
      this.xPaddleRight = this.windowWidth - (this.paddleWidth + this.borderOffset);
      this.yPaddleRight = this.windowHeight / 2;
      this.started = true;
    }

    // Draw paddle left
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(this.xPaddleLeft, this.yPaddleLeft, this.paddleWidth, this.paddleHeight);

    // Draw paddle right
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(this.xPaddleRight, this.yPaddleRight, this.paddleWidth, this.paddleHeight);
 
    // Draw middle line
    p5.fill(56, 56, 56);
    p5.noStroke();
    p5.rect((this.windowWidth - this.paddleWidth) / 2, 0, this.paddleWidth / 2 , this.windowHeight);    
    
    // Draw scores
    p5.textFont("Visitor", 36);
    p5.fill(255, 255, 255);
    p5.textSize(70);
    // left
    p5.text(this.scoreLeft < 10 ? "0" + this.scoreLeft : this.scoreLeft, this.windowWidth * (1/4), 50);
    // right
    p5.text(this.scoreRight < 10 ? "0" + this.scoreRight : this.scoreRight, this.windowWidth * (3/4), 50);
    // game title
    p5.textSize(50);
    p5.text("IvoPong", (this.windowWidth - this.paddleWidth) / 2 - 90 , this.windowHeight - 30);
    // this.diff = this.yBall - this.yPaddleLeft;
    // this.cpuMove();
  };

  // CPU move right paddle    
  // cpuMove = () => {
  //     if (this.diff > this.cpuSpeed * 100)
  //     {
  //       this.yPaddleLeft += this.cpuSpeed;
  //     }
  //     if (this.diff < this.cpuSpeed * 100)
  //     {
  //       this.yPaddleLeft -= this.cpuSpeed;
  //     }
  //     if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
  //     if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
  //     // console.log(this.diff);
  // }

  keyPressed = (e: any) => {
    if (e.keyCode === 38 || e.keyCode === 37) {
        // up & left arrows
        this.yPaddleRight -= this.paddleStep;
        this.yPaddleLeft -= this.paddleStep;
        if (this.yPaddleRight <= 0) this.yPaddleRight = 0;
        if (this.yPaddleRight + this.paddleHeight >= this.windowHeight ) this.yPaddleRight = this.windowHeight - this.paddleHeight;
        if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
        if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
    }
    else if (e.keyCode === 40 || e.keyCode === 39) {
        // down & right arrows
        this.yPaddleRight += this.paddleStep;
        this.yPaddleLeft += this.paddleStep;
        if (this.yPaddleRight <= 0) this.yPaddleRight = 0;
        if (this.yPaddleRight + this.paddleHeight >= this.windowHeight ) this.yPaddleRight = this.windowHeight - this.paddleHeight;
        if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
        if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
    }
  }
  // has touch events, maybe for mobile to use
  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed}/>
    );
  };
};
