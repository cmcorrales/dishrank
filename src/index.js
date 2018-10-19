import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import history from './history';
//Components:
import App from './App';
import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import SelectedRestaurant from './components/SelectedRestaurant'
import SignUp from './components/SignUp'
import 'semantic-ui-css/semantic.min.css';
/* same as: <Route path="/restaurantlist" render={renderProps => <RestaurantList {...renderProps} />} />  */


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/selectedrestaurant" component={SelectedRestaurant} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
