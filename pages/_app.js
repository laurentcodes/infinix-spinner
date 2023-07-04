import '@/styles/globals.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Head from 'next/head';

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
			<ToastContainer />
		</>
	);
}
