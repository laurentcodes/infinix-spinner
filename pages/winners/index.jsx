'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Table } from 'flowbite-react';

import { getWinners } from '../api/services';

import infinix_easybuy from '../../public/assets/infinix-easybuy.png';

export default function Winners() {
	const [winners, setWinners] = useState([]);
	const [totalWinners, setTotalWinners] = useState(0);

	useEffect(() => {
		getWinners().then((res) => {
			console.log(res);
			setWinners(res.data);
			setTotalWinners(res.total);
		});
	}, []);

	console.log(winners);
	console.log(totalWinners);

	if (winners.length === 0) {
		return (
			<span className='flex w-screen h-screen items-center justify-center'>
				<span class='animate-ping absolute h-16 w-16 rounded-full bg-green-400'></span>
			</span>
		);
	}

	return (
		<div className='p-6'>
			<Image
				src={infinix_easybuy}
				alt='Infinix Logo'
				width={300}
				className='my-12'
			/>

			<Table>
				<Table.Head>
					<Table.HeadCell>Name</Table.HeadCell>
					<Table.HeadCell>Email</Table.HeadCell>
					<Table.HeadCell>Phone Number</Table.HeadCell>
					<Table.HeadCell>Item Won</Table.HeadCell>
				</Table.Head>

				<Table.Body className='divide-y bg-green-500'>
					{winners.length > 0 &&
						winners.map((winner) => (
							<Table.Row
								key={winner._id}
								className='bg-white dark:border-gray-700 dark:bg-gray-800'
							>
								<Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>
									{winner.name}
								</Table.Cell>
								<Table.Cell>{winner.email}</Table.Cell>
								<Table.Cell>{winner.phone}</Table.Cell>
								<Table.Cell>{winner.itemWon.name}</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>
		</div>
	);
}
