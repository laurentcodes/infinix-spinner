'use client';

export default function Maintenance() {
	return (
		<main
			className='h-screen px-5 py-12 md:py-5 flex flex-col md:justify-around items-center overflow-x-hidden bg-cover'
			style={{
				backgroundImage: `url('/assets/background/background_new.png')`,
			}}
		>
			<div>
				<p className='text-4xl font-bold'>UNDER MAINTENANCE</p>
			</div>
		</main>
	);
}
