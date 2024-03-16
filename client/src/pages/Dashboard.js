import React, { useState } from "react";
import { Link } from 'react-router-dom';
import CategoryList from "../app/features/category/CategoryList";
import LandingPage from "../components/LandingPage";

const Dashboard = () => {
  const [selectedLink, setSelectedLink] = useState("LandingPage");

  const handleLinkClick = (link) => {
    setSelectedLink(link === 'Quickmart' ? 'LandingPage' : link);
  };

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
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "Category" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("Category")}
            >
              Category
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "create" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("create")}
            >
              Register New Employee
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "get" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("get")}
            >
              Get All Employee
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "update" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("update")}
            >
              Update Employee Data
            </li>
            <li
              className={`cursor-pointer px-6 py-2 ${
                selectedLink === "delete" && "bg-gray-200"
              }`}
              onClick={() => handleLinkClick("delete")}
            >
              Delete Employee
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
