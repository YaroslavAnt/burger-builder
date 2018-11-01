import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import classes from "./Auth.css";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Adress"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Passwod "
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const regExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = regExp.test(value) && isValid;
    }
    return isValid;
  }

  onChangeHandler = (event, name) => {
    const updatedForm = {
      ...this.state.controls,
      [name]: {
        ...this.state.controls[name],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[name].validation
        ),
        touched: true
      }
    };
    this.setState({
      controls: updatedForm
    });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onSubmit(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  onSwitchModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  };

  componentDidMount() {
    if (!this.props.building && this.props.redirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let formElements = formElementsArray.map(formElement => (
      <Input
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        key={formElement.id}
        invalid={!formElement.config.valid}
        touched={formElement.config.touched}
        shouldValidate={formElement.config.validation}
        onChange={event => this.onChangeHandler(event, formElement.id)}
      />
    ));

    if (this.props.loading) {
      formElements = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error}</p>;
    }

    let redirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.redirectPath} />
    ) : null;

    return (
      <div className={classes.Auth}>
        {redirect}
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {formElements}
          <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button clicked={this.onSwitchModeHandler} btnType="Danger">
          SWITCH TO {this.state.isSignup ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    redirectPath: state.auth.authRedirectPath,
    building: state.burgerBuilder.building
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
