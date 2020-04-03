import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginForm from './components/loginForm/loginForm';
import DashBoard from './components/dashBoard/DashBoard';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Switch>
                    <Route path='/home' component={DashBoard}/>
                    <Route path='/' exact component={LoginForm}/>
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default App;