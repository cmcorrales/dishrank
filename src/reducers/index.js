import { combineReducers } from 'redux';
import { restaurants, restaurantsHaveError, restaurantsAreLoading, selectedRestaurant, reviewsReducer, dishes, dishesHaveError, dishesAreLoading, selectedDish, ratingsReducer, restaurantsReducer, dishesReducer } from './restaurants';
import { users, usersHaveError, usersAreLoading, userLoginSuccess, loginsReducer, loginsHaveError, loginsAreLoading, logins } from './users';

export default combineReducers({
    restaurants,
    restaurantsHaveError,
    restaurantsAreLoading,
    restaurantsReducer,
    ratingsReducer,
    selectedRestaurant,
    reviewsReducer,
    users,
    usersHaveError,
    usersAreLoading,
    userLoginSuccess,
    dishes,
    dishesHaveError,
    dishesAreLoading,
    dishesReducer,
    selectedDish,
    loginsReducer,
    loginsHaveError,
    loginsAreLoading,
    logins,
});
