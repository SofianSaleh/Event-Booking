import React, { Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Login from './pages/auth/Login'
import Signup from './pages/auth/SignUp'
import Events from './pages/Events'
import Bookings from './pages/Bookings'
import Navbar from './components/navigation/Navbar'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Fragment>
          <Navbar />
          <Switch>
            <Redirect from="/" to="/auth" exact />
            <Route path="/auth/login" component={AuthPage} />
            <Route path="/auth/signup" component={AuthPage} />
            <Route path="/events" component={Events} />
            <Route path="/bookings" component={Bookings} />
          </Switch>
        </Fragment>
      </div>
    </BrowserRouter>
  );
}

export default App;
