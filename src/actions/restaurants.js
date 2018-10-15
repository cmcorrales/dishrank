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
