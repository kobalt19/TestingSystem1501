import React from 'react';


const MyNavbar = ({options}) =>
{
    return (
        <div className="MyNavbar">
            {options.map(opt => (
                <a href={opt.link} className="MyNavbarLink">{opt.name}</a>
            ))}
        </div>
    )
}

export default MyNavbar;
