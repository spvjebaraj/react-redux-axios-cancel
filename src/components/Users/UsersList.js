import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

import * as userActions from "../../store/actions/users";
import Sidebar from "../Sidebar/Sidebar";

const UsersList = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const cancelMessage = useSelector((state) => state.users.message);
  const users = useSelector((state) => state.users.availableUsers);
  const dispatch = useDispatch();

  const loadUsers = useCallback(async () => {
    try {
      await dispatch(userActions.fetchUsers());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      loadUsers().then(() => {
        setIsLoading(false);
      });
    }, 2000);

    return () => {
      dispatch(userActions.cancelRequest());
    };
  }, [setIsLoading, loadUsers, dispatch]);

  if (isLoading) {
    return (
      <div>
        <Sidebar />
        <div className="center">
          <ReactLoading type="spin" color="#3f51b5" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Sidebar />
      <div className="main">
        {users && users.length > 0 ? (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name}, {user.email}
              </li>
            ))}
          </ul>
        ) : (
          <h1>No user found.</h1>
        )}
      </div>
    </div>
  );
};

export default UsersList;
