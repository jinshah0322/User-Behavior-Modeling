
import { FaShoppingBag } from "react-icons/fa";
import { useState } from "react";

export default function ChangePassword() {
  const [errors, setErrors] = useState({});
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    if (name === "confirmpassword") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateField(name, value, FormData.password),
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validateField(name, value),
        }));
      }
  };

  const validateField = (filedName, value, password) => {
    const password_regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const email_regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let error = "";

    if (filedName === "email") {
      if (!value.trim()) error = "Email cannot be empty";
      else if (!email_regx.test(value)) error = "Invalid email format";
    } else if (filedName === "password") {
      if (!value.trim()) error = "Password is required";
      else if (!password_regx.test(value))
        error =
          "Password must contain at least one digit, one lowercase and one uppercase letter, and be at least 8 characters long";
    }
    if (filedName === "confirmpassword") {
      if (!value.trim()) return "Confirm password is required";
      else if (value.trim() !== password) return "Passwords do not match";
    }
    return error;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    if (isValid) {
      console.log("Form is valid. Submitting data:", FormData);
    }

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
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
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
