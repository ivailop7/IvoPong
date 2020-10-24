import styled, { createGlobalStyle } from "styled-components";

// Global Styles
export const GlobalStyling = createGlobalStyle`
a, span {
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}

a:hover, span:hover {
  color: yellow;
  cursor: pointer;
}
`;

// Menu & Congrats Screens
export const centeredVHDiv = styled.div`
    width: 360px;
    position: fixed;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const titleText = styled.div`
    font-size: 72px;
    color: lightblue;
    margin-bottom: 40px;
`;

export const itemText = styled.div`
    font-size: 36px;
`;

// Rules Popup
export const rulesWindow = styled.div`
  width: 80%;
  height: 75%;
  top: 50%;
  left: 50%;
  font-size: 26px;
  position: fixed;
  zindex: 9999;
  transform: translate(-50%, -50%);
  border: solid 2px #ffffff;
`;

export const styledButton = styled.button`
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
  font-family: "Visitor";
  cursor: pointer;

  &:hover {
    color: yellow;
  }
`;

// Footer
export const styledText = styled.div`
  vertical-align: middle;
  line-height: 30px;
  text-align: center;
  margin: 0 auto;
  width: 100%;
`;

export const styledImg = styled.img`
  width: 35px;
  padding: 5px;
  border: 0;
  box-shadow: 0;
  text-align: center;
`;

export const styledShareButtons = styled.div`
  margin: 0 auto;
  font-size: 20px;
  height: 77px;
  bottom: 0px;
  width: 100%;
  text-align: center;
`;

export const fixToBottom = styled.div`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: unset;
  bottom: 0px;
`;