
import React from 'react';


function stringToColor(str) {
    if (!str) return ''; 
  
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
    return '00000'.substring(0, 6 - c.length) + c;
}

function getInitials(name) {
    if (!name) return ''; 
  
    const splitName = name.split(' ');
    return splitName.map((part) => part[0]).join('').toUpperCase();
}
  
const AvatarByName = ({ name, size = 40 }) => {
    const backgroundColor = `#${stringToColor(name || "")}`; 

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