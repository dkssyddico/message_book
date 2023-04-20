import Head from 'next/head';
import React, { useEffect } from 'react';
import Navbar from './navbar';
import Footer from './footer';

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
      <div className=''>
        <Navbar />
        <main className='min-h-screen pt-16'>{children}</main>
        <Footer />
      </div>
    </>
  );
}
