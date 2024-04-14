import React, { useState } from "react";
import { Link } from 'react-router-dom';
import CategoryList from "../app/features/category/CategoryList";
import LandingPage from "../components/LandingPage";
import AddProduct from "../app/features/product/AddProduct";
import UpdateProduct from "../app/features/product/UpdateProduct";
import GetProduct from "../app/features/product/GetProduct";
import DeleteProduct from "../app/features/product/DeleteProduct";
import UserList from "../app/features/users/UserList";

const Dashboard = () => {
  const [selectedLink, setSelectedLink] = useState("LandingPage");

  const handleLinkClick = (link) => {
    setSelectedLink(link === 'Quickmart' ? 'LandingPage' : link);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="flex items-center justify-center h-16 bg-gray-100 border-b border-gray-200">
          <Link to='/dashboard' className="text-2xl font-bold text-gray-900 no-underline" onClick={() => handleLinkClick('Quickmart')}>
            Quickmart
          </Link>
        </div>
        <div className="overflow-y-auto">
          <ul className="py-4">
            <li
              className={`cursor-pointer px-6 py-2 ${selectedLink === "Category" && "bg-gray-200"
                }`}
              onClick={() => handleLinkClick("Category")}
            >
              Category
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "users" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("users")}
            >
              Users
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "create" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("create")}
            >
              Add New Product
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${selectedLink === "get" && "bg-gray-200"
                }`}
              onClick={() => handleLinkClick("get")}
            >
              Get All Product
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${selectedLink === "update" && "bg-gray-200"
                }`}
              onClick={() => handleLinkClick("update")}
            >
              Update Product Details
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${selectedLink === "delete" && "bg-gray-200"
                }`}
              onClick={() => handleLinkClick("delete")}
            >
              Delete Product
            </li>
            <li
             className={`cursor-pointer px-6 py-2 `}
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          {selectedLink === "LandingPage" && (
            <LandingPage className="bg-blue-200" />
          )}
          {selectedLink === "Category" && (
            <CategoryList className="bg-blue-200" />
          )}
          {selectedLink === "create" && (
            <AddProduct className="bg-blue-200" />
          )}
          {selectedLink === "update" && (
            <UpdateProduct className="bg-blue-200" />
          )}
          {selectedLink === "get" && (
            <GetProduct className="bg-blue-200" />
          )}
          {selectedLink === "delete" && (
            <DeleteProduct className="bg-blue-200" />
          )}
          {selectedLink === "users" && (
            <UserList className="bg-blue-200" /> 
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
