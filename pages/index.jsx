'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TextInput } from 'flowbite-react';
import { z } from 'zod';

import infinix_easybuy from '../public/assets/infinix-easybuy.png';

import spinToWin from '../public/assets/background/spin-to-win.png';
import downPayment from '../public/assets/background/down-payment-new.png';

export default function Home() {
	const router = useRouter();

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [errors, setErrors] = useState([]);

	const User = z.object({
		name: z.string().nonempty({ message: 'Enter your name' }),
		email: z.string().email({ message: 'Invalid email address' }),
		phone: z
			.string({ message: 'Invalid phone number' })
			.min(11, { message: 'Invalid phone number' })
			.max(11, { message: 'Invalid phone number' }),
	});

	// const handleCodes = (e) => {
	// 	e.preventDefault();

	// 	for (let i = 0; i < codes.length; i++) {
	// 		const code = { code: codes[i] };
	// 		console.log(code);

	// 		// createCode(code).then((res) => console.log(res));
	// 	}
	// };

	const handleSubmit = (e) => {
		e.preventDefault();

		try {
			User.parse({ name, email, phone });

			router.push(
				{
					pathname: '/spin',
					query: { name, email, phone },
				},
				'/spin'
			);
		} catch (err) {
			if (err instanceof z.ZodError) {
				setErrors(err.issues);
			}
		}
	};

	return (
		<main
			className='h-screen px-5 py-12 md:py-5 flex flex-col md:justify-around items-center overflow-x-hidden bg-cover'
			style={{
				backgroundImage: `url('/assets/background/background_new.png')`,
			}}
		>
			<div className='flex flex-col items-center gap-4'>
				<Image src={spinToWin} alt='Spin to Win' width={350} />
				<Image src={downPayment} alt='Spin to Win' width={500} />
			</div>

			<div className='flex flex-col mt-[70px] md:mt-0 w-screen justify-center items-center'>
				<Image src={infinix_easybuy} alt='Infinix Logo' width={300} />

				<form className='w-80 md:w-96 flex flex-col mt-12'>
					<TextInput
						className='mb-2'
						id='name'
						placeholder='Enter Name'
						required
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

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
						type='text'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>

					<p>
						{errors.length > 0 &&
							errors.map((error) => (
								<span className='text-red-500 block' key={error.path[0]}>
									{error.message}
								</span>
							))}
					</p>

					<button
						className='p-2 mt-3 bg-green-400 rounded-lg w-full text-white uppercase'
						onClick={handleSubmit}
					>
						Continue to Spin
					</button>
				</form>
			</div>
		</main>
	);
}
