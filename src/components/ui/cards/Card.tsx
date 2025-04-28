import React from "react";

type CardProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, subtitle, className = "", children }) => {
  return (
    <div className={`rounded-2xl shadow-md bg-white p-6 ${className}`}>
      {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
      {subtitle && <p className="text-gray-500 mb-4">{subtitle}</p>}
      <div>{children}</div>
    </div>
  );
};

export default Card;
