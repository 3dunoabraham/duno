import type { AppProps } from 'next/app'


import '../styles/globals.css'
import '../styles/css.css'
import '../styles/theme.css'
import '../styles/duno.css'
function MyApp({ Component, pageProps }: AppProps) {
  	return <div className="dark-theme">
  		<Component  {...pageProps} />
	</div>
}

export default MyApp
