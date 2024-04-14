import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country, State, City } from "country-state-city";

const AddressPage = ({ setCurrent, setIsPayment }) => {
    const [user, setUser] = useState()
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        streetAddress: '',
        city: '',
        state: '',
        country: '',
        postalcode: '',
    });
    const address_local = JSON.parse(localStorage.getItem("address"));
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const addAddress = () => {
        localStorage.setItem("address", JSON.stringify(formData));
        setIsVisible(false);
        setUser(formData)
        setFormData({
            streetAddress: '',
            city: '',
            state: '',
            country: '',
            postalcode: '',
        })

    }
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const fetchData = async () => {

        try {
            localStorage.removeItem("address");
            const id = localStorage.getItem("id");
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/user/profile/${id}`);
            setUser({
                streetAddress: response.data.user.streetAddress,
                city: response.data.user.city,
                state: response.data.user.state,
                country: response.data.user.country,
                postalcode: response.data.user.postalcode,
            });

        } catch (error) {
            console.log(error);
        }
    };
    const handleNextPage = () => {
        setCurrent(2);
        setIsPayment(true);
    }
    useEffect(() => {
        const address = JSON.parse(localStorage.getItem("address"));
        if (address) {
            setUser(address);
        }
        else {
            fetchData();
        }
    }, []);
    return (
        (
            <div className={`bg-gray-100 min-h-[70vh] grid ${isVisible ? "lg:grid-cols-2" : "lg:grid-cols-1 w-full"} justify-center items-center`}>
                <div className={` ${!isVisible ? "lg:mx-[450px]" : "lg:mx-[100px]"} p-6 bg-white rounded-lg shadow-md text-center mt-8`}>
                    <h1 className="text-3xl font-semibold mb-4">Your Current Address</h1>
                    <p className="text-lg mb-4 text-left">
                        <span className="font-semibold">Street Address:</span> {user?.streetAddress}<br />
                        <span className="font-semibold">City:</span> {user?.city}<br />
                        <span className="font-semibold">State:</span> {user?.state}<br />
                        <span className="font-semibold">Country:</span> {user?.country}<br />
                        <span className="font-semibold">Postal Code:</span> {user?.postalcode}
                    </p>
                    {address_local && <button onClick={() => fetchData()} disabled={isVisible}>
                        Use default Address
                    </button>}
                    <div className='gap-3 grid grid-cols-2'>
<a href='#address'>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                            onClick={() => setIsVisible(true)}
                        >
                            Change Address
                        </button>
                        </a>
                        <button
                            className={`${isVisible?"bg-gray-200":"bg-blue-500"}  text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50`}
                            onClick={handleNextPage}
                            disabled={isVisible}
                        >
                            Proceed to Payment
                        </button>
                    </div>
                </div>
                <div>
                    {isVisible && <>

                        <div id="address" className="max-w-lg p-2 bg-white rounded-lg shadow-md mt-8 max-h-[300px] overflow-auto">
                            <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 grid items-center justify-center w-full">
                                <h2 className="text-xl font-bold mb-4">Enter delivery address</h2>
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
                                </div><br></br>
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
                                </div><br></br>
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
                                        placeholder="Enter Postalcode"
                                        value={formData?.postalcode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-3'>
                                    <button className={`bg-blue-500 text-white rounded-md px-4 py-2`} onClick={addAddress}>Save Changes</button>
                                    <button className={`bg-red-500 text-white rounded-md px-4 py-2`} onClick={() => setIsVisible(false)}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </>

                    }
                </div>
            </div>
        )
    );
}

export default AddressPage;