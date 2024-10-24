import React from 'react';

const Avatar = ({ children, backgroundColor, px, py, color, borderRadius, fontSize, cursor }) => {
  const baseClasses = `text-center ${cursor || 'default'} text-decoration-none`;
  
  const style = {
    backgroundColor,
    padding: `${py} ${px}`,
    borderRadius,
    fontSize,
  };

  return (
    <div
      className={`${baseClasses} bg-${backgroundColor} inline-block`} 
      style={style}
    >
      {children}
    </div>
  );
}

export default Avatar;
