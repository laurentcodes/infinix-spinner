'use client';
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState(null);

	return (
		<main className='h-screen p-5 flex justify-evenly items-center overflow-hidden'>
			<div className='flex flex-col items-center'>
				<h4 className='font-bold text-2xl'>Try Your Luck</h4>

				<img
					src='/assets/screenshot.png'
					alt='Screenshot of Spinner'
					width={450}
				/>
			</div>
			<div className='flex flex-col items-center'>
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
						className='bg-white mb-3 block w-full p-2.5 border rounded-lg outline-none focus:border-2 focus:border-green-500 ease-linear duration-200'
						placeholder='Enter Email'
						value={email}
						required
						onChange={(e) => setEmail(e.target.value)}
					/>

					<input
						type='number'
						id='phone'
						className='bg-white block w-full p-2.5 border rounded-lg outline-none focus:border-2 focus:border-green-500 ease-linear duration-200'
						placeholder='Enter Phone Number'
						value={phone}
						required
						onChange={(e) => setPhone(e.target.value)}
					/>

					<button
						className='p-2 mt-3 bg-green-500 rounded-lg w-full text-white uppercase font-bold'
						onClick={() => router.push(`/spin?email=${email}&phone=${phone}`)}
					>
						Continue to Spin
					</button>
				</div>
			</div>
		</main>
	);
}
