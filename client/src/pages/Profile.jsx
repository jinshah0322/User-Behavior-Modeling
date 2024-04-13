// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {toast,Toaster} from "react-hot-toast";
// const Profile = () => {
//     const id = localStorage.getItem("id");
//     const [isEdited, setIsEdited] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         streetAddress: '',
//         city: '',
//         state: '',
//         country: '',
//         postalcode: '',


    
//       });
//       const [formDataone, setFormDataone] = useState({
//         name: '',
//         email: '',
//         mobile: '',
//         streetAddress: '',
//         city: '',
//         state: '',
//         country: '',
//         postalcode: '',
    
//       });
//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//           ...formData,
//           [name]: value,
//         });
//       };
      
//     const fetchData = async () => {
    
//         try {
//             const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/user/profile/${id}`);
//             setFormData({
//                 name: response.data.user.name,
//                 email: response.data.user.email,
//                 phonenumber: response.data.user.phonenumber,
//                 streetAddress: response.data.user.streetAddress,
//                 city: response.data.user.city,
//                 state: response.data.user.state,
//                 country: response.data.user.country,
//                 postalcode: response.data.user.postalcode,
//             });
//             setFormDataone({
//                 name: response.data.user.name,
//                 email: response.data.user.email,
//                 mobile: response.data.user.phonenumber,
//                 streetAddress: response.data.user.streetAddress,
//                 city: response.data.user.city,
//                 state: response.data.user.state,
//                 country: response.data.user.country,
//                 postalcode: response.data.user.postalcode,
//             });
        
            
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(()=>{
//         if(formData.name === formDataone.name && formData.email === formDataone.email && formData.phonenumber === formDataone.mobile && formData.streetAddress === formDataone.streetAddress && formData.city === formDataone.city && formData.state === formDataone.state && formData.country === formDataone.country && formData.postalcode === formDataone.postalcode){
//             setIsEdited(false)
//         }
//         else{
//             setIsEdited(true)
//         }
//     },[formData])

//     const updateProfile = async ()  => {
//         if(formData.name === '' || formData.email === '' || formData.phonenumber === '' || formData.streetAddress === '' || formData.city === '' || formData.state === '' || formData.country === '' || formData.postalcode === ''){ 
//             toast.error("Please fill all the fields");
//             return;
//         }
        
        
//         try {
//             setIsEdited(true)
//             const response = await axios.put(`${process.env.REACT_APP_SERVERURL}/user/editprofile/${id}`, formData);
//             console.log(response);
//             if(response?.data?.status === 200){
//                 fetchData()
//                 toast.success(response?.data?.msg)
//             }
//             else{
//                 toast.error(response?.data?.msg)
//             }
//             // window.location.href = "/profile";
//         } catch (error) {
//             console.log(error);
//         }
    
//     }

//     useEffect(() => {
//         if (!localStorage.getItem("id")) {
//             window.location.href = "/login";
//         } else {
//             fetchData();
//         }
//     }, []);

//     return (
//         <div className="container mx-auto px-4 py-12">
//             <Toaster />
//             <div className='flex w-full justify-between'>
//             <h1 className="text-3xl font-bold mb-6">Profile</h1>
//             <button disabled = {!isEdited} className={`${!isEdited?"bg-gray-200":"bg-green-500 "} text-white rounded-md px-4 py-2`} onClick={updateProfile}>Save Changes</button>

//             </div>
//             {formData ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
//                         <h2 className="text-xl font-bold mb-4">Personal Information</h2>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">Name:</p>
//                             <input
//                       type="text"
//                       name="name"
//                       id="name"
//                       className="w-full outline-none"
//                       placeholder="Enter your name"
//                       value={formData?.name}
//                       onChange={handleChange}
//                       required
//                     />
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">Email:</p>
//                             <input
//                       type="email"
//                       name="email"
//                       id="email"
//                       className="w-full outline-none"
//                       placeholder="Enter your email"
//                       value={formData?.email}
//                       onChange={handleChange}
//                       required
//                     />
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">Phone:</p>
//                             <input
//                       type="text"
//                       name="phonenumber"
//                       id="phonenumber"
//                       className="w-full outline-none"
//                       placeholder="Enter your phone"
//                       value={formData?.phonenumber}
//                       onChange={handleChange}
//                       required
//                     />
//                         </div>
//                     </div>
//                     <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
//                         <h2 className="text-xl font-bold mb-4">Address Information</h2>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">Street Address:</p>
//                             <input
//                       type="text"
//                       name="streetAddress"
//                       id="streetAddress"
//                       className="w-full outline-none"
//                       placeholder="Enter your Street Address"
//                       value={formData?.streetAddress}
//                       onChange={handleChange}
//                       required
//                     />
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">City:</p>
//                             <input
//                       type="text"
//                       id="city"
//                       name="city"
//                       className="w-full outline-none"
//                       placeholder="Enter your City"
//                       value={formData?.city}
//                       onChange={handleChange}
//                       required
//                     />
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">State:</p>
//                             <input
//                       type="text"
//                       id="state"
//                       name="state"
//                       className="w-full outline-none"
//                       placeholder="Enter your State"
//                       value={formData?.state}
//                       onChange={handleChange}
//                       required
//                     />
//                         </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">Country:</p>
//                             <input
//                       type="text"
//                       id="country"
//                       name="country"
//                       className="w-full outline-none"
//                       placeholder="Enter your Country"
//                       value={formData?.country}
//                       onChange={handleChange}
//                       required
//                     />                        </div>
//                         <div className="mb-4">
//                             <p className="text-gray-700 text-sm font-bold">Postal Code:</p>
//                             <input
//                       type="text"
//                       id="postalcode"
//                       name="postalcode"
//                       className="w-full outline-none"
//                       placeholder="Enter your Country"
//                       value={formData?.postalcode}
//                       onChange={handleChange}
//                       required
//                     /> 
//                         </div>
//                     </div>                   
//                 </div>
//             ) : (
//                 <p>Loading...</p>
//                 )}
//         </div>
//     );
// };

// export default Profile;

import React from 'react';
import ProfileCard from '../components/Profile/ProfileCards';

const Profile = () => {
  return (
    <div>
      <ProfileCard />
    </div>
  );
}

export default Profile;