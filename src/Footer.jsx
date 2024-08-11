import React from 'react';

function Footer (props)
{
  return(
    <div className = "flex bg-gray-500 justify-between p-4" >
      <p className = "pl-36 text-white text-xs">
        Copyright © 2024 | Rohit Gupta
      </p>

      <p className = "pr-36 text-white text-xs">
         Powered by Rohit Gupta
      </p>
    </div>
  ); 
}

export default Footer ;