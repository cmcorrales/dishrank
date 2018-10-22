import axios from 'axios';

export function restaurantsHaveError(bool) {
    return {
        type: 'RESTAURANTS_HAVE_ERROR',
        hasError: bool
    };
}

export function restaurantsAreLoading(bool) {
    return {
        type: 'RESTAURANTS_ARE_LOADING',
        isLoading: bool
    };
}

export function restaurantsFetchDataSuccess(restaurants) {
    return {
        type: 'RESTAURANTS_FETCH_DATA_SUCCESS',
        restaurants
    };
}

export function selectedRestaurant(restaurant) {
    return {
        type: 'SELECT_RESTAURANT',
        selectedRestaurant
    };
}

export function restaurantsFetchData(url) {
    return (dispatch) => {
        dispatch(restaurantsAreLoading(true));

        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(restaurantsAreLoading(false));

                return response;
            })
            .then((response) => dispatch(restaurantsFetchDataSuccess(response.data)))
            .catch(() => dispatch(restaurantsHaveError(true)));
    };
}

export function dishesHaveError(bool) {
    return {
        type: 'DISHES_HAVE_ERROR',
        hasError: bool
    };
}

export function dishesAreLoading(bool) {
    return {
        type: 'DISHES_ARE_LOADING',
        isLoading: bool
    };
}

export function dishesFetchDataSuccess(dishes) {
    return {
        type: 'DISHES_FETCH_DATA_SUCCESS',
        dishes
    };
}

export function selectedDish(dish) {
    return {
        type: 'SELECT_DISH',
        selectedDish
    };
}

export function dishesFetchData(url) {
    return (dispatch) => {
        dispatch(dishesAreLoading(true));

        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }

                dispatch(dishesAreLoading(false));

                return response;
            })
            .then((response) => dispatch(dishesFetchDataSuccess(response.data)))
            .catch(() => dispatch(dishesHaveError(true)));
    };
}

export const addRating = (rating, dish_id) => {
  return dispatch => {
    console.log( "addRating action called")
    dispatch(addRatingStarted());

    axios
      .post(`http://localhost:3000/api/v1/reviews/`, {
        rating,
        dish_id,
        // restaurant_id,
      })
      .then(res => {
        dispatch(addRatingSuccess(res.data));
      })
      .catch(err => {
        dispatch(addRatingFailure(err.message));
      });
  };
}

export const addReview = (dish_id, more_salty, neutral_salty, less_salty, more_spicy, neutral_spicy, less_spicy, more_sweet, neutral_sweet, less_sweet, more_portion, neutral_portion, less_portion) => {
  return dispatch => {
    console.log( "addReview action called")
    dispatch(addReviewStarted());

    axios
      .post(`http://localhost:3000/api/v1/reviews/`, {
        dish_id,
        // restaurant_id,
        more_salty,
        neutral_salty,
        less_salty,
        more_spicy,
        neutral_spicy,
        less_spicy,
        more_sweet,
        neutral_sweet,
        less_sweet,
        more_portion,
        neutral_portion,
        less_portion,
        completed: false,
      })
      .then(res => {
        dispatch(addReviewSuccess(res.data));
      })
      .catch(err => {
        dispatch(addReviewFailure(err.message));
      });
  };
};

const addReviewSuccess = review => ({
  type: 'ADD_REVIEW_SUCCESS',
  payload: {
    ...review
  }
});

const addReviewStarted = () => ({
  type: 'ADD_REVIEW_STARTED'
});

const addReviewFailure = error => ({
  type: 'ADD_REVIEW_FAILURE',
  payload: {
    error
  }
});

const addRatingSuccess = review => ({
  type: 'ADD_REVIEW_SUCCESS',
  payload: {
    ...review
  }
});

const addRatingStarted = () => ({
  type: 'ADD_REVIEW_STARTED'
});

const addRatingFailure = error => ({
  type: 'ADD_REVIEW_FAILURE',
  payload: {
    error
  }
});

export const addRestaurant = (name) => {
  return dispatch => {
    console.log( "addRestaurant action called")
    dispatch(addRestaurantStarted());

    axios
      .post(`http://localhost:3000/api/v1/restaurants/`, {
        name,
        completed: false
      })
      .then(res => {
        dispatch(addRestaurantSuccess(res.data));
      })
      .catch(err => {
        dispatch(addRestaurantFailure(err.message));
      });
  };
};

const addRestaurantSuccess = restaurant => ({
  type: 'ADD_RESTAURANT_SUCCESS',
  payload: {
    ...restaurant
  }
});

const addRestaurantStarted = () => ({
  type: 'ADD_RESTAURANT_STARTED'
});

const addRestaurantFailure = error => ({
  type: 'ADD_RESTAURANT_FAILURE',
  payload: {
    error
  }
});
