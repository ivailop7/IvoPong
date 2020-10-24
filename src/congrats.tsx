import React from "react";
import { PongComponent } from "./sketch";
import FooterComponent from "./footer";
import * as Styles from "./styles";

export default class MenuComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuMode: false,
      twoPlayerMode: false,
      rulesRead: false,
    };
  }

  cpuRules = "'Spacebar' to serve, 'Arrow keys' to move the paddle. With mouse, click upper half/lower half of the window. On mobile, tap the upper/lower half of screen to move in that direction. The first player to win 10 points wins.";
  twoPlayerRules = "'Spacebar' to serve, 'Arrow keys' to move the right paddle. Keys 'W' and 'S' to move the left paddle. One of the players can play with the mouse clicking on the screen upper/lower quadrants on their side of the window. On mobile, the player 1, can tap the top and bottom of left half of the screen to move, the player 2, the top and bottom of the right half to move. The first player to win 10 points wins.";
  
  render() {
    return this.state.cpuMode ? (
      <>
        {!this.state.readRules ? <Styles.rulesWindow><span>{this.cpuRules}</span><Styles.styledButton onClick={() => this.setState({readRules: true})}>Got It</Styles.styledButton></Styles.rulesWindow> : <PongComponent cpuMode={true} />}
      </>
    ) : this.state.twoPlayerMode ? (
      <>
        {!this.state.readRules ? <Styles.rulesWindow><span>{this.twoPlayerRules}</span><Styles.styledButton onClick={() => this.setState({readRules: true})}>Got It</Styles.styledButton></Styles.rulesWindow> : <PongComponent cpuMode={false} />}
      </>
    ) : (
      <>
        <Styles.centeredVHDiv>
          <Styles.titleText>{`${this.props.winner} Won !`}</Styles.titleText>
          <br />
          <br />
          <br />
          <br />
          <Styles.itemText>
            <span onClick={() => this.setState({ cpuMode: true })}>
              Player vs CPU
            </span>
            <span onClick={() => this.setState({ twoPlayerMode: true })}>
              Player vs Player
            </span>
            <br />
            <br />
            <a href="https://github.com/ivailop7/IvoPong">View in GitHub</a>
            <a href="https://www.ivaylopavlov.com">Go To Blog</a>
          </Styles.itemText>
        </Styles.centeredVHDiv>
        <FooterComponent/>
      </>
    );
  }
}
