import Head from 'next/head';
import React from 'react';
import Navbar from './navbar';

interface LayoutProps {
  children: React.ReactNode;
  title: string | 'Message Book';
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title ? title : 'Message Book'}</title>
      </Head>
      <div className='relative'>
        <Navbar />
        <main className='relative min-h-screen pt-16'>{children}</main>
        <footer>footer</footer>
      </div>
    </>
  );
}
