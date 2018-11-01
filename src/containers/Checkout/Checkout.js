import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import "./Checkout.css";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/index";

class Checkout extends Component {
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     if (param[0] === "price") {
  //       price = param[1];
  //     } else {
  //       ingredients[param[0]] = +param[1];
  //     }
  //   }
  //   this.setState({
  //     ingredients,
  //     totalPrice: price
  //   });
  // }

  CheckoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  CheckoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ingredients && !this.props.purchased) {
      summary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            CheckoutCancelled={this.CheckoutCancelledHandler}
            CheckoutContinued={this.CheckoutContinuedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
            // render={props => (
            //   <ContactData
            //     ingredients={this.props.ingredients}
            //     price={this.props.totalPrice}
            //     {...props}
            //   />
            // )}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
