import React from "react";
import * as Styles from "./styles";

const MenuItems: React.FC<any> = (props: any) => {
  
  return (
          <Styles.itemText>
            <div>
              <span onClick={() => props.startCPUMode()}>
                Player vs CPU
              </span>
            </div>
            <div>
              <span onClick={() => props.startTwoPlayerMode()}>
                Player vs Player
              </span>
            </div>
            <div>
              <a href="https://github.com/ivailop7/IvoPong">View in GitHub</a>
            </div>
            <div>
              <a href="https://www.ivaylopavlov.com">Go To Blog</a>
            </div>
          </Styles.itemText>
    );
}

export default MenuItems;