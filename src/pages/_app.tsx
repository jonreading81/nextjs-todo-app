import type { AppProps } from "next/app";
import { GlobalStyle } from "../styles/App.styles";
import "normalize.css/normalize.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
