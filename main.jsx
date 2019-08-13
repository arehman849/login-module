import React, {Component} from 'react';
import App from './src/components/App';
import { Provider } from 'react-redux';
import store from './src/components/redux/store';
import {BrowserRouter} from 'react-router-dom';

class Main extends Component {
    render (){
    return (
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    )
    }
}

export default Main;
