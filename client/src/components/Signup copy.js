import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import axios from 'axios';

const Signup = () => {
  const data = require("./data.json");
  const statesData = require("./states.json");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    phonenumber: "",
    country: "",
    address: "",
    city: "",
    region: "",
    postalcode: "",
    password: "",
    confirmpassword: "",
  });

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Validate form data
    const isValid = validate();
    
    if (isValid) { // Proceed if form data is valid
      try {
        // Send POST request to register user
        const response = await axios.post(
          'http://localhost:5000/api/v1/user/register',
          FormData
        );
  
        console.log(response.data);
        alert("Registration successful!");
        if(response.data.status === "success") {
          // Clear form data after successful registration
          setFormData({
            name: "",
            email: "",
            phonenumber: "",
            country: "",
            address: "",
            city: "",
            region: "",
            postalcode: "",
            password: "",
            confirmpassword: "",
          });
          setErrors({});
        }
  
        // Clear errors
      } catch (error) {
        console.log(error);
        alert("Failed!");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });

    if (name === "confirmpassword") {
      if (FormData.password) { // Check if password field has a value
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateField(name, value, FormData.password),
        }));
      } else {
        // Clear the confirm password error if passwords match
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
  };

  const validate = () => {
    let isValid = true;
    for (const key in FormData) {
      const fieldError = validateField(key, FormData[key]);
      setErrors((prevErrors) => ({ ...prevErrors, [key]: fieldError }));
      if (fieldError) isValid = false;
    }
    return isValid;
  };

const validateField = (fieldName, value, password) => {
    const name_regx = /^[a-zA-Z.\-_]{1,30}$/;
    const email_regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone_regx = /^\d{10}$/;
    const password_regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const postalcode_regx = /^\d{5}$/;
    let error = "";
  
    if (fieldName === "name") {
      if (!value.trim()) error = "Name cannot be empty";
      else if (!name_regx.test(value))
        error = "Only alphabets, dots, hyphens, and underscores are allowed";
    } else if (fieldName === "email") {
      if (!value.trim()) error = "Email cannot be empty";
      else if (!email_regx.test(value)) error = "Invalid email format";
    } else if (fieldName === "phonenumber") {
      if (!value.trim()) error = "Phone number cannot be empty";
      else if (!phone_regx.test(value)) error = "Invalid phone number format";
    } else if (fieldName === "country") {
      if (!value.trim()) error = "Please select country";
    } else if (fieldName === "address") {
      if (!value.trim()) error = "Address cannot be empty";
    } else if (fieldName === "city") {
      if (!value.trim()) error = "City name cannot be empty";
    } else if (fieldName === "region") {
      if (!value.trim()) error = "Please select state";
    } else if (fieldName === "postalcode") {
      if (!value.trim()) error = "Postal code cannot be empty";
      else if (!postalcode_regx.test(value))
        error = "Invalid postal code format";
    } else if (fieldName === "password") {
      if (!value.trim()) error = "Password is required";
      else if (!password_regx.test(value))
        error =
          "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long";
    } else if (fieldName === "confirmpassword") {
      if (!value.trim()) return ""; // Clear previous errors
      else if (value.trim() !== password.trim()) return "Passwords do not match";
      else return ""; // Passwords match
    }
    
    return error;
  };
  

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };


  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm content-center">
          <div className="flex justify-center text-[2rem] items-center text-gray-900 ">
            <FaShoppingBag className="text-black text-3xl mr-2" />
            Quick Mart
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            {/* Conditionally render sections based on currentPage */}
            {step === 1 && (
              <div>
               <div class="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                      autoComplete="name"
                      className="block flex-1 pl-2 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-800">{errors.name}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleChange}
                    autoComplete="email"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-800">{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="relative mt-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <label htmlFor="country" className="sr-only">
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      className="h-full w-28 pl-2 rounded-md border-0 bg-transparent bg-none py-0 pl-2 pr-2 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    >
                      {data.map((country) => (
                        <option
                          key={country.phone_code}
                          value={country.phone_code}
                        >
                          {`${country.iso2 + " " + country.phone_code}`}
                        </option>
                      ))}
                    </select>
                  </div>
                  <input 
                    type="tel"
                    name="phonenumber"
                    id="phone-number"
                    autoComplete="tel"
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 pl-32 py-2 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.phonenumber && (
                  <p className="text-sm text-red-800">{errors.phonenumber}</p>
                )}
              </div>
              <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-800">{errors.password}</p>
              )}
            </div>
            
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm password
              </label>
              <input
                type="password"
                name="confirmpassword"
                onChange={handleChange}
                id="confirm-password"
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmpassword && (
                <p className="text-sm text-red-800">{errors.confirmpassword}</p>
              )}
            </div>
            <button onClick={handleNext}>Next</button>

              </div>

              
            )}

{step === 2 && (
              <div>
                <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      handleCountrySelect(e.target.value);
                      handleChange(e);
                    }}
                    value={selectedCountry}
                  >
                    <option value="">Select a country</option>
                    {data.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.country && (
                  <p className="text-sm text-red-800">{errors.country}</p>
                )}
              </div>
                               
              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  State / Province
                </label>
                <div className="mt-2">
                  <select
                    id="region"
                    name="region"
                    autoComplete="region"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => {
                      handleStateSelect(e.target.value);
                      handleChange(e);
                    }}
                    value={selectedState}
                  >
                    <option value="">Select a state</option>
                    {selectedCountry &&
                      statesData
                        .filter(
                          (state) => state.country_name === selectedCountry
                        )
                        .map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                  </select>
                  {errors.region && (
                    <p className="text-sm text-red-800">{errors.region}</p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleChange}
                    autoComplete="address-level2"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.city && (
                  <p className="text-sm text-red-800">{errors.city}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ZIP / Postal code
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postalcode"
                    onChange={handleChange}
                    id="postal-code"
                    autoComplete="postal-code"
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {errors.postalcode && (
                  <p className="text-sm text-red-800">{errors.postalcode}</p>
                )}
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="address"
                    onChange={handleChange}
                    id="street-address"
                    autoComplete="street-address"
                    className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none border border-gray-100 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.address && (
                    <p className="text-sm text-red-800">{errors.address}</p>
                  )}
                </div>
              </div>
              <button onClick={handlePrevious}>Previous</button>
              <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex justify-center w-1/2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Create an account
                </button>
              </div>
            )}

            {/* Pagination buttons */}
            
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

