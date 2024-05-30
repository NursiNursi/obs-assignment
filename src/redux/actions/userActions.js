import {
  FETCH_USERS,
  ADD_USER,
  DELETE_USER,
} from "../action-types/userActionTypes";

export const fetchAllUsers = (data) => {
  return {
    type: FETCH_USERS,
    payload: { data },
  };
};

export const addUser = (data) => {
  return {
    type: ADD_USER,
    payload: { data },
  };
};

export const deleteUser = (id) => {
  return {
    type: DELETE_USER,
    payload: id,
  };
};
