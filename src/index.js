import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
//Components:
import App from './App';
import Login from './components/Login';
import RestaurantList from './components/RestaurantList';
import 'semantic-ui-css/semantic.min.css';


const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <Route exact path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/restaurantlist" component={RestaurantList} />
      </React.Fragment>
    </Router>
  </Provider>
  , document.getElementById('root'));
