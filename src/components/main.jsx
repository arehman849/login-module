import React, {Component} from 'react';
import LoginForm from './loginForm/loginForm';
import { Provider } from 'react-redux';
import store from './redux/store';

class Main extends Component {
    render (){
    return (
        <Provider store={store}>
            <LoginForm />
        </Provider>
    )
    }
}

export default Main;
