import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ children, active, linkto }) => {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[14px] px-6 py-3 rounded-lg font-bold transition-all duration-200 shadow-md
        ${active ? 'bg-caribbeangreen-200 text-richblack-900' : 'bg-richblue-500 text-richblack-5'}
        hover:scale-95 hover:bg-caribbeangreen-300`}
      >
        {children}
      </div>
    </Link>
  );
};

export default Button;
