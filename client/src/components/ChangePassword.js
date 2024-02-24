import { FaShoppingBag } from "react-icons/fa";
import { useState } from "react";

export default function ChangePassword() {
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    switch (name) {
      case "email":
        error = value.trim() ? (/\S+@\S+\.\S+/.test(value) ? "" : "Invalid email address") : "Email address is required";
        break;
      case "password":
        error = value.trim() ? (value.length >= 8 ? "" : "Password must be at least 8 characters long") : "Password is required";
        break;
      case "confirmpassword":
        error = value === FormData.password ? "" : "Passwords do not match";
        break;
      default:
        break;
    }

    setFormData({ ...FormData, [name]: value });
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", FormData);
    setFormData({
      email: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm content-center">
          <div className="flex justify-center text-[2rem] items-center text-gray-900 ">
            <FaShoppingBag className="text-black text-3xl mr-2" />
            Quick Mart
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
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
                  onChange={handleChange}
                  value={FormData.email}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-sm text-red-800">{errors.email}</p>
                )}
              </div>
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
                  value={FormData.password}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-sm text-red-800">{errors.password}</p>
                )}
              </div>
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
                value={FormData.confirmpassword}
                onChange={handleChange}
                id="confirm-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.confirmpassword && (
                <p className="text-sm text-red-800">{errors.confirmpassword}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
