// Import necessary dependencies and styles
import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

// Define the Signup component
const Signup = () => {
  // const [step, setStep] = useState(1);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    password: "",
    repassword: "",
    country: "",
    state: "",
    city: "",
    postalcode: "",
    streetAddress: "",
  });

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Function to handle signup submission
  const handleSignupClick = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repassword) {
      // setStep(1);
      toast.error("Password and Re-enter Password does not match");
      return;
    }
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.phonenumber === "" ||
      formData.password === "" ||
      formData.repassword === ""
    ) {
      // setStep(1);
      toast.error("All fields are required");
      return;
    }
    if (
      formData.country === "" ||
      formData.state === "" ||
      formData.city === "" ||
      formData.postalcode === "" ||
      formData.streetAddress === ""
    ) {
      // setStep(2);
      toast.error("All fields are required");
      return;
    }
    if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        formData.email
      )
    ) {
      toast.error("Invalid Email");
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.phonenumber)) {
      toast.error("Invalid Phone Number");
      return;
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(
        formData.password
      )
    ) {
      // setStep(1);
      toast.error("Weak Password");
      return;
    }
    if (!/^[0-9]{6}$/.test(formData.postalcode)) {
      toast.error("Invalid Postal Code");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/v1/user/register`,
        formData
      );
      const data = await response;
      console.log(data);
      if (data?.data?.success === true) {
        navigate("/login");
      } else {
        toast.error(data?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-center text-3xl text-gray-900">
            <FaShoppingBag className="text-black mr-2" />

            <Link
              to="/"
              className="px-2 text-xl"
              style={{ textDecoration: "none", color: "black" }}
            >
              <h2 className="text-3xl">Quick Mart</h2>
            </Link>
          </div>
          <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
            Create an account
          </h2>

          <form className="mt-8 space-y-6">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter username"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  autoComplete="name"
                  className="block w-full border-2 border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                  className="block w-full border-2 border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Phone number
                </label>
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="phonenumber"
                    placeholder="Enter your Phone Number"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                    required
                    className="block w-full border-2 border-gray-100 rounded-md pl-12 p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <CountrySelect
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  onChange={(selectedCountry) => {
                    handleInputChange({
                      target: {
                        id: "country",
                        value: selectedCountry.name,
                      },
                    });
                    setCountryid(selectedCountry.id);
                  }}
                  value={formData.country}
                  className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeHolder="Select Country"
                />
              </div>
              <div>
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street address
                </label>
                <input
                  type="text"
                  id="streetAddress"
                  placeholder="Enter your Street Address"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  required
                  autoComplete="street-address"
                  className="block w-full border-2 border-gray-100 rounded-md  p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <CitySelect
                  countryid={countryid}
                  stateid={stateid}
                  onChange={(selectedCity) => {
                    handleInputChange({
                      target: {
                        id: "city",
                        value: selectedCity.name,
                      },
                    });
                  }}
                  id="city"
                  placeholder="Enter your City"
                  value={formData.city}
                  required
                  className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="region"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <StateSelect
                  countryid={countryid}
                  onChange={(selectedState) => {
                    setFormData({
                      ...formData,
                      state: selectedState.name, // Update formData.state with the name of the selected state
                    });
                    setstateid(selectedState.id); // Update stateid with the id of the selected state
                  }}
                  placeHolder="Select State"
                  id="state"
                  name="state"
                  autoComplete="state"
                  value={formData.state}
                  className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium text-gray-700"
                >
                  ZIP / Postal code
                </label>
                <input
                  type="text"
                  id="postalcode"
                  placeholder="Enter your Postal Code"
                  value={formData.postalcode}
                  onChange={handleInputChange}
                  required
                  autoComplete="postal-code"
                  className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                  className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="repassword"
                  placeholder="Retype your password"
                  value={formData.repassword}
                  onChange={handleInputChange}
                  required
                  className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleSignupClick}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create an account
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
