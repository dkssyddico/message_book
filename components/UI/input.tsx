import React from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

interface InputProps {
  register?: UseFormRegisterReturn;
}

export default function Input({
  register,
  ...inputAttributes
}: InputProps &
  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) {
  return (
    <input
      {...register}
      {...inputAttributes}
      className='w-full rounded-full border-2 border-gray-300 px-4 py-2'
    />
  );
}
