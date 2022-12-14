import Head from 'next/head';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <nav>nav</nav>
      <main className='min-h-screen'>{children}</main>
      <footer>footer</footer>
    </>
  );
}
