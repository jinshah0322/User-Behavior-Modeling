import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Country, State, City } from "country-state-city";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProfileAddress = () => {
  // const {Select} = Layout;
  const id = localStorage.getItem("id");
  const [stateSelected, setIsStateSelected] = useState(true);
  const [citySelected, setIsCitySelected] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
  });
  const [formDataone, setFormDataone] = useState({
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVERURL}/user/profile/${id}`
      );
      setFormData({
        streetAddress: response.data.user.streetAddress,
        city: response.data.user.city,
        state: response.data.user.state,
        country: response.data.user.country,
        postalcode: response.data.user.postalcode,
      });
      setFormDataone({
        streetAddress: response.data.user.streetAddress,
        city: response.data.user.city,
        state: response.data.user.state,
        country: response.data.user.country,
        postalcode: response.data.user.postalcode,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      formData.streetAddress === formDataone.streetAddress &&
      formData.city === formDataone.city &&
      formData.state === formDataone.state &&
      formData.country === formDataone.country &&
      formData.postalcode === formDataone.postalcode
    ) {
      setIsEdited(false);
    } else {
      setIsEdited(true);
    }
  }, [formData]);

  const updateProfile = async () => {
    if (
      formData.streetAddress === "" ||
      formData.city === "" ||
      formData.state === "" ||
      formData.country === "" ||
      formData.postalcode === "" ||
      !stateSelected ||
      !citySelected
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setIsLoading(true);
      setIsEdited(true);
      const response = await axios.put(
        `${process.env.REACT_APP_SERVERURL}/user/editprofile/${id}`,
        formData
      );
      console.log(response);
      if (response?.data?.status === 200) {
        fetchData();
        toast.success(response?.data?.msg);
      } else {
        toast.error(response?.data?.msg);
      }
      setIsLoading(false);
      // window.location.href = "/profile";
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    State.getStatesOfCountry(formData?.country).length > 0
      ? setIsStateSelected(true)
      : setIsStateSelected(false);
    City.getCitiesOfState(formData?.country, formData?.state).length > 0
      ? setIsCitySelected(true)
      : setIsCitySelected(false);
  }, [formData?.country, formData?.state, formData?.city]);

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      window.location.href = "/login";
    } else {
      fetchData();
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <Toaster />
      <div className="flex w-full justify-between">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item fs-3">
              <Link to="/profile">Profile</Link>
            </li>
            <li class="breadcrumb-item active fs-3" aria-current="page">
              Your Address
            </li>
          </ol>
        </nav>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : formData ? (
        <div className="w-full">
          <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 grid items-center justify-center w-full">
            {/* <h2 className="text-xl font-bold mb-4">Address Information</h2> */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-bold text-gray-700"
              >
                Country
              </label>
              <div>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  selected={formData.country}
                  onChange={(e) => handleInputChange(e)}
                  value={formData.country}
                  className=" w-full py-2 px-1 border-2 border-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option>Select Country</option>
                  {/* <option value="IN" selected>India</option> */}

                  {Country.getAllCountries().map((c) => {
                    return (
                      <>
                        <option key={c.isoCode} value={c.isoCode}>
                          {c.name}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
            </div>
            <br></br>
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-bold text-gray-700"
              >
                State / Province
              </label>

              <select
                id="state"
                name="state"
                autoComplete="state"
                onChange={(e) => handleInputChange(e)}
                value={formData.state}
                className=" w-full border-2 py-2 px-1 border-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {formData?.country ? (
                  State.getStatesOfCountry(formData?.country).map((s) => {
                    return (
                      <>
                        <option key={s.isoCode} value={s.isoCode}>
                          {s.name}
                        </option>
                      </>
                    );
                  })
                ) : (
                  <option value="">Select State</option>
                )}
              </select>
            </div>
            <br></br>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-bold text-gray-700"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                autoComplete="city"
                onChange={(e) => handleInputChange(e)}
                value={formData.city}
                className="w-full border-2 py-2 px-1 border-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {formData.country && formData.state ? (
                  <>
                    {City.getCitiesOfState(
                      formData.country,
                      formData.state
                    ).map((city) => (
                      <option key={city.isoCode} value={city.isoCode}>
                        {city.name}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">Select City</option>
                )}
              </select>
            </div>
            <br></br>
            <div className="mb-4">
              <p className="text-gray-700 text-sm font-bold">Street Address:</p>
              <input
                type="text"
                name="streetAddress"
                id="streetAddress"
                className="w-full outline-none border px-3 py-1 mt-1 w-[300px] rounded-md"
                placeholder="Enter your Street Address"
                value={formData?.streetAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <p className="text-gray-700 text-sm font-bold">Postal Code:</p>
              <input
                type="text"
                id="postalcode"
                name="postalcode"
                className="w-full outline-none border px-3 py-1 mt-1 w-[300px] rounded-md"
                placeholder="Enter your Country"
                value={formData?.postalcode}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <button
                disabled={!isEdited}
                className={`${
                  !isEdited ? "bg-gray-200" : "bg-green-500 "
                } text-white rounded-md px-4 py-2`}
                onClick={updateProfile}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProfileAddress;
