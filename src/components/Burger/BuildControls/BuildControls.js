import React from "react";

import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    {controls.map(el => (
      <BuildControl
        added={() => props.ingredientAdded(el.type)}
        removed={() => props.ingredientRemoved(el.type)}
        key={el.label}
        label={el.label}
      />
    ))}
  </div>
);

export default buildControls;
