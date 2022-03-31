import React from "react";

import { ReactComponent as FaceitLvl1 } from "./svg/faceit1.svg";
import { ReactComponent as FaceitLvl2 } from "./svg/faceit2.svg";
import { ReactComponent as FaceitLvl3 } from "./svg/faceit3.svg";
import { ReactComponent as FaceitLvl4 } from "./svg/faceit4.svg";
import { ReactComponent as FaceitLvl5 } from "./svg/faceit5.svg";
import { ReactComponent as FaceitLvl6 } from "./svg/faceit6.svg";
import { ReactComponent as FaceitLvl7 } from "./svg/faceit7.svg";
import { ReactComponent as FaceitLvl8 } from "./svg/faceit8.svg";
import { ReactComponent as FaceitLvl9 } from "./svg/faceit9.svg";
import { ReactComponent as FaceitLvl10 } from "./svg/faceit10.svg";

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

const FaceitLvl = ({ width = 40, height = 40, level = 1 }) => {
  if (level <= 1 && level >= 10) {
    return <alert>Level should be between 1 and 10</alert>;
  }
  const FaceitLvlIcon = iconsList[level - 1];
  return <FaceitLvlIcon width={width} height={height} />;
};

export default FaceitLvl;
