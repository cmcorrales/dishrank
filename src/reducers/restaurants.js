// import {SEARCH} from '../actions/restaurants';


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

export function dishesHaveError(state = false, action) {
    switch (action.type) {
        case 'DISHES_HAVE_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

export function dishesAreLoading(state = false, action) {
    switch (action.type) {
        case 'DISHES_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function dishes(state = [], action) {
    switch (action.type) {
        case 'DISHES_FETCH_DATA_SUCCESS':
            return action.dishes;
        case "ADD_DISH_SUCCESS":
            return [...state, action.payload]
        default:
            return state;
    }
}

export function selectedDish(state=[], action) {
  switch (action.type) {
    case 'SELECT_DISH':
        return {...state, selectedDish: action.payload};
    default:
        return state;
  }
}


const initialRatingState = {
  loading: false,
  // restaurant_id: '',
  dish_id: '',
  rating: '',
  error: null,
};

const initialReviewState = {
  dish_id: '',
  dish_name: '',
  // restaurant_id: '',
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
  reviews: [],
}

const initialDishState = {
  name: '',
  restaurant_id: ''
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

const initialRestaurantState = {
  name: [],
}

export function restaurantsReducer(state = [initialRestaurantState], action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_RESTAURANT_STARTED':
      return {
        ...state,
        loading: true
      };
    case 'ADD_RESTAURANT_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        restaurants: [...state.restaurants, action.payload]
      };
    case 'ADD_RESTAURANT_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}

//addDishes reducer
export function dishesReducer(state = initialDishState, action) {
  console.log(action)
  switch (action.type) {
    case 'ADD_DISH_STARTED':
      return {
        ...state,
        loading: true
      };
    /*case 'ADD_DISH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        dishes: [...state.dishes, action.payload]
      };*/
    case 'ADD_DISH_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}



// const initialSearchState = {
//   restaurants: [],
//   value: '',
// };

// export function searchReducer(state = initialSearchState, action) {
//   switch(action.type) {
//     case 'SEARCH': {
//       // const restaurants = state.restaurants.filter((val) => val.includes(value));
//       return {...state, restaurants};
//     }
//     default:
//       return state;
//   }
// }
