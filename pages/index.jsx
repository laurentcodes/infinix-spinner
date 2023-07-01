/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
	const router = useRouter();

	const [email, setEmail] = useState('');

	return (
		<main className='h-screen p-5 flex flex-col justify-evenly items-center overflow-hidden'>
			<img
				src={'/assets/infinix-logo.jpeg'}
				alt='Infinix Logo'
				width={200}
				height={200}
			/>

			<div className='w-80 md:w-96 flex flex-col'>
				<input
					type='text'
					id='email'
					className='bg-white block w-full p-2.5 border rounded-lg outline-none focus:border-2 focus:border-green-500'
					placeholder='Enter Email'
					value={email}
					required
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button
					className='p-2 mt-3 bg-green-500 rounded-lg w-full text-white'
					onClick={() => router.push(`/spin?email=${email}`)}
				>
					Continue
				</button>
			</div>
		</main>
	);
}
