'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
	const router = useRouter();

	const [email, setEmail] = useState('');

	return (
		<main className='h-screen p-5 flex justify-center overflow-hidden'>
			<div className='w-96 flex flex-col justify-center'>
				{/* <label htmlFor='email' className='block mb-2 text-grey-500'>
					Email
				</label> */}
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
					onClick={() => router.push(`/spinner?email=${email}`)}
				>
					Continue
				</button>
			</div>
		</main>
	);
}
