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
      <Navbar />
      <main className='min-h-screen p-8 pt-24'>{children}</main>
      <footer>footer</footer>
    </>
  );
}
