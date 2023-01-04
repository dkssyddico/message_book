import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  type: 'file' | 'date' | 'text' | 'number';
  id: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegisterReturn;
}

export default function Input({ type, id, value, placeholder, onChange, register }: InputProps) {
  return (
    <input
      {...register}
      onChange={onChange}
      placeholder={placeholder}
      id={id}
      value={value}
      type={type}
      className='w-full flex-1 rounded-full border-2 border-gray-300 px-4 py-2'
    />
  );
}
