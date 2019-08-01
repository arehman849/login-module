import axios from 'axios';
const LOGIN_PENDING = "LOGIN_PENDING",
      LOGIN_SUCCESS = "LOGIN_SUCCESS",
      LOGIN_ERROR = "LOGIN_ERROR";

export function login(email, password) {
    return dispatch => {
        dispatch(setLoginPending(true));
        dispatch(setLoginSuccess(false));
        dispatch(setLoginError(null));

        callLoginApi(email, password, error => {
            dispatch(setLoginPending(false));
            if (!error) {
                dispatch(setLoginSuccess(true));
            } else {
                dispatch(setLoginError(error));
            }
        });
    }
}

function callLoginApi(email, password, callback) {
    axios.get('http://localhost:3000/loginData.json').then(result => {
        let {data} = result;
        if (email === data.username && password === data.password) {
            return callback(null);
        } else {
            return callback(new Error('Invalid email and password'));
        }
    }).catch(e => {
        return callback(new Error('something went wrong please ry again later'));
    })
  }


function setLoginPending(isLoginPending) {
    return {
        type: LOGIN_PENDING,
        isLoginPending
    };
}

function setLoginSuccess(isLoginSuccess) {
    return {
        type: LOGIN_SUCCESS,
        isLoginSuccess
    };
}

function setLoginError(loginError) {
    return {
        type: LOGIN_ERROR,
        loginError
    }
}



export default function reducer(state = {
    isLoginSuccess: false,
    isLoginPending: false,
    loginError: null
    }, action) {
    switch (action.type) {
        case LOGIN_PENDING:
        return Object.assign({}, state, {
            isLoginPending: action.isLoginPending
        });

        case LOGIN_SUCCESS:
        return Object.assign({}, state, {
            isLoginSuccess: action.isLoginSuccess
        });

        case LOGIN_ERROR:
        return Object.assign({}, state, {
            loginError: action.loginError
        });

        default:
        return state;
    }
}