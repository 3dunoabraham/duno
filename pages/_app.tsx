import '../styles/globals.css'
import '../styles/spirit.css'
import '../styles/theme.css'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  	return <div className="dark-theme">
  		<Component  {...pageProps} />
	</div>
}

export default MyApp
