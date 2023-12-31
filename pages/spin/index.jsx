'use client';

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Modal } from 'flowbite-react';
import ConfettiExplosion from 'react-confetti-explosion';
import { toast } from 'react-toastify';

import SpinningWheel from '@/components/Spinner';

import { getItems, signUp } from '../api/services';

import infinix_easybuy from '../../public/assets/infinix-easybuy.png';

export default function Spinner() {
	const router = useRouter();

	const { name, email, phone } = router.query;

	const [items, setItems] = useState([]);

	const [openModal, setOpenModal] = useState(false);
	const [mobile, setMobile] = useState(null);
	const [wonItem, setWonItem] = useState('');
	const [isExploding, setIsExploding] = useState(false);

	useEffect(() => {
		const checkMobile = window.innerWidth <= 768;
		setMobile(checkMobile);

		getItems().then((res) => setItems(res.data));
	}, []);

	const itemColors = ['#61a5c2', '#2a6f97', '#1b4332', '#52b788', '#014f86'];

	const onFinished = (selectedItem) => {
		const data = { name, email, phone, itemWon: selectedItem.id };

		signUp(data)
			.then((res) => {
				if (res.status === 201) {
					// Custom logic to handle the selected item when spinning is complete
					setIsExploding(true);
					setOpenModal(true);
					setWonItem(selectedItem.name);
				}
			})
			.catch((err) => {
				if (err.response.data.code === 401) {
					toast(err.response.data.message, {
						autoClose: 2000,
						type: 'success',
					});
				} else {
					toast(err.response.data.message, {
						autoClose: 2000,
						type: 'error',
					});
				}

				setTimeout(() => {
					router.push('/');
				}, 2500);
			});
	};

	if (items.length === 0) {
		return (
			<span className='flex w-screen h-screen items-center justify-center'>
				<span className='animate-ping absolute h-16 w-16 rounded-full bg-green-400'></span>
			</span>
		);
	}

	return (
		<main
			className='h-screen md:h-full w-screen flex flex-col justify-start items-center bg-cover'
			style={{ backgroundImage: `url('/assets/background/background.png')` }}
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
					</div>
				</Modal.Body>
			</Modal>
		</main>
	);
}
