import React from "react";

import { ReactComponent as FaceitLvl1 } from "../assets/icons/faceit1.svg";
import { ReactComponent as FaceitLvl2 } from "../assets/icons/faceit2.svg";
import { ReactComponent as FaceitLvl3 } from "../assets/icons/faceit3.svg";
import { ReactComponent as FaceitLvl4 } from "../assets/icons/faceit4.svg";
import { ReactComponent as FaceitLvl5 } from "../assets/icons/faceit5.svg";
import { ReactComponent as FaceitLvl6 } from "../assets/icons/faceit6.svg";
import { ReactComponent as FaceitLvl7 } from "../assets/icons/faceit7.svg";
import { ReactComponent as FaceitLvl8 } from "../assets/icons/faceit8.svg";
import { ReactComponent as FaceitLvl9 } from "../assets/icons/faceit9.svg";
import { ReactComponent as FaceitLvl10 } from "../assets/icons/faceit10.svg";
import { ReactComponent as QuestionCircle } from "../assets/icons/questionCircle.svg";

const iconsList = [
  FaceitLvl1,
  FaceitLvl2,
  FaceitLvl3,
  FaceitLvl4,
  FaceitLvl5,
  FaceitLvl6,
  FaceitLvl7,
  FaceitLvl8,
  FaceitLvl9,
  FaceitLvl10,
];

const FaceitLvlIcon = ({ width = 40, height = 40, level = 1 }) => {
  if (level < 1 || level > 10) {
    return <QuestionCircle width={width} height={height} />;
  }
  const FaceitLvlIcon = iconsList[level - 1];
  return <FaceitLvlIcon width={width} height={height} />;
};

export default FaceitLvlIcon;
