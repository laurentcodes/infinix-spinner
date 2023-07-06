'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import Paginate from '../../components/Paginate';

import { getWinners } from '../api/services';

import infinix_easybuy from '../../public/assets/infinix-easybuy.png';

export default function Winners() {
	const [winners, setWinners] = useState([]);
	const [totalWinners, setTotalWinners] = useState(0);

	const [itemOffset, setItemOffset] = useState(0);

	const itemsPerPage = 20;
	const pageCount = Math.ceil(winners.length / itemsPerPage);

	const endOffset = itemOffset + itemsPerPage;

	const currentItems = winners.slice(itemOffset, endOffset);

	const onPageChange = (e) => {
		const newOffset = (e.selected * itemsPerPage) % winners.length;

		setItemOffset(newOffset);
	};

	useEffect(() => {
		getWinners().then((res) => {
			setWinners(res.data);
			setTotalWinners(res.total);
		});
	}, []);

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

			<div className='overflow-x-auto'>
				<Table>
					<Table.Head>
						<Table.HeadCell>Name</Table.HeadCell>
						<Table.HeadCell>Email</Table.HeadCell>
						<Table.HeadCell>Phone Number</Table.HeadCell>
						<Table.HeadCell>Item Won</Table.HeadCell>
					</Table.Head>

					<Table.Body className='divide-y bg-green-500'>
						{currentItems.length > 0 &&
							currentItems.map((winner) => (
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

			<div className='py-6 float-right'>
				<Paginate pageCount={pageCount} handlePageClick={onPageChange} />
			</div>
		</div>
	);
}
