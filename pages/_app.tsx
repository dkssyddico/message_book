import axios from 'axios';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <SWRConfig
          value={{
            fetcher: (url: string) => axios.get(url).then((res) => res.data),
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </RecoilRoot>
    </SessionProvider>
  );
}
