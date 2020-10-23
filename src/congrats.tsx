import React from "react";
import { PongComponent } from "./sketch";
import facebookImg from "./assets/facebook.png";
import linkedinImg from "./assets/linkedin.png";
import twitterImg from "./assets/twitter.png";
import styled from "styled-components";

export default class MenuComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuMode: false,
      twoPlayerMode: false,
      rulesRead: false,
    };
  }

  styledImg = styled.img`
    width: 35px;
    padding: 5px;
    border: 0;
    box-shadow: 0;
    text-align: center;
  `
  styledText = styled.div`
    vertical-align: middle;
    line-height: 30px;
    text-align: center;
    margin: 0 auto;
    width: 100%;
  `

  styledShareButtons = styled.div`
    margin: 0 auto;
    font-size: 24px;
    height: 77px;
    bottom: 0px;
    width: 100%;
    text-align: center;
  `

  fixToBottom = styled.div`
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: unset;
    bottom: 0px;
  `;

  rulesWindow = styled.div`
    width: 40%;
    height: 40%;
    top: 50%;
    left: 50%;
    font-size: 26px;
    position: fixed;
    zIndex: 9999;
    transform: translate(-50%, -50%);
    border: solid 2px #ffffff;
  `;

  styledButton = styled.button`
    border: solid 1px #ffffff;
    width: 100%;
    font-size: 24px;
    display: block;
    color: #ffffff;
    background-color: #000000;
    margin-left: 0px;
    position: fixed;
    top: unset;
    bottom: 0px;
    font-family: 'Visitor';
    cursor: pointer;

    &:hover {
      color: yellow;
    }
  `

  cpuRules = "'Spacebar' to serve, 'Arrow keys' to move the paddle. With mouse, click upper half/lower half of the window. On mobile, tap the upper/lower half of screen to move in that direction. The first player to win 10 points wins.";
  twoPlayerRules = "'Spacebar' to serve, 'Arrow keys' to move the right paddle. Keys 'W' and 'S' to move the left paddle. One of the players can play with the mouse clicking on the screen upper/lower quadrants on their side of the window. On mobile, the player 1, can tap the top and bottom of left half of the screen to move, the player 2, the top and bottom of the right half to move. The first player to win 10 points wins.";
  
  render() {
    return this.state.cpuMode ? (
      <>
        {!this.state.readRules ? <this.rulesWindow><span>{this.cpuRules}</span><this.styledButton onClick={() => this.setState({readRules: true})}>Got It</this.styledButton></this.rulesWindow> : <PongComponent cpuMode={true} />}
      </>
    ) : this.state.twoPlayerMode ? (
      <>
        {!this.state.readRules ? <this.rulesWindow><span>{this.twoPlayerRules}</span><this.styledButton onClick={() => this.setState({readRules: true})}>Got It</this.styledButton></this.rulesWindow> : <PongComponent cpuMode={false} />}
      </>
    ) : (
      <>
        <div
          style={{
            width: 360,
            position: "fixed",
            zIndex: 9999,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              color: "lightblue"
            }}
          >
            {`${this.props.winner} Won !`}
          </div>
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              fontSize: "36px",
            }}
          >
            <div>
              <span onClick={() => this.setState({ cpuMode: true })}>
                Player vs CPU
              </span>
            </div>
            <div>
              <span onClick={() => this.setState({ twoPlayerMode: true })}>
                Player vs Player
              </span>
            </div>
            <br />
            <br />
            <div>
              <a href="https://github.com/ivailop7/IvoPong">View in GitHub</a>
            </div>
            <div>
              <a href="https://www.ivaylopavlov.com">Go To Blog</a>
            </div>
          </div>
        </div>
        <this.fixToBottom>
          <this.styledShareButtons>
          <this.styledText>Share the game</this.styledText>
          <a href="http://www.facebook.com/sharer.php?u=https://pong.ivaylopavlov.com">
            <this.styledImg src={facebookImg} alt="Facebook" />
          </a>
          <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://pong.ivaylopavlov.com">
            <this.styledImg src={linkedinImg} alt="LinkedIn" />
          </a>
          <a href="https://twitter.com/share?url=https://pong.ivaylopavlov.com&amp;text=I%20played%20Ivo%20Pong%20at&amp;hashtags=IvoPong">
            <this.styledImg src={twitterImg} alt="Twitter" />
          </a>
          </this.styledShareButtons>
        </this.fixToBottom>
      </>
    );
  }
}
