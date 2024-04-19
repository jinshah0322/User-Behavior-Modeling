import React from 'react';

function getInitials(name) {
    if (!name) return ''; 
  
    const splitName = name.split(' ');
    return splitName.map((part) => part[0]).join('').toUpperCase();
}
  
const AvatarByName = ({ name, size = 40 }) => {
    const backgroundColor = '#000000';

    return (
        <div
            className="avatar"
            style={{
                backgroundColor: backgroundColor,
                width: size,
                height: size,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: size * 0.5,
            }}
        >
            {getInitials(name || "")} 
        </div>
    );
};

export default AvatarByName;

