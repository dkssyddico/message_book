import React from 'react';

interface InputProps {
  type: 'file' | 'date' | 'text' | 'number';
  id: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ type, id, value, placeholder, onChange }: InputProps) {
  return (
    <input
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      value={value}
      type={type}
      className='w-full flex-1 rounded-full border-2 border-gray-300'
    />
  );
}
