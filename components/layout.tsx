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
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
}
