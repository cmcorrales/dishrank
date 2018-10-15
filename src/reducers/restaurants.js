export function restaurantsHaveError(state = false, action) {
    switch (action.type) {
        case 'RESTAURANTS_HAVE_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

export function restaurantsAreLoading(state = false, action) {
    switch (action.type) {
        case 'RESTAURANTS_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function restaurants(state = [], action) {
    switch (action.type) {
        case 'RESTAURANTS_FETCH_DATA_SUCCESS':
            return action.restaurants;
        default:
            return state;
    }
}

export function selectedRestaurant(state=[], action) {
  switch (action.type) {
    case 'SELECT_RESTAURANT':
        return {...state, selectedRestaurant: action.payload};
    default:
        return state;
  }
}
