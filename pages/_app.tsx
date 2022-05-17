import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
/*
  url이 키로 사용된다
  fetcher가 캐시에서 데이터를 가져올때 사용하는 id로작용
  때문에, 리로드나 처음 feching 발고는 데이터가 undefined로 뜨지 않는다.
  심지어 다른 사이트의 탭에서 다시 돌아와도 다시 fetching한다. 
  즉 데이터의 변경을 자동으로 점검함
*/
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-xl mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}

export default MyApp;
