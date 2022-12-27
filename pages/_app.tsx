import axios from 'axios';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SWRConfig value={{ fetcher: (url: string) => axios.get(url).then((res) => res.data) }}>
        <Component {...pageProps} />
      </SWRConfig>
    </RecoilRoot>
  );
}
