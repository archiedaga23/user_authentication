import './app.css';
import { React, Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Topbar from './component/topbar/Topbar';
import Home from './component/home/Home';
import Register from './component/register/Register';
import Login from './component/login/Login';
import Dashboard from './component/dashboard/Dashboard';
import CreateProfile from './component/create-profile/CreateProfile';

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { logoutUser, setCurrentUser  } from './action/authAction';
import { clearCurrentProfile } from './action/profileAction';

import { Provider } from 'react-redux';
import store from './store';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken)

  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded)); 

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser()); 
    store.dispatch(clearCurrentProfile()); 
    window.location.href = '/login'
  }
}

class App extends Component {
 render() {
  return (
    <Provider store={ store }>
      <Router>
        <div className="App">
          <Topbar />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login'component={Login} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/create-profile' component={CreateProfile} />
        </div>
      </Router>
    </Provider>
  )
 }
}

export default App;
