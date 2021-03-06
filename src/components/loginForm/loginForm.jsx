import React, { Component, Fragment } from 'react';
import './loginForm.css';
import { connect } from 'react-redux';
import { login } from '../redux/reducer';
import joi from 'joi-browser';

class LoginForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            account: {
                email: '',
                password:''
            },
            errors: {}
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    schema = {
        email: joi.string().required().label('Email'),
        password: joi.string().required().label('Password')
    }

    handleChange = (e) => {
        const account = { ...this.state.account };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({account});
    }

    clearValidation = (e) => {
        let errors = this.state.errors;
        errors[e.currentTarget.name] = '';
        this.setState({errors});
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
                        <input type="email" onFocus={this.clearValidation} onChange={this.handleChange} name="email" value={email} className="form-conrol"/>
                        {errors && errors.email && <label>{errors.email}</label>}
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" onFocus={this.clearValidation} onChange={this.handleChange} name="password" value={password} className="form-conrol"/>
                        {errors && errors.password && <label>{errors.password}</label>}
                    </div>
                    </div>

                    <input type="submit" value="Login" />
                    <div className="message">
                        { isLoginPending && <div>Please wait...</div> }
                        { isLoginSuccess && this.props.history.push('/home') }
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
        console.log(errors);
        this.setState({ errors });
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