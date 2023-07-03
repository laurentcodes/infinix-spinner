'use client';
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextInput, Button } from 'flowbite-react';

export default function Home() {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState(null);

	return (
		<main className='h-screen p-5 flex flex-col md:flex-row justify-evenly items-center overflow-hidden'>
			<div className='flex flex-col items-center'>
				<h4 className='font-bold text-3xl'>Try Your Luck</h4>

				<img
					src='/assets/screenshot.png'
					alt='Screenshot of Spinner'
					width={450}
				/>
			</div>

			<div className='flex flex-col items-center'>
				<img
					src={'/assets/infinix-easybuy.png'}
					alt='Infinix Logo'
					width={300}
				/>

				<div className='w-80 md:w-96 flex flex-col mt-12'>
					<TextInput
						className='mb-2'
						id='email1'
						placeholder='Enter Email'
						required
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<TextInput
						className='mb-2'
						id='phone'
						placeholder='Enter Phone Number'
						required
						type='number'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>

					<button
						className='p-2 mt-3 bg-green-400 rounded-lg w-full text-white uppercase'
						onClick={() => router.push(`/spin?email=${email}&phone=${phone}`)}
					>
						Continue to Spin
					</button>
				</div>
			</div>
		</main>
	);
}
