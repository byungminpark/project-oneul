import React from 'react';
import './Logo.scss';

function Logo({ ...props }) {
  return (
    <div className="Logo" {...props}>
      <span>Oneul</span>
    </div>
  );
}

export default Logo;
