import { FETCH_USERS, ADD_USER } from "../action-types/userActionTypes";

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
