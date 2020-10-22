// Fix a serve ball stuck, maybe some = somewhere
// Check for a mobile touch side of things, worth doing a mobile support?
// Do 2 Player Mode
// Do CPU Mode
// Make Paddles Dimensions relative to screen with min-values
// do the you win/you lose screen after 10 points
// do the menu screen
import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";

export class PongComponent extends React.Component<any, any> {
  // Variables for the ball
  diameter: number = 20;

  // Variables for the paddle
  paddleWidth = 16;
  paddleHeight = 130;
  borderOffset = 5;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  paddleStep = this.windowHeight / 10;
  xPaddleLeft = this.borderOffset;
  yPaddleLeft = this.windowHeight / 2;
  xPaddleRight = this.windowWidth - this.borderOffset - this.paddleWidth;
  yPaddleRight = this.windowHeight / 2;
  
  leftServeXpos = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
  leftServeYpos = this.yPaddleLeft + (0.5 * this.paddleHeight);
  rightServeXpos = this.xPaddleRight - this.diameter/2;
  rightServeYpos = this.yPaddleRight + (0.5 * this.paddleHeight);
  yBall = this.leftServeYpos;
  xBall = this.leftServeXpos;
  xBallChange = 13;
  yBallChange = 13;
  scoreLeft = 0;
  scoreRight = 0;
  started = false;
  leftServe = true;
  rightServe = false;
  
  cpuMode = true;
  cpuSpeed = 8;
  diff = 0;


  setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(this.windowWidth, this.windowHeight, "p2d").parent(canvasParentRef);
  };

  draw = (p5: p5Types) => {
    p5.background(0,0,0);
    
    // Ball bounces off walls
    if (this.started) {
      this.xBall += this.xBallChange;
      this.yBall += this.yBallChange;
    }
    
    // Detect collision with paddle left
    // if hit with upper half of paddle, redirect up, if lower half, redirect down
    if (
      this.xBall <= 0 + this.xPaddleLeft + this.paddleWidth + this.borderOffset + (this.diameter / 2)&&
      this.yBall < this.yPaddleLeft + this.paddleHeight &&
      this.yBall >= this.yPaddleLeft
    ) {
      if (
        this.yBall >= this.yPaddleLeft &&
        this.yBall < (this.yPaddleLeft + (0.5 * this.paddleHeight))
      ) {
        this.yBallChange = Math.abs(this.yBallChange) * -1;
        this.xBallChange = Math.abs(this.xBallChange) * 1;
        console.log("left upper", this.yBallChange)
      }
      if (
        this.yBall > (this.yPaddleLeft + (0.5 * this.paddleHeight)) &&
        this.yBall <= (this.yPaddleLeft + this.paddleHeight)
      ) {
        this.yBallChange = Math.abs(this.yBallChange) * 1;
        this.xBallChange = Math.abs(this.xBallChange) * 1;
        console.log("left down", this.yBallChange)
      }
    }
    // points only if behind left wall
    else if (this.xBall < this.diameter / 2) {
      this.xBallChange *= -1;
      this.scoreRight++;
      this.started = false;
      // put ball for left serve
      this.xBall = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
      this.yBall = this.yPaddleLeft + (0.5 * this.paddleHeight);
      this.leftServe = true;
      // reset cpu speed
      if (this.cpuMode) {
        this.cpuSpeed = 8;
      }
    }

    // Detect collision with paddle right
    // if hit with upper half of paddle, redirect up, if lower half, redirect down
    if (
      this.xBall >= this.windowWidth - this.borderOffset - this.paddleWidth - (this.diameter / 2) &&
      this.yBall <= this.yPaddleRight + this.paddleHeight &&
      this.yBall >= this.yPaddleRight
    ) {
      if (
        this.yBall >= this.yPaddleRight &&
        this.yBall < (this.yPaddleRight + (0.5 * this.paddleHeight))
      ) {
        this.yBallChange = Math.abs(this.yBallChange) * -1;
        this.xBallChange = Math.abs(this.xBallChange) * -1;
        console.log("right upper", this.yBallChange)
      }
      if (
        this.yBall > (this.yPaddleRight + (0.5 * this.paddleHeight)) &&
        this.yBall <= (this.yPaddleRight + this.paddleHeight)
      ) {
        this.yBallChange = Math.abs(this.yBallChange) * 1;
        this.xBallChange = Math.abs(this.xBallChange) * -1;
        console.log("right down", this.yBallChange)
      }
    }
    // points if behind right wall
    // pause game and do serve position for the lost point user
    else if (this.xBall + this.diameter / 2 > this.windowWidth) {
      this.xBallChange *= -1;
      this.scoreLeft++;
      this.started = false;
      // put ball for right serve
      this.xBall = this.xPaddleRight - this.diameter/2;
      this.yBall = this.yPaddleRight + (0.5 * this.paddleHeight);
      this.rightServe = true;
      // reset cpu speed
      if (this.cpuMode) {
        this.cpuSpeed = 8;
      }
    }

    // bounce from top and bottom
    if (this.yBall < this.diameter / 2 || this.yBall > this.windowHeight - this.diameter) {
        this.yBallChange *= -1;
    }

    // Draw middle line
    p5.fill(56, 56, 56);
    p5.noStroke();
    p5.rect((this.windowWidth - this.paddleWidth) / 2, 0, this.paddleWidth / 2 , this.windowHeight);    

    // Draw paddle left
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(this.xPaddleLeft, this.yPaddleLeft, this.paddleWidth, this.paddleHeight);

    // Draw paddle right
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(this.xPaddleRight, this.yPaddleRight, this.paddleWidth, this.paddleHeight);

    
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

    // Draw ball (top layer)
    p5.fill(255, 255, 255);
    p5.ellipse(this.xBall, this.yBall, this.diameter, this.diameter);

    if (this.cpuMode) {
      this.diff = this.yBall - this.yPaddleLeft;
      if (this.leftServe) {
        setTimeout(() => this.cpuServe(), 1000);
      }
      if (this.started) {
        this.cpuMove();
      }
    }
  };

  cpuServe = () => {
      this.started = true;
      this.leftServe = false;
  }
  // CPU move right paddle    
  cpuMove = () => {
      if (this.diff > this.cpuSpeed * 0.7)
      {
        this.yPaddleLeft += this.cpuSpeed;
      }
      if (this.diff < this.cpuSpeed * 0.7)
      {
        this.yPaddleLeft -= this.cpuSpeed;
      }
      if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
      if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
      const add: boolean = Math.random() <= 0.5;
      const speedDiff = Math.floor(Math.random() * 4);
      this.cpuSpeed = add ? this.cpuSpeed + speedDiff : this.cpuSpeed - speedDiff;
      if (this.cpuSpeed > 16) {
        this.cpuSpeed = 16;
      }
      if (this.cpuSpeed < 7) {
        this.cpuSpeed = 7;
      }
  }

  keyPressed = (e: any) => {
    if (e.keyCode === 32) {
      // space 
      this.started = true;
      if (this.leftServe) {
        this.xBallChange *= this.xBallChange > 0 ? 1 : -1;
      }
      if (this.rightServe) {
        this.xBallChange *= this.xBallChange > 0 ? -1 : 1;
      }
      this.leftServe = false;
      this.rightServe = false;
    }
    if (e.keyCode === 38 || e.keyCode === 37) {
        // up & left arrows
        this.yPaddleRight -= this.paddleStep;
        if (this.yPaddleRight <= 0) this.yPaddleRight = 0;
        if (this.yPaddleRight + this.paddleHeight >= this.windowHeight ) this.yPaddleRight = this.windowHeight - this.paddleHeight;
        if (!this.cpuMode) {
          this.yPaddleLeft -= this.paddleStep;
          if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
          if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
        }

        if (this.rightServe) {
          this.xBall = this.xPaddleRight - this.diameter/2;
          this.yBall = this.yPaddleRight + (0.5 * this.paddleHeight);
        }
        else if (this.leftServe) {
          this.xBall = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
          this.yBall = this.yPaddleLeft + (0.5 * this.paddleHeight);
        }
    }
    else if (e.keyCode === 40 || e.keyCode === 39) {
        // down & right arrows
        this.yPaddleRight += this.paddleStep;
        if (this.yPaddleRight <= 0) this.yPaddleRight = 0;
        if (this.yPaddleRight + this.paddleHeight >= this.windowHeight ) this.yPaddleRight = this.windowHeight - this.paddleHeight;

        if (!this.cpuMode) {
          this.yPaddleLeft += this.paddleStep;
          if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
          if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
        }

        if (this.rightServe) {
          this.xBall = this.xPaddleRight - this.diameter/2;
          this.yBall = this.yPaddleRight + (0.5 * this.paddleHeight);
        }
        else if (this.leftServe) {
          this.xBall = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
          this.yBall = this.yPaddleLeft + (0.5 * this.paddleHeight);
        }
    }
  }
  // has touch events, maybe for mobile to use
  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed}/>
    );
  };
};
