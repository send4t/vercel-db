import { NextUIProvider } from '@nextui-org/react';
import '../styles/global.css';
import { ThemeProvider as NextThemesProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider enableSystem={false} defaultTheme="dark" attribute="class">
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default MyApp;