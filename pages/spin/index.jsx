/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { useState, useEffect } from 'react';

import SpinningWheel from '@/components/Spinner';

export default function Spinner() {
	const [mobile, setMobile] = useState(null);

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

	const onFinished = (selectedItem) => {
		// Custom logic to handle the selected item when spinning is complete
		console.log('Chosen item:', selectedItem);
		// alert(selectedItem);
		// ... Additional actions
	};

	return (
		<main className='h-screen w-screen flex flex-col justify-start items-center overflow-hidden md:overflow-auto'>
			<img
				src={'/assets/infinix-logo.jpeg'}
				alt='Infinix Logo'
				width={200}
				height={200}
			/>

			{mobile !== null && (
				<div className='mb-12'>
					<SpinningWheel
						items={items}
						spinningDuration={3}
						spinningSpeed={2}
						width={mobile ? 350 : 500}
						height={mobile ? 350 : 500}
						onFinished={onFinished}
						isMobile={mobile}
					/>
				</div>
			)}
		</main>
	);
}
