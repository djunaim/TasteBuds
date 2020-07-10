import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../components/pages/Home/Home';
import Profile from '../components/pages/Profile/Profile';
import Restaurants from '../components/pages/Restaurants/Restaurants';
import RestaurantForm from '../components/pages/RestaurantForm/RestaurantForm';
import SingleRestaurant from '../components/pages/SingleRestaurant/SingleRestaurant';
import Navbar from '../components/shared/Navbar/Navbar';
import authData from '../helpers/data/authData';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/findTaste" exact component={RestaurantForm} />
            <Route path="/restaurants" exact component={Restaurants} />
            <Route path="/restaurants/:restaurantId" exact component={SingleRestaurant} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
