'use client';
/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import SpinningWheel from '@/components/Spinner';

export default function Spinner() {
	const router = useRouter();
	const { email } = router.query;

	// console.log(email);

	if (email?.length < 1) {
		console.log('hey');
		window.location.search = '';
	}

	const [mobile, setMobile] = useState(null);
	const [wonItem, setWonItem] = useState('');

	useEffect(() => {
		const checkMobile = window.innerWidth <= 768;
		setMobile(checkMobile);
	}, []);

	const items = [
		{
			value: '0 Naira Down Payment',
			weight: 1,
			src: '/assets/items/0_down_payment.png',
		},
		{ value: 'Thank You', weight: 30, src: '/assets/items/thank_you.png' },
		{
			value: 'Infinix NOTE30 Business Backpack',
			weight: 5,
			src: '/assets/items/backpack.png',
		},
		{ value: '1000NGN AIRTIME', weight: 15, src: '/assets/items/airtime.png' },
		{
			value: 'Wireless Speaker Infinix XS01 Purple',
			weight: 2,
			src: '/assets/items/wireless_speaker.png',
		},
	];

	// const itemColors = ['#F0CF50', '#815CD1', '#EE4040', '#194707', '#3DA5E0'];
	// const itemColors = ['#d8f3dc', '#40916c', '#95d5b2', '#d8f3dc', '#95d5b2'];
	const itemColors = ['#61a5c2', '#2a6f97', '#1b4332', '#52b788', '#014f86'];

	const onFinished = (selectedItem) => {
		// Custom logic to handle the selected item when spinning is complete
		console.log('Chosen item:', selectedItem);
		setWonItem(selectedItem);
		// alert(selectedItem);
		// ... Additional actions
	};

	return (
		<main className='h-screen md:h-full w-screen flex flex-col justify-start items-center bg-[#95d5b2]'>
			<div className='flex flex-col items-center mb-12'>
				<img src={'/assets/infinix-logo.png'} alt='Infinix Logo' width={100} />

				<h3 className='text-5xl font-bold uppercase'>Spin to Win</h3>
			</div>

			{mobile !== null && (
				<div className='mb-12 flex flex-col items-center'>
					<SpinningWheel
						items={items}
						itemColors={itemColors}
						spinningDuration={8}
						spinningSpeed={50}
						width={mobile ? 375 : 600}
						height={mobile ? 375 : 600}
						onFinished={onFinished}
						isMobile={mobile}
					/>

					{wonItem && (
						<p className='my-5 font-bold text-xl text-center uppercase'>
							{wonItem === 'Thank You'
								? 'Thanks for Participating!'
								: `You have won: ${wonItem}`}
						</p>
					)}
				</div>
			)}
		</main>
	);
}
