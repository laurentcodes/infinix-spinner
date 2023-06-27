/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { useState, useEffect } from 'react';

import SpinningWheel from '@/components/Spinner';

export default function Spinner() {
	const [mobile, setMobile] = useState(null);
	const [wonItem, setWonItem] = useState('');

	useEffect(() => {
		const checkMobile = window.innerWidth <= 768;
		setMobile(checkMobile);
	}, []);

	const items = [
		'0 Naira Down Payment',
		'Thank You',
		'Infinix NOTE30 Business Backpack',
		'Thank You',
		'Wireless Speaker Infinix XS01 Purple',
		'Thank You',
		'1000NGN AIRTIME',
		'Thank You',
	];

	const itemColors = [
		'#F0CF50',
		'#EE4040',
		'#815CD1',
		'#EE4040',
		'#3DA5E0',
		'#EE4040',
		'#194707',
		'#EE4040',
	];

	const onFinished = (selectedItem) => {
		// Custom logic to handle the selected item when spinning is complete
		console.log('Chosen item:', selectedItem);
		setWonItem(selectedItem);
		// alert(selectedItem);
		// ... Additional actions
	};

	return (
		<main className='h-screen w-screen flex flex-col justify-start items-center overflow-hidden md:overflow-auto bg-gradient-to-br from-cyan-500 to-green-500'>
			<img
				src={'/assets/infinix-logo.png'}
				alt='Infinix Logo'
				width={200}
				height={200}
			/>

			{mobile !== null && (
				<div className='mb-12 flex flex-col items-center'>
					<SpinningWheel
						items={items}
						itemColors={itemColors}
						spinningDuration={10}
						spinningSpeed={50}
						width={mobile ? 380 : 600}
						height={mobile ? 380 : 600}
						onFinished={onFinished}
						isMobile={mobile}
					/>

					{wonItem && (
						<p className='mt-5 font-bold text-xl text-center uppercase'>
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
