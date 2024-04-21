import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { Input } from "antd";

export default function ChangePassword() {
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();
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
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(
        FormData.newPassword
      )
    ) {
      toast.error("Weak Password");
      return;
    }
    try {
      setLoding(true);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVERURL}/user/changepassword`,
        {
          _id: id,
          oldPassword: FormData.oldPassword,
          newPassword: FormData.newPassword,
        }
      );
      const data = await response;
      if (data?.data?.success === true) {
        setFormData({
          oldPassword: "",
          newPassword: "",
        });
        setLoding(false);
        toast.success(data?.data?.message);
        setTimeout(() => {
          navigate("/profile");
        }, 2000); 
      } else {
        toast.error(data?.data?.message);
        setLoding(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <Toaster />
        <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item fs-3">
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li class="breadcrumb-item active fs-3" aria-current="page">
                  Change Password
                  </li>
                </ol>
              </nav>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm content-center">
 
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            <Link to="/profile">Change Password</Link>
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
                <Input.Password
                  id="oldPassword"
                  name="password"
                  type="password"
                  value={FormData.oldPassword}
                  autoComplete="old-password"
                  onChange={handleChange}
                  className="py-2"
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
              <div className="mt-2">
                <Input.Password
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={FormData.newPassword}
                  autoComplete="old-password"
                  onChange={handleChange}
                  className="py-2"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSubmit}
              >
                {loding ? "Updating password...." : "Change Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}