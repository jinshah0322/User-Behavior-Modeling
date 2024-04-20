import React from 'react';
import { FaBoxOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
const items = [
    {
        icon: <FaUser className='text-[40px]' />,
        title: 'Profile',
        description: 'View your profile',
        link:"/profile/user"
    },
    {
        icon: <HiLocationMarker className='text-[50px] text-blue-500' />,
        title: 'Address',
        description: 'View Address for Orders',
        link:"/profile/address"
    },
    {
        icon: <FaBoxOpen className='text-[50px] text-[#ff9800]' />,
        title: 'Orders',
        description: 'Browse your Past Orders',
        link:"/profile/orders"
    },
    {
        icon: <RiLockPasswordFill className='text-[50px]' />,
        title: 'Change Password',
        description: 'Update password with one click',
        link:"/profile/changepassword"
    }
]
const name = localStorage.getItem('name');
const ProfileCard = () => {
    return (
        <div>
            <div className='px-12 pt-6 flex items-center'>
                <i className='font-thin text-3xl'>Hello, </i>
                <span className='font-bold text-3xl ml-2'>{name}</span>
            </div>
            <div className='w-full grid grid-cols-1 lg:grid-cols-3 items-center justify-center min-h-[42vh]'>
                {items?.map((item, index) => {
                    return (
                        <Link to={item.link} key={index} className='border m-12 p-8 flex items-center gap-10 hover:cursor-pointer hover:bg-[#eee] rounded-md'>
                            <div>
                                {item.icon}
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold'>{item.title}</h1>
                                <p className='text-gray-500'>{item.description}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
}

export default ProfileCard;