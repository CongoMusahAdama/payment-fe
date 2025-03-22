import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button = ({ onClick, children, className }: Props) => {
  return (
    <button onClick={onClick && onClick} className={`bg-blue-500 text-white py-2 px-4 rounded ${className}`}>
      {children}
    </button>
  );
};

export default Button;
