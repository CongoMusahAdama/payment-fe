import React from "react";

type Props = {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const FormInput = ({ label, type, value, onChange, className }: Props) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700">{label}</label>
      <input type={type} value={value} onChange={onChange} className="border rounded py-2 px-3 w-full" />
    </div>
  );
};

export default FormInput;
