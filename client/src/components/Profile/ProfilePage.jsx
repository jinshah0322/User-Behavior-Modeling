import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {toast,Toaster} from "react-hot-toast";
const ProfilePage = () => {
    const id = localStorage.getItem("id");
    const [isEdited, setIsEdited] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',    
      });
      const [formDataone, setFormDataone] = useState({
        name: '',
        email: '',
        mobile: '',      
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      
    const fetchData = async () => {
    
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/user/profile/${id}`);
            setFormData({
                name: response.data.user.name,
                email: response.data.user.email,
                phonenumber: response.data.user.phonenumber,               
            });
            setFormDataone({
                name: response.data.user.name,
                email: response.data.user.email,
                mobile: response.data.user.phonenumber,                
            });
        
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        if(formData.name === formDataone.name && formData.email === formDataone.email && formData.phonenumber === formDataone.mobile){
            setIsEdited(false)
        }
        else{
            setIsEdited(true)
        }
    },[formData])

    const updateProfile = async ()  => {
        if(formData.name === '' || formData.email === '' || formData.phonenumber === ''){ 
            toast.error("Please fill all the fields");
            return;
        }        

        try {
            setIsEdited(true)
            const response = await axios.put(`${process.env.REACT_APP_SERVERURL}/user/editprofile/${id}`, formData);
            console.log(response);
            if(response?.data?.status === 200){
                fetchData()
                toast.success(response?.data?.msg)
            }
            else{
                toast.error(response?.data?.msg)
            }
            // window.location.href = "/profile";
        } catch (error) {
            console.log(error);
        }
    
    }

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
            <div className='flex w-full justify-between'>
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            </div>
            {formData ? (
                <div className="w-full">
                    <div className="rounded px-8 pt-6 pb-8 mb-4 grid items-center justify-center">
                        {/* <h2 className="text-xl font-bold mb-4">Personal Information</h2> */}
                        <div className="mb-4">
                            <p className="text-gray-700 text-sm font-bold">Name:</p>
                            <input
                      type="text"
                      name="name"
                      id="name"
                      className="w-full border px-3 py-1 outline-none mt-1 lg:w-[400px] w-[270px] rounded-md"
                      placeholder="Enter your name"
                      value={formData?.name}
                      onChange={handleChange}
                      required
                    />
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700 text-sm font-bold">Email:</p>
                            <input
                      type="email"
                      name="email"
                      id="email"
                      className="w-full border px-3 py-1 outline-none mt-1 w-[300px] rounded-md"
                      placeholder="Enter your email"
                      value={formData?.email}
                      onChange={handleChange}
                      required
                    />
                        </div>
                        <div className="mb-4">
                            <p className="text-gray-700 text-sm font-bold">Phone:</p>
                            <input
                      type="text"
                      name="phonenumber"
                      id="phonenumber"
                      className="w-full border px-3 py-1 outline-none mt-1 w-[300px] rounded-md"
                      placeholder="Enter your phone"
                      value={formData?.phonenumber}
                      onChange={handleChange}
                      required
                    />
                        </div>
                        <div>
                        <button disabled = {!isEdited} className={`${!isEdited?"bg-gray-200":"bg-green-500 "} text-white rounded-md px-4 py-2`} onClick={updateProfile}>Save Changes</button>

                        </div>
                    </div>                                   
                </div>
            ) : (
                <p>Loading...</p>
                )}
        </div>
    );
};

export default ProfilePage;