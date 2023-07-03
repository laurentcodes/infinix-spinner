'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Button, Modal } from 'flowbite-react';
import ConfettiExplosion from 'react-confetti-explosion';

import SpinningWheel from '@/components/Spinner';

import infinix_easybuy from '../../public/assets/infinix-easybuy.png';

export default function Spinner() {
	const router = useRouter();

	const { email } = router.query;

	if (email?.length < 1) {
		window.location.search = '';
	}

	const [openModal, setOpenModal] = useState(false);
	const [mobile, setMobile] = useState(null);
	const [wonItem, setWonItem] = useState('');
	const [isExploding, setIsExploding] = useState(false);

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
		setIsExploding(true);
		setOpenModal(true);

		console.log('Chosen item:', selectedItem);
		setWonItem(selectedItem);
		// alert(selectedItem);
		// ... Additional actions
	};

	return (
		<main
			className='h-screen md:h-full w-screen flex flex-col justify-start items-center bg-cover'
			style={{ backgroundImage: `url('/assets/background.png')` }}
		>
			{isExploding && (
				<ConfettiExplosion
					particleCount={350}
					duration={10000}
					zIndex={100}
					force={6}
				/>
			)}

			<div className='flex flex-col items-center mb-12'>
				<Image
					src={infinix_easybuy}
					alt='Infinix Logo'
					width={300}
					className='my-12'
				/>

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
				</div>
			)}

			<Modal
				show={openModal}
				size='lg'
				popup
				position='center'
				onClose={() => {
					setOpenModal(false);
					router.push('/');
				}}
			>
				<Modal.Header />
				<Modal.Body>
					<div className='text-center'>
						{wonItem && (
							<p className='my-5 font-bold text-xl uppercase'>
								{wonItem === 'Thank You'
									? 'Thanks for Participating!'
									: `You have won: ${wonItem}`}
							</p>
						)}

						{wonItem === '0 Naira Down Payment' && (
							<p>
								You&apos;ve won big in our live spin! Check your email for the
								exciting details.{' '}
							</p>
						)}

						{wonItem === 'Infinix NOTE30 Business Backpack' && (
							<p>
								Your lucky stars have aligned! You&apos;re the proud winner of
								our live spin competition Let the celebration begin!
							</p>
						)}

						{wonItem === '1000NGN AIRTIME' && (
							<p>
								Drumrolls please! You&apos;re the fortunate winner of our live
								spin. Let the celebration begin!
							</p>
						)}

						{wonItem === 'Wireless Speaker Infinix XS01 Purple' && (
							<p>
								Drumrolls please! You&apos;re the fortunate winner of our live
								spin. Let the celebration begin!
							</p>
						)}

						{/* {wonItem !== 'Thank You' && (
							<p>
								An email with instructions on how to claim your winning will be
								sent to you.
							</p>
						)} */}
					</div>
				</Modal.Body>
			</Modal>
		</main>
	);
}
