import React from "react";

import Logo from "../../Logo/Logo";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux_/Aux";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";

const sideDrawer = props => {
  let attachedClasses = props.open //?????????
    ? [classes.SideDrawer, classes.Open]
    : [classes.SideDrawer, classes.Close];

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div onClick={props.closed} className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
