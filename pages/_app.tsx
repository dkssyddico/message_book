import axios from 'axios';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Script from 'next/script';
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
  // function kakaoInit() {
  //   window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
  // console.log(window.Kakao.isInitialized());
  // }

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <SWRConfig value={{ fetcher: (url: string) => axios.get(url).then((res) => res.data) }}>
          <Component {...pageProps} />
          {/* <Script
            defer={true}
            src='https://t1.kakaocdn.net/kakao_js_sdk/2.1.0/kakao.min.js'
            integrity='sha384-dpu02ieKC6NUeKFoGMOKz6102CLEWi9+5RQjWSV0ikYSFFd8M3Wp2reIcquJOemx'
            crossOrigin='anonymous'
            onLoad={kakaoInit}
          ></Script> */}
        </SWRConfig>
      </RecoilRoot>
    </SessionProvider>
  );
}
