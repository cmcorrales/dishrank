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

export const addReview = (rating, dish_id, more_salty, less_salty, more_spicy, less_spicy, more_sweet, less_sweet) => {
  return dispatch => {
    console.log( "addReview action called")
    dispatch(addReviewStarted());

    axios
      .post(`http://localhost:3000/api/v1/reviews/`, {
        rating,
        dish_id,
        more_salty,
        less_salty,
        more_spicy,
        less_spicy,
        more_sweet,
        less_sweet,
        completed: false
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
