import React, { Component, Fragment } from 'react';
import './loginForm.css';
import { connect } from 'react-redux';
import { login } from '../redux/reducer';
import joi from 'joi-browser';

class LoginForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    schema = {
        email: joi.string().required().label('Username'),
        password: joi.string().required().label('Password')
    }

    handleChange(e) {
        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account});
    }

    render() {
        let {account, errors} = this.state;
        let {email, password} = account;
        let {isLoginPending, isLoginSuccess, loginError} = this.props;
        return (
            <Fragment>
                <form name="loginForm" onSubmit={this.onSubmit}>
                    <div className="form-group-collection">
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" onChange={this.handleChange.bind(this)} name="email" value={email} className="form-conrol"/>
                        {errors && errors.username && <label>{errors.username}</label>}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" onChange={this.handleChange.bind(this)} name="password" value={password} className="form-conrol"/>
                        {errors && errors.password && <label>{errors.password}</label>}
                    </div>
                    </div>

                    <input type="submit" value="Login" />
                    <div className="message">
                        { isLoginPending && <div>Please wait...</div> }
                        { isLoginSuccess && <div>Success.</div> }
                        { loginError && <div>{loginError.message}</div> }
                    </div>
                </form>
                
            </Fragment>
            
        )
    }

    validate() {
        const {error} = joi.validate(this.state.account, this.schema, {abortEarly: false});
        if (!error) return null;
        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }
    onSubmit(e) {
        e.preventDefault();
        const errors = this.validate();
        // this.setState({ errors });
        if (errors) return;
        let { email, password } = this.state.account;
        this.props.login(email, password);
        this.setState({
          email: '',
          password: ''
        });
    }
}

const mapStateToProps = (state) => {
    return {
      isLoginPending: state.isLoginPending,
      isLoginSuccess: state.isLoginSuccess,
      loginError: state.loginError
    };
}
  
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password))
    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);