import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryList from "../app/features/category/CategoryList";
import LandingPage from "../components/LandingPage";
import AddProduct from "../app/features/product/AddProduct";
import UpdateProduct from "../app/features/product/UpdateProduct";
import GetProduct from "../app/features/product/GetProduct";
import DeleteProduct from "../app/features/product/DeleteProduct";
import UserList from "../app/features/users/UserList";
import { IoMdLogOut, IoMdMenu } from "react-icons/io";

const Dashboard = () => {
  const [selectedLink, setSelectedLink] = useState("LandingPage");
  const [sidebarOpen, setSidebarOpen] = useState(false); 

  const handleLinkClick = (link) => {
    setSelectedLink(link);
    if (window.innerWidth < 768) {
      setSidebarOpen(false); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 md:relative md:block`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-100 border-b border-gray-200">
          <Link
            to="/dashboard"
            className="text-2xl font-bold text-gray-900 no-underline"
            onClick={() => handleLinkClick("LandingPage")}
          >
            Quickmart
          </Link>
        </div>
        <div className="md:overflow-y-auto">
          <ul className="py-4">
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "Category" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("Category")}
            >
              Category
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "Users" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("Users")}
            >
              Users
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "AddProduct" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("AddProduct")}
            >
              Add New Product
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "GetProduct" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("GetProduct")}
            >
              Get All Product
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "UpdateProduct" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("UpdateProduct")}
            >
              Update Product Details
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "DeleteProduct" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("DeleteProduct")}
            >
              Delete Product
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "Logout" && "bg-gray-200"
              }`}
              onClick={handleLogout}
            >
              <div className="flex items-center">
                <IoMdLogOut className="w-6 h-6 mr-2" />
                Logout
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed top-0 left-0 z-50 p-4"
        onClick={toggleSidebar}
      >
        <IoMdMenu className="w-8 h-8" />
      </button>

      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          {selectedLink === "LandingPage" && (
            <LandingPage className="bg-blue-200" />
          )}
          {selectedLink === "Category" && (
            <CategoryList className="bg-blue-200" />
          )}
          {selectedLink === "AddProduct" && (
            <AddProduct className="bg-blue-200" />
          )}
          {selectedLink === "UpdateProduct" && (
            <UpdateProduct className="bg-blue-200" />
          )}
          {selectedLink === "GetProduct" && (
            <GetProduct className="bg-blue-200" />
          )}
          {selectedLink === "DeleteProduct" && (
            <DeleteProduct className="bg-blue-200" />
          )}
          {selectedLink === "Users" && <UserList className="bg-blue-200" />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;