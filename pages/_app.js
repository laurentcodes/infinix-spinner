import '@/styles/globals.css';

import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Infinix Spinner</title>
				<link
					rel='stylesheet'
					href='https://unpkg.com/flowbite@1.3.3/dist/flowbite.min.css'
				/>
			</Head>
			<Component {...pageProps} />
		</>
	);
}
