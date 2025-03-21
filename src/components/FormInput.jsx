import React from 'react';

const FormInput = ({ label, type, value, onChange, className }) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="border rounded py-2 px-3 w-full"
      />
    </div>
  );
};

export default FormInput;
