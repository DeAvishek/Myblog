import React from 'react';

const Container = ({ children }) => {
  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f8f9fa', // Light gray background
    borderRadius: '5px', // Rounded corners
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Subtle shadow
  };

  return (
    <div className="container" style={containerStyle}>
      {children}
    </div>
  );
};

export default Container;
