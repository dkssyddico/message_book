import React from 'react';

type InputBoxProps = {
  children: React.ReactNode;
};

export default function InputBox({ children }: InputBoxProps) {
  return <div className='w-full space-y-2'>{children}</div>;
}
