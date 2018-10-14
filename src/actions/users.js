import axios from 'axios';

export function usersPostData(url) {
    return (dispatch) => {
        axios.post(url)
            .then((response) => {
                return response;
            })
            .then((response) => dispatch(usersFetchDataSuccess(response.data)))
    };
}
