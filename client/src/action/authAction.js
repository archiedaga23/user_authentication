import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import jwt_decode from 'jwt-decode';  

export const registerUser = (data, history) => (dispatch) => {
   
    axios.post('/api/user/register', data)
      .then(res => {
        history.push('/login'); 
      })
      .catch(err => {
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
      });
};

export const loginUser = (user) => dispatch => {
    
  axios.post('/api/user/login', user)
   .then(res => {
      const { token } = res.data;

      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));

   })
   .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
   });
};

export const setCurrentUser = (decoded) => {

  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}

export const logoutUser = () => dispatch => {

    localStorage.removeItem('jwtToken');

    setAuthToken(false);
    dispatch(setCurrentUser({}))
}