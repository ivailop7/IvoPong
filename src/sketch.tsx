import React from "react";
import Sketch from "react-p5";
import p5Types from "p5";
import MenuComponent from './menu';
import CongratsComponent from './congrats';
import * as CONSTANTS from "./constants";

interface PongProps {
  cpuMode: boolean;
}

interface PongState {
  finished: boolean;
  goToMenu: boolean;
}

export class PongComponent extends React.Component<PongProps, PongState> {
  cpuMode: boolean;

  constructor(props: PongProps) {
    super(props);
    this.cpuMode = props.cpuMode;
    this.state = {
      finished: false,
      goToMenu: false,
    }
  }

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  scoreLeft: number = 0;
  scoreRight: number = 0;
  paddleWidth: number = 16;
  paddleHeight: number = 130;
  paddleStep: number = this.windowHeight / 9;
  borderOffset: number = 5;
  diameter: number = 20;

  xPaddleLeft: number = this.borderOffset;
  yPaddleLeft: number = this.windowHeight / 2;
  xPaddleRight: number = this.windowWidth - this.borderOffset - this.paddleWidth;
  yPaddleRight: number = this.windowHeight / 2;
  
  leftServeXpos: number = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
  leftServeYpos: number = this.yPaddleLeft + (0.5 * this.paddleHeight);
  rightServeXpos: number = this.xPaddleRight - this.diameter/2;
  rightServeYpos: number = this.yPaddleRight + (0.5 * this.paddleHeight);
  
  yBall: number = this.leftServeYpos;
  xBall: number = this.leftServeXpos;
  xBallSpeed: number = 12;
  yBallSpeed: number = 12;
   
  started: boolean = false;
  leftServe: boolean = true;
  rightServe: boolean = false;

  cpuSpeed: number = 8;
  diffCpuBall: number = 0;

  //p5 Canvas Setup
  setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(this.windowWidth, this.windowHeight, "p2d").parent(canvasParentRef);
  };

  //p5 Canvas Re-draw method
  draw = (p5: p5Types) => {
    p5.background(0,0,0);
    
    // global pause - when not started or serve in progress
    if (this.started) {
      this.xBall += this.xBallSpeed;
      this.yBall += this.yBallSpeed;
    }
    
    // Detect collision with left paddle
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
        this.yBallSpeed = Math.abs(this.yBallSpeed) * -1;
        this.xBallSpeed = Math.abs(this.xBallSpeed);
      }
      if (
        this.yBall > (this.yPaddleLeft + (0.5 * this.paddleHeight)) &&
        this.yBall <= (this.yPaddleLeft + this.paddleHeight)
      ) {
        this.yBallSpeed = Math.abs(this.yBallSpeed);
        this.xBallSpeed = Math.abs(this.xBallSpeed);
      }
    }
    // points only if behind left wall
    else if (this.xBall < this.diameter / 2) {
      this.xBallSpeed *= -1;
      this.scoreRight++;
      if (this.scoreRight === 10) {
        this.setState({ finished: true });
      }
      this.started = false;
      // put ball for left serve
      this.xBall = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
      this.yBall = this.yPaddleLeft + (0.5 * this.paddleHeight);
      this.leftServe = true;
      this.resetCPUSpeed();
    }

    // Detect collision with right paddle
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
        this.yBallSpeed = Math.abs(this.yBallSpeed) * -1;
        this.xBallSpeed = Math.abs(this.xBallSpeed) * -1;
      }
      if (
        this.yBall > (this.yPaddleRight + (0.5 * this.paddleHeight)) &&
        this.yBall <= (this.yPaddleRight + this.paddleHeight)
      ) {
        this.yBallSpeed = Math.abs(this.yBallSpeed);
        this.xBallSpeed = Math.abs(this.xBallSpeed) * -1;
      }
    }
    // points if behind right wall
    // pause game and do serve position for the lost point user
    else if (this.xBall + this.diameter / 2 > this.windowWidth) {
      this.xBallSpeed *= -1;
      this.scoreLeft++;
      if (this.scoreLeft === 10) {
        this.setState({ finished: true });
      }
      this.started = false;
      // put ball for right serve
      this.xBall = this.xPaddleRight - this.diameter/2;
      this.yBall = this.yPaddleRight + (0.5 * this.paddleHeight);
      this.rightServe = true;
      this.resetCPUSpeed();
    }
    
    this.bounceTopBottom();

    // Draw paddle left
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(this.xPaddleLeft, this.yPaddleLeft, this.paddleWidth, this.paddleHeight);

    // Draw paddle right
    p5.fill(255, 255, 255);
    p5.noStroke();
    p5.rect(this.xPaddleRight, this.yPaddleRight, this.paddleWidth, this.paddleHeight);

    this.drawStaticItems(p5);
    
    // Draw ball (top layer)
    p5.fill(255, 255, 255);
    p5.ellipse(this.xBall, this.yBall, this.diameter, this.diameter);
    
    this.cpuShouldAction();
  };

  cpuShouldAction = () => {
    if (this.cpuMode) {
      this.diffCpuBall = this.yBall - this.yPaddleLeft;
      if (this.leftServe) {
        setTimeout(() => this.cpuServe(), 1000);
      }
      if (this.started) {
        this.cpuMove();
      }
    }
  }

  cpuServe = () => {
      this.started = true;
      this.leftServe = false;
  }

  // CPU move right paddle    
  cpuMove = () => {
      this.yPaddleLeft += this.diffCpuBall >= this.cpuSpeed * 0.7 ? this.cpuSpeed : (this.cpuSpeed * -1);
      
      // bound to play window
      if (this.yPaddleLeft <= 0) {
        this.yPaddleLeft = 0;
      }
      if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) {
        this.yPaddleLeft = this.windowHeight - this.paddleHeight;
      }

      // Randomize CPU speed
      const speedDiff = Math.floor(Math.random() * 4);
      this.cpuSpeed += Math.random() <= 0.5 ? speedDiff : (speedDiff * -1);

      // bound the CPU speed change
      if (this.cpuSpeed > 16) {
        this.cpuSpeed = 16;
      }
      if (this.cpuSpeed < 7) {
        this.cpuSpeed = 7;
      }
  }

  resetCPUSpeed = () => {
    if (this.cpuMode) {
      this.cpuSpeed = 8;
    }
  }
  bounceTopBottom = () => {
    // bounce from top and bottom
    if (this.yBall < this.diameter / 2 || this.yBall > this.windowHeight - this.diameter) {
        this.yBallSpeed *= -1;
    }
  }
  moveBallDuringRightServe = (moveBallDuringRightServe: boolean) => {
    if (moveBallDuringRightServe) {
      this.xBall = this.xPaddleRight - this.diameter/2;
      this.yBall = this.yPaddleRight + (0.5 * this.paddleHeight);
    }
  }

  moveBallDuringLeftServe = (moveBallDuringLeftServe: boolean) => {
    if (moveBallDuringLeftServe) {
      this.xBall = this.xPaddleLeft + this.paddleWidth + this.diameter/2;
      this.yBall = this.yPaddleLeft + (0.5 * this.paddleHeight);
    }
  }

  mobileServeRight = (rightServe: boolean) => {
    if (rightServe) {
      this.xBallSpeed *= this.xBallSpeed > 0 ? -1 : 1;
      this.rightServe = false;
      this.started = true;
    }
  }

  mobileServeLeft = (leftServe: boolean) => {
    if (leftServe) {
      this.xBallSpeed *= this.xBallSpeed > 0 ? 1 : -1;
      this.leftServe = false;
      this.started = true;
    }
  }

  boundToWindow = () => {
    if (this.yPaddleLeft <= 0) this.yPaddleLeft = 0;
    if (this.yPaddleLeft + this.paddleHeight >= this.windowHeight ) this.yPaddleLeft = this.windowHeight - this.paddleHeight;
    if (this.yPaddleRight <= 0) this.yPaddleRight = 0;
    if (this.yPaddleRight + this.paddleHeight >= this.windowHeight ) this.yPaddleRight = this.windowHeight - this.paddleHeight;
  }

  drawStaticItems = (p5: p5Types) => {
    // Draw middle line
    p5.fill(56, 56, 56);
    p5.noStroke();
    p5.rect((this.windowWidth - this.paddleWidth) / 2, 0, this.paddleWidth / 2 , this.windowHeight);    

    // Draw scores
    p5.textFont("Visitor", 36);
    p5.fill(255, 255, 255);
    p5.textSize(70);
    p5.text(this.scoreLeft < 10 ? "0" + this.scoreLeft : this.scoreLeft, this.windowWidth * (1/4), 50);
    p5.text(this.scoreRight < 10 ? "0" + this.scoreRight : this.scoreRight, this.windowWidth * (3/4), 50);

    // title & menu back text
    p5.textSize(50);
    p5.text("IvoPong", (this.windowWidth - this.paddleWidth) / 2 - 100 , this.windowHeight - 40);
    p5.textSize(20);
    p5.text("ESC to Menu", (this.windowWidth - this.paddleWidth) / 2 - 62 , this.windowHeight - 20);
  }

  //p5 event on mobile screen tap / desktop click
  touchStartedSinglePlayer = (t: any) => {
    if (t.pmouseY < 0.5 * t.height) {
      this.yPaddleRight -= this.paddleStep;
    }
    else {
      this.yPaddleRight += this.paddleStep;
    }
    this.boundToWindow();
    this.mobileServeRight(this.rightServe);
  }

  //p5 event on mobile screen tap / desktop click
  touchStartedTwoPlayers = (t: any) => {
    //right
    if (t.pmouseY < 0.5 * t.height && t.pmouseX > 0.5 * t.width) {
      this.yPaddleRight -= this.paddleStep;
    }
    if (t.pmouseY > 0.5 * t.height && t.pmouseX > 0.5 * t.width) {
      this.yPaddleRight += this.paddleStep;
    }
    //left
    if (t.pmouseY < 0.5 * t.height && t.pmouseX < 0.5 * t.width) {
      this.yPaddleLeft -= this.paddleStep;
    }
    if (t.pmouseY > 0.5 * t.height && t.pmouseX < 0.5 * t.width) {
      this.yPaddleLeft += this.paddleStep;
    }
    this.boundToWindow();
    this.mobileServeRight(this.rightServe);
    this.mobileServeLeft(this.leftServe);
  }

  //p5 event on key press
  keyPressed = (e: any) => {
    // esc to menu
    if (e.keyCode === CONSTANTS.ESC) {
      this.setState({ goToMenu: true });
    }
    if (e.keyCode === CONSTANTS.SPACEBAR) {
      // space 
      this.started = true;
      if (this.leftServe) {
        this.xBallSpeed = Math.abs(this.xBallSpeed);
      }
      if (this.rightServe) {
        this.xBallSpeed = Math.abs(this.xBallSpeed) * -1;
      }
      this.leftServe = false;
      this.rightServe = false;
    }
    if (e.keyCode === CONSTANTS.UP_ARROW || e.keyCode === CONSTANTS.LEFT_ARROW) {
        this.yPaddleRight -= this.paddleStep;
    }
    if (e.keyCode === CONSTANTS.DOWN_ARROW || e.keyCode === CONSTANTS.RIGHT_ARROW) {
        this.yPaddleRight += this.paddleStep;
    }

    // 2nd player keys W (87) and S (83)
    if (!this.cpuMode) {
      if (e.keyCode === CONSTANTS.W_KEY) {
        this.yPaddleLeft -= this.paddleStep;
      }
      if (e.keyCode === CONSTANTS.S_KEY) {
        this.yPaddleLeft += this.paddleStep;
      }
    }

    this.moveBallDuringLeftServe(this.leftServe);
    this.moveBallDuringRightServe(this.rightServe);
    this.boundToWindow();
  }

  render() {
    return (
      this.state.goToMenu ? <MenuComponent/> : (
      this.state.finished ? <div>{this.cpuMode ? (<CongratsComponent winner={this.scoreLeft === 10 ? "CPU" : "You"}/>) : <CongratsComponent winner={(this.scoreLeft === 10 ? "Player 1" : "Player 2")}/>}</div> :
      <Sketch setup={this.setup} draw={this.draw} keyPressed={this.keyPressed} touchStarted={this.cpuMode ? this.touchStartedSinglePlayer : this.touchStartedTwoPlayers} />
    ));
  };
};

export default PongComponent;