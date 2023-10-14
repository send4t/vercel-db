import {NextUIProvider} from '@nextui-org/react'
import '../styles/global.css';
import {ThemeProvider as NextThemesProvider} from "next-themes";



function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </NextThemesProvider>
    </NextUIProvider>
  )
}

export default MyApp;