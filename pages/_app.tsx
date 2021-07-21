import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'tailwindcss/dist/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  )
}
export default MyApp
