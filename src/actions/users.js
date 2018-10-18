import axios from 'axios';

export function userLoginSuccess(username) {
  return {
    type: 'USER_LOGIN_SUCCESS',
    payload: username
  };
}

export function usersHaveError(bool) {
    return {
        type: 'USERS_HAVE_ERROR',
        hasError: bool
    };
}

export function usersAreLoading(bool) {
    return {
        type: 'USERS_ARE_LOADING',
        isLoading: bool
    };
}

export function usersFetchDataSuccess(users) {
    return {
        type: 'USERS_FETCH_DATA_SUCCESS',
        users
    };
}

export function usersFetchData(url) {
    return (dispatch) => {
        dispatch(usersAreLoading(true));

        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(usersAreLoading(false));
                return response;
            })
            .then((response) => dispatch(usersFetchDataSuccess(response.data)))
            .catch(() => dispatch(usersHaveError(true)));
    };
}

export const addUser = (username, password) => {
  return dispatch => {
    console.log( "addUser action called")
    dispatch(addUserStarted());

    axios
      .post(`http://localhost:3000/api/v1/users/`, {
        username,
        password,
        completed: false
      })
      .then(res => {
        dispatch(addUserSuccess(res.data));
      })
      .catch(err => {
        dispatch(addUserFailure(err.message));
      });
  };
};

const addUserSuccess = user => ({
  type: 'ADD_USER_SUCCESS',
  payload: {
    ...user
  }
});

const addUserStarted = () => ({
  type: 'ADD_USER_STARTED'
});

const addUserFailure = error => ({
  type: 'ADD_USER_FAILURE',
  payload: {
    error
  }
});
