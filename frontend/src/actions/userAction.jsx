import axiosAPI from "./axiosInstance";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    CLEAR_ERRORS,
  } from "../constants/userConstants";


import axios from "axios";

//login
export const login = (email, password) => async(dispatch) =>{
    try{
        dispatch({type: LOGIN_REQUEST });

        const config = { headers : {"Content-Type": "application/json"}};

        const {data} = await axiosAPI.post(
            `/api/v1/login`,
            {email,password},
            config
        )
       
        dispatch({ type: LOGIN_SUCCESS, payload: data.user});

    }
    catch(error){
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
};


//google login
import { auth, provider } from "../Firebase"; // adjust if needed
import { signInWithPopup } from "firebase/auth";

export const googleLogin = () => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // Sign in with popup
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const idToken = await user.getIdToken();
    const name = user.displayName;
    const email = user.email;
    const uid = user.uid;

    console.log("Sending to backend:", { name, email, uid, idToken });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosAPI.post(
      `/api/v1/google/login`,
      { name, email, uid, idToken },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};



//register
export const register = (userData) => async(dispatch) =>{
    try{
        dispatch({type: REGISTER_USER_REQUEST });

        const config = { headers : {"Content-Type": "multipart/form-data"}};

        const {data} = await axiosAPI.post(
            `/api/v1/register`,
            userData,
            config
        )
        
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user});
    }
    catch(error){
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
};


// Loaduser
export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });
  
      const { data } = await axiosAPI.get(`/api/v1/me`);
  
      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };

// Logout user
export const logout = () => async (dispatch) => {
    try {

      await axiosAPI.get(`/api/v1/logout`);
  
      dispatch({ type: LOGOUT_SUCCESS  });
    } catch (error) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };
  


//update password
export const updatePassword = (password) => async(dispatch) =>{
  try{
      dispatch({type: UPDATE_PASSWORD_REQUEST });

      const config = { headers : {"Content-Type": "application/json"}};

      const {data} = await axiosAPI.put(
          `/api/v1/password/update`,
          password,
          config
      )
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success});
  }
  catch(error){
      dispatch({ type: UPDATE_PASSWORD_FAIL, 
      payload: error.response.data.message 
    });
  }
};


//forgot password
export const forgotPassword = (email) => async(dispatch) =>{
  try{
      dispatch({type: FORGOT_PASSWORD_REQUEST });

      const config = { headers : {"Content-Type": "application/json"}};

      const {data} = await axiosAPI.post(
          `/api/v1/password/forgot`,
          email,
          config
      )
      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.user});

  }
  catch(error){
      dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};




//RESET password
export const resetPassword = (token, passwords) => async(dispatch) =>{
  try{
      dispatch({type: RESET_PASSWORD_REQUEST });

      const config = { headers : {"Content-Type": "application/json"}};

      const {data} = await axiosAPI.put(
          `/api/v1/password/reset/${token}`,
          passwords,
          config
      )
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success});

  }
  catch(error){
      dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
  }
};



// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_USERS_REQUEST });
      const { data } = await axiosAPI.get(`/api/v1/admin/users`);
  
      dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
      dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
  };

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axiosAPI.get(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
  };
  
  // Update User
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axiosAPI.put(
        `/api/v1/admin/user/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  
  // Delete User
  export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axiosAPI.delete(`/api/v1/admin/user/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  



//clearing errors//

export const clearErrors = ()=> async(dispatch)=>{
    dispatch({type: CLEAR_ERRORS});
};



