import Head from 'next/head';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { modalState } from 'state/modal';
import Modal from './modal';
import Navbar from './navbar';

interface LayoutProps {
  children: React.ReactNode;
  title: string | 'Message Book';
}

export default function Layout({ children, title }: LayoutProps) {
  const modalInfo = useRecoilValue(modalState);
  return (
    <>
      <Head>
        <title>{title ? title : 'Message Book'}</title>
      </Head>
      {modalInfo.open && <Modal />}
      <Navbar />
      <main className='min-h-screen pt-16'>{children}</main>
      <footer>footer</footer>
    </>
  );
}
