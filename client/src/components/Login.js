import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async() =>
  {
    if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(FormData.email))){
      toast.error('Invalid Email');
      return;
    }
 
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/login`, FormData);
        const data = await response;
        console.log(data);
        if(data?.data?.success === true){
          setFormData({
            email: "",
            password: "",
          });
          localStorage.setItem("id", data?.data?.user?._id);
          localStorage.setItem("name", data?.data?.name);
          navigate("/");
        }     
        else{
          toast.error(data?.data?.msg);
        }  
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    
    }
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...FormData, [name]: value });
  };

  useEffect(()=>{
    if(localStorage.getItem("id")){
      navigate("/");
    }
  })



  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster />
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
                  className="pl-2  border-gray-100 block outline-none w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
     
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
                    to="/forgotpassword"
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
                  className="pl-2 outline-none block w-full  border-gray-100 rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />                
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
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
