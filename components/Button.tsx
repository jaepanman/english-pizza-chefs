
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg border-b-4";
  
  const variants = {
    primary: "bg-yellow-400 text-yellow-900 border-yellow-600 hover:bg-yellow-300",
    secondary: "bg-orange-500 text-white border-orange-700 hover:bg-orange-400",
    danger: "bg-red-500 text-white border-red-700 hover:bg-red-400"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
