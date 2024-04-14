import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersAsync, blockUserAsync, unblockUserAsync, deleteAccountAsync } from "./userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, error, userList } = useSelector((state) => state.users); 

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  const handleBlockUser = (userId) => {
    dispatch(blockUserAsync(userId));
  };

  const handleUnblockUser = (userId) => {
    dispatch(unblockUserAsync(userId));
  };
  
  const handleDeleteUser = (userId) => {
    dispatch(deleteAccountAsync(userId))
      .then(() => {
        dispatch(fetchUsersAsync()); // Fetch users again after deletion
      })
      .catch((error) => {
        // Handle error if deletion fails
      });
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-700">Loading...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : userList.length > 0 ? (
        <>
          <h2 className="mt-4 text-xl font-semibold">User List</h2>

          <table className="w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((user, index) => (
                <tr key={user._id} className="text-gray-700">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phonenumber}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Delete
                    </button>
                    {user.isBlocked ? (
                      <button
                        onClick={() => handleUnblockUser(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-center">
            <p className="text-4xl text-gray-700 font-bold mb-4">Oops!</p>
            <p className="text-lg text-red-600">No records found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
