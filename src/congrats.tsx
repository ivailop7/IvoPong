import React from "react";
import PongComponent from "./sketch";
import RulesWindow from "./rules-window";
import FooterComponent from "./footer";
import * as Styles from "./styles";
import { TWO_PLAYER_RULES, CPU_RULES } from "./constants";
import MenuItems from "./menu-items";

const CongratsComponent: React.FC<any> = (props: any) => {
  const [cpuMode, setCPUMode] = React.useState(false);
  const [twoPlayerMode, setTwoPlayerMode] = React.useState(false);
  const [readRules, setReadRules] = React.useState(false);
  
  return cpuMode ? (
    <>
        {!readRules ? 
          <RulesWindow contents={CPU_RULES} readRules={() => setReadRules(true)}/> : <PongComponent cpuMode={true} />}
      </>
  ) : twoPlayerMode ? (
    <>
        {!readRules ? 
          <RulesWindow contents={TWO_PLAYER_RULES} readRules={() => setReadRules(true)}/> : <PongComponent cpuMode={false} />}
      </>
  ) : (
    <>
        <Styles.centeredVHDiv>
          <Styles.titleText>{`${props.winner} Won !`}</Styles.titleText>
          <MenuItems startCPUMode={() => setCPUMode(true)} startTwoPlayerMode={() => setTwoPlayerMode(true)}/>
        </Styles.centeredVHDiv>
        <FooterComponent/>
      </>
    );
}

export default CongratsComponent;