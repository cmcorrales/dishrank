import { combineReducers } from 'redux';
import { restaurants, restaurantsHaveError, restaurantsAreLoading } from './restaurants';
import { users, usersHaveError, usersAreLoading, userLoginSuccess } from './users';

export default combineReducers({
    restaurants,
    restaurantsHaveError,
    restaurantsAreLoading,
    users,
    usersHaveError,
    usersAreLoading,
    userLoginSuccess
});
