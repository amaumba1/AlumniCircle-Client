import axios from 'axios';
import jwt_decode from 'jwt-decode'; 

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER} from './types';


// Register User 
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(error => 
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        )
}

// Login - get user token
export const loginUser = userData => dispatch => {

       axios.post('/api/users/login', userData)
        .then(result => {
            // Save to localStorage
            const { token } = result.data; 

            // Set token in local storage
            localStorage.setItem('jwtToken', token);

            // Set token to Auth header (this function it will be in utils folder)
            setAuthToken(token);

            // Decode token to get user data
            const decoded = jwt_decode(token);

            // Set current user
            dispatch(setCurrentUser(decoded));

        })
        .catch(error => {
            dispatch({
                type: GET_ERRORS,
                payload: error.response.data
            })
        })
}

// Set logged in User 
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}