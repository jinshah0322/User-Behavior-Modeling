import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async() =>
  {
    const isValid = validate();
    if(isValid) {
      try {
        await axios.post(`${process.env.REACT_APP_SERVERURL}/api/v1/user/login`, FormData);
        console.log("Login success!");
        setFormData({
          email: "",
          password: "",
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    }
  }
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const validateField = (filedName, value) => {
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

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm content-center">
          <div className="flex justify-center text-[2rem] items-center text-gray-900 ">
            <FaShoppingBag className="text-black text-3xl mr-2" />
            Quick Mart
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
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
                  className="pl-2 border border-gray-100 block outline-none w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                <div className="text-sm">
                  <Link
                    to="/fpass"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  className="pl-2 outline-none block w-full border border-gray-100 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-sm text-red-800">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/register"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
