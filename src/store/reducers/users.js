import { GET_USERS, CANCEL_REQUEST } from "../actions/users";

const initialState = {
  availableUsers: [],
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        availableUsers: action.users,
      };
    case CANCEL_REQUEST:
      return {
        message: action.message,
      };
    default:
      return state;
  }
};
