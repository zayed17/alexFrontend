import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[#0B1E36] px-6 py-2 text-sm uppercase tracking-wide text-white ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
