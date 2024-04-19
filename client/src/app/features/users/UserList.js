import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  blockUserAsync,
  unblockUserAsync,
  deleteAccountAsync,
} from "./userSlice";
import { Pagination } from "antd";
import Loader from "../../../components/Loader/Loader";

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, error, userList } = useSelector((state) => state.users);
  const [pagination, setPagination] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const displayProducts = userList.slice(skip, skip + limit);

  const handleBlockUser = (userId) => {
    dispatch(blockUserAsync(userId))
      .then(() => {
        dispatch(fetchUsersAsync());
      })
      .catch((error) => {
        console.error("Error blocking user:", error);
      });
  };

  const handleUnblockUser = (userId) => {
    dispatch(unblockUserAsync(userId))
      .then(() => {
        dispatch(fetchUsersAsync());
      })
      .catch((error) => {
        console.error("Error unblocking user:", error);
      });
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteAccountAsync(userId))
      .then(() => {
        dispatch(fetchUsersAsync());
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handlePaginationChange = (page) => {
    setPagination(page);
    setSkip((page - 1) * limit);
  };

  useEffect(() => {
    dispatch(fetchUsersAsync());
    setTotalCount(userList.length);
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : error ? (
        <div className="flex justify-center items-center">
          <p className="text-lg text-red-600">{error}</p>
        </div>
      ) : displayProducts.length > 0 ? (
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
                  <td className="px-4 py-2 flex flex-wrap justify-start items-center">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mr-2 mb-2 md:mb-0"
                      style={{ width: "100px", height: "40px" }} // Set fixed width and height
                    >
                      Delete
                    </button>
                    {user.isBlocked ? (
                      <button
                        onClick={() => handleUnblockUser(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mr-2 mb-2 md:mb-0"
                        style={{ width: "100px", height: "40px" }}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(user._id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md mr-2 mb-2 md:mb-0"
                        style={{ width: "100px", height: "40px" }}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            current={pagination}
            total={totalCount}
            pageSize={limit}
            onChange={handlePaginationChange}
            className="mt-4 flex justify-center"
          />
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
