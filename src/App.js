import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginForm from './components/loginForm/loginForm';
import Employees from './components/employees/employees';

class App extends Component {
    state = {  }
    render() { 
        return ( 
            <React.Fragment>
                <Switch>
                    <Route path='/home' component={Employees}/>
                    <Route path='/' exact component={LoginForm}/>
                </Switch>
            </React.Fragment>
         );
    }
}
 
export default App;