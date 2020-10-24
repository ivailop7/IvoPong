import React from "react";
import facebookImg from "./assets/facebook.png";
import linkedinImg from "./assets/linkedin.png";
import twitterImg from "./assets/twitter.png";
import * as Styles from "./styles";

export default class FooterComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      cpuMode: false,
      twoPlayerMode: false,
      rulesRead: false,
    };
  }

  render() {
    return (
        <Styles.fixToBottom>
          <Styles.styledShareButtons>
          <Styles.styledText>Share the game</Styles.styledText>
          <a href="http://www.facebook.com/sharer.php?u=https://pong.ivaylopavlov.com">
            <Styles.styledImg src={facebookImg} alt="Facebook" />
          </a>
          <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://pong.ivaylopavlov.com">
            <Styles.styledImg src={linkedinImg} alt="LinkedIn" />
          </a>
          <a href="https://twitter.com/share?url=https://pong.ivaylopavlov.com&amp;text=I%20played%20Ivo%20Pong%20at&amp;hashtags=IvoPong">
            <Styles.styledImg src={twitterImg} alt="Twitter" />
          </a>
          </Styles.styledShareButtons>
        </Styles.fixToBottom>
    );
  }
}
