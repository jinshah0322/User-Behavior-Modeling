
import { useState } from "react";
import {toast,Toaster} from 'react-hot-toast';
import axios from 'axios';
export default function ChangePassword() {
  const [FormData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...FormData,
      [e.target.id]: e.target.value,
    });
  };

    
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = localStorage.getItem("id");
    
    try{
        const response = await axios.post(`http://localhost:5000/api/v1/user/changepassword`, {_id:id,oldPassword:FormData.oldPassword,newPassword:FormData.newPassword});
        const data = await response;
        if(data?.data?.success === true){
          setFormData({
            oldPassword: "",
            newPassword: "",
          });
          toast.success(data?.data?.message);
        }
        else{
          toast.error(data?.data?.message);
        }
        console.log(data);
    }
    catch(error){
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm content-center">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Change Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
           
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                 Old Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="oldPassword"
                  name="password"
                  value={FormData.oldPassword}
                  onChange={handleChange}
                  type="password"
                  autoComplete="current-password"
                  className="pl-2 outline-none block border border-gray-100 w-full rounded-md py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
               
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                New password
              </label>
              <input
                type="password"
                name="newPassword"
                value={FormData.newPassword}
                onChange={handleChange}
                id="newPassword"
                className="pl-2 block outline-none border border-gray-100 w-full rounded-md py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
           
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
