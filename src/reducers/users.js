const initialUserState = {
  users: [],
  username: '',
  password: '',
}

export function usersHaveError(state = false, action) {
    switch (action.type) {
        case 'USERS_HAVE_ERROR':
            return action.hasError;

        default:
            return state;
    }
}

export function usersAreLoading(state = false, action) {
    switch (action.type) {
        case 'USERS_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function users(state = initialUserState, action) {
    switch (action.type) {
        case 'USERS_FETCH_DATA_SUCCESS':
            return action.users;

        default:
            return state;
    }
}

export function userLoginSuccess(state = initialUserState, action) {
    switch (action.type) {
        case 'USERS_LOGIN_SUCCESS':
            return action.users;

        default:
            return state;
    }
}
