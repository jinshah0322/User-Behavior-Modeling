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

    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-center text-3xl text-gray-900">
          <FaShoppingBag className="text-black mr-2" />
          Quick Mart
        </div>
        <h2 className="mt-6 text-center text-xl font-semibold text-gray-900">
          Create an account
        </h2>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                onChange={handleChange}
                autoComplete="name"
                className="block w-full border-2 border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                // className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {errors.name && (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                autoComplete="email"
                  className="block w-full border-2 border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
               
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
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
                  type="tel"
                  name="phonenumber"
                  id="phone-number"
                  autoComplete="tel"
                  onChange={handleChange}
                  className="block w-full border-2 border-gray-100 rounded-md pl-12 p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.phonenumber && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.phonenumber}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                autoComplete="country-name"
                onChange={(e) => {
                  handleCountrySelect(e.target.value);
                  handleChange(e);
                }}
                value={selectedCountry}
                className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

                // className="mt-1 block w-full bg-white border-2 border-gray-100 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select a country</option>
                {data.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-2 text-sm text-red-600">{errors.country}</p>
              )}
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
                name="address"
                onChange={handleChange}
                id="street-address"
                autoComplete="street-address"
                className="block w-full border-2 border-gray-100 rounded-md  p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              />
              {errors.address && (
                <p className="mt-2 text-sm text-red-600">{errors.address}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                onChange={handleChange}
                autoComplete="address-level2"
                className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              />
              {errors.city && (
                <p className="mt-2 text-sm text-red-600">{errors.city}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="region"
                className="block text-sm font-medium text-gray-700"
              >
                State / Province
              </label>
              <select
                id="region"
                name="region"
                autoComplete="region"
                onChange={(e) => {
                  handleStateSelect(e.target.value);
                  handleChange(e);
                }}
                value={selectedState}
                className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              >
                <option value="">Select a state</option>
                {selectedCountry &&
                  statesData
                    .filter((state) => state.country_name === selectedCountry)
                    .map((state) => (
                      <option key={state.name} value={state.name}>
                        {state.name}
                      </option>
                    ))}
              </select>
              {errors.region && (
                <p className="mt-2 text-sm text-red-600">{errors.region}</p>
              )}
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
                name="postalcode"
                onChange={handleChange}
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              />
              {errors.postalcode && (
                <p className="mt-2 text-sm text-red-600">{errors.postalcode}</p>
              )}
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
                onChange={handleChange}
                autoComplete="current-password"
                className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
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
                name="confirmpassword"
                onChange={handleChange}
                id="confirm-password"
                className="block w-full border-2 bg-white border-gray-100 rounded-md p-3 py-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

              />
              {errors.confirmpassword && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.confirmpassword}
                </p>
              )}
            </div>
          </div>

          {/ Submit Button /}
          <div>
            <button
              type="submit"
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
 

 import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function App() {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <div>
      <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
    </div>
  );
}