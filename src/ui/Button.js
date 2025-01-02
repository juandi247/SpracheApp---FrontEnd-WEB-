// src/components/ui/Button.js

import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md font-semibold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
