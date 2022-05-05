import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Header } from "../components/Header";
import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Header />
      <Toaster
        toastOptions={{
          duration: 3000,
        }}
      />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
