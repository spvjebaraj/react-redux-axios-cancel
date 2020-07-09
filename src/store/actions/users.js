import axios from "axios";

export const GET_USERS = "GET_USERS";
export const CANCEL_REQUEST = "CANCEL_REQUEST";

const source = axios.CancelToken.source();

const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users",
        {
          cancelToken: source.token,
        }
      );

      if (response.status !== 200) {
        throw new Error("Something went wrong, while fetching the users!");
      }

      dispatch({ type: GET_USERS, users: response.data });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log(err.message);
      } else {
        throw err;
      }
    }
  };
};

const cancelRequest = () => {
  return (dispatch) => {
    if (source !== typeof undefined) {
      source.cancel("Operation canceled by the user");
      dispatch({
        type: CANCEL_REQUEST,
        message: "Request canceled by the user!",
      });
    }
  };
};

export { fetchUsers, cancelRequest };
