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

const initialState = {
  loading: false,
  dish_id: '',
  error: null,
  more_salty: '',
  less_salty: '',
  more_spicy: '',
  less_spicy: '',
  more_sweet: '',
  less_sweet: '',
};

export function reviewsReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_REVIEW_STARTED':
      return {
        ...state,
        loading: true
      };
    case 'ADD_REVIEW_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        reviews: [...state.reviews, action.payload]
      };
    case 'ADD_REVIEW_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
