import { combineReducers } from 'redux';
import { restaurants, restaurantsHaveError, restaurantsAreLoading, selectedRestaurant, reviewsReducer, dishes, dishesHaveError, dishesAreLoading, selectedDish } from './restaurants';
import { users, usersHaveError, usersAreLoading, userLoginSuccess } from './users';

export default combineReducers({
    restaurants,
    restaurantsHaveError,
    restaurantsAreLoading,
    selectedRestaurant,
    reviewsReducer,
    users,
    usersHaveError,
    usersAreLoading,
    userLoginSuccess,
    dishes,
    dishesHaveError,
    dishesAreLoading,
    selectedDish,
});
