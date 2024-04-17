import AvatarByName from "./Avatar";
import React from "react";

const Profilenav = ({ username }) => {
    return (
        <div className="flex items-center">
            <AvatarByName name={username} size={30} />
            <span className="text-black hover:text-gray-300 pl-2 text-lg  cursor-pointer">{username}</span>
        </div>
    );
};

export default Profilenav;