import React from 'react';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Checkout from './Checkout';
import Login from './Login'
import SignUp from './SignUp'
import Payment from './Payment';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Orders';

const promise = loadStripe('pk_test_51JxA3xFlvRVXan9yPfqKhxNTzAx1Y2JScagYBvNPJaqQKaS4auyh977jeZRbeIyU5uWZLeIS1B0YBiHzoswugXBQ006lfOIVpX')


function App() {

  return (
    <div>
      
    

      <Router>
        <Switch>
          <Route exact path='/'>
            <Header/>
            <Home/>
          </Route>

          <Route path='/login'>
            <Login />
          </Route>

          <Route path='/sign-up'>
            <SignUp />
          </Route>

          <Route path='/checkout'>
            <Header/>
            <Checkout/>
          </Route>

          <Route path='/orders'>
            <Header/>
            <Orders/>
          </Route>

          <Route path='/payment'>
            <Header/>
            <Elements stripe = {promise}>
                <Payment/>
            </Elements>
          </Route>
        </Switch>
       
      </Router>
    </div>
  );
}

export default App;


