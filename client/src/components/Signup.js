// Import necessary dependencies and styles
import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// Define the Signup component
const Signup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const statesData = require("./states.json");
  const data = require("./data.json");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenumber: '',
    password: '',
    repassword: '',
    country: '',
    state: '',
    city: '',
    postalcode: '',
    streetAddress: ''
  });

  const handleNextClick = () => {
    setStep((prevStep) => prevStep + 1);
  };

  // Function to handle moving back to the previous step
  const handleBackClick = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

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
      setStep(1);
      toast.error('Password and Re-enter Password does not match');      
      return;
    }
    if (formData.name === '' || formData.email === '' || formData.phonenumber === '' || formData.password === '' || formData.repassword === '') {
      setStep(1);
      toast.error('All fields are required');
      return;
    }
    if (formData.country === '' || formData.state === '' || formData.city === '' || formData.postalcode === '' || formData.streetAddress === '') {
      setStep(2);
      toast.error('All fields are required');
      return;
    }
    if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(formData.email))){
      toast.error('Invalid Email');
      return;
    }
    if(!(/^[0-9]{10}$/.test(formData.phonenumber))){
      toast.error('Invalid Phone Number');
      return;
    }
    if(!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(formData.password))){
      setStep(1);
      toast.error('Weak Password');
      return;
    }
    if(!(/^[0-9]{6}$/.test(formData.postalcode))){
      toast.error('Invalid Postal Code');
      return;
    }    

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/user/register`, formData);
      const data = await response;
      console.log(data);
      if (data?.data?.success === true) {
        navigate("/login");
      }
      else{
        toast.error(data?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Main content of the Signup component */}
      <div className="flex justify-center items-center w-full min-h-screen bg-white">
        <Toaster />
        <div className="lg:w-1/2 p-4 bg-white rounded-md ">
          <h1 className="text-3xl font-medium text-gray-800">Sign up</h1>
          <form className="mt-4">
            {/* Form fields */}
            {/* Step 1 */}
            {step === 1 && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700">
                    Your Phone Number
                  </label>
                  <input
                    type="text"
                    id="phonenumber"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your Phone Number"
                    value={formData.phonenumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Your Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="repassword" className="block text-sm font-medium text-gray-700">
                    Your Password
                  </label>
                  <input
                    type="password"
                    id="repassword"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Retype your password"
                    value={formData.repassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <br></br>
                <button
                  type="button"
                  onClick={handleNextClick}
                  className="float-right bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                >
                  Next
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Conutry
                  </label>
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    onChange={handleInputChange}
                    value={formData.country}
                  >
                    <option value="">Select a country</option>
                    {data.map((country) => (
                      <option key={country.name} value={country.name}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    Your State
                  </label>
                  <select
                    id="state"
                    name="state"
                    autoComplete="state"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    onChange={handleInputChange}
                    value={formData.state}
                  >
                    <option value="">Select a state</option>
                    {formData.country &&
                      statesData
                        .filter(
                          (state) => state.country_name === formData.country
                        )
                        .map((state) => (
                          <option key={state.name} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    Your City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700">
                    Your Street Address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your Street Address"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="postalcode" className="block text-sm font-medium text-gray-700">
                    Your Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalcode"
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter your Postal Code"
                    value={formData.postalcode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={handleSignupClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
                  >
                    Signup
                  </button>
                </div>
              </>

            )}


          </form>
          {/* Navigation links */}
          <div className="mt-4">
            <a href="/login" passHref>
              <p className="text-blue-500 hover:underline inline-block">Back to Login</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
