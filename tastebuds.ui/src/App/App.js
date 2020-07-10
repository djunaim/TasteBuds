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
import SavedRestaurants from '../components/pages/SavedRestaurants/SavedRestaurants';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    if (sessionStorage.getItem('userId')) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  }

  componentWillUnmount() {
    if (sessionStorage.getItem('userId')) {
      this.setState({ authed: true });
    } else {
      this.setState({ authed: false });
    }
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar authed={authed} />
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" exact component={Profile} authed={authed} />
            <PrivateRoute path="/profile/savedRestaurants" exact component={SavedRestaurants} authed={authed} />
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
