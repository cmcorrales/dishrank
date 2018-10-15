import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import history from './history';
//Components:
import App from './App';
// import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import SelectedRestaurant from './components/SelectedRestaurant'
import 'semantic-ui-css/semantic.min.css';


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/restaurantlist" component={RestaurantList} />
        {/* same as: <Route path="/restaurantlist" render={renderProps => <RestaurantList {...renderProps} />} />  */}
        <Route path="/selectedrestaurant" component={SelectedRestaurant} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
