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

const initialRatingState = {
  loading: false,
  dish_id: '',
  rating: '',
  error: null,
};

const initialReviewState = {
  dish_id: '',
  more_salty: '',
  neutral_salty: '',
  less_salty: '',
  more_spicy: '',
  neutral_spicy: '',
  less_spicy: '',
  more_sweet: '',
  neutral_sweet: '',
  less_sweet: '',
  more_portion: '',
  neutral_portion: '',
  less_portion: '',
}

export function ratingsReducer(state = initialRatingState, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_RATING_STARTED':
      return {
        ...state,
        loading: true
      };
    case 'ADD_RATING_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        ratings: [...state.ratings, action.payload]
      };
    case 'ADD_RATING_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export function reviewsReducer(state = initialReviewState, action) {
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
