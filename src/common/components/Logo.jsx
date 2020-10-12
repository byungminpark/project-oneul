import React from 'react';
import './Logo.css';

const Logo = ({ ...props }) => {
  return (
    <div className="Logo" {...props}>
      <span>오늘 뭐 하지?</span>
    </div>
  );
};

export default Logo;
