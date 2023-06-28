import React, { useRef, useEffect, useState } from 'react';

const SpinningWheel = ({
	items,
	itemColors,
	spinningDuration,
	spinningSpeed,
	width,
	height,
	onFinished,
	isMobile,
}) => {
	const canvasRef = useRef(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [isSpinning, setIsSpinning] = useState(false);
	const [rotationAngle, setRotationAngle] = useState(0);

	const spinWheel = () => {
		setIsSpinning(true);
		setSelectedItem(null);

		const randomIndex = Math.floor(Math.random() * items.length);
		const selectedItem = items[randomIndex];

		const targetAngle =
			360 * spinningDuration + randomIndex * (360 / items.length);

		let currentAngle = 0;

		const spinInterval = setInterval(() => {
			currentAngle += spinningSpeed;

			if (currentAngle >= targetAngle) {
				clearInterval(spinInterval);
				setIsSpinning(false);
				setSelectedItem(selectedItem);
				onFinished(selectedItem); // Call the onFinished function with the selected item
			}

			setRotationAngle(currentAngle);
		}, spinningSpeed);
	};

	// const drawWheel = () => {
	// 	const canvas = canvasRef.current;
	// 	const ctx = canvas.getContext('2d');

	// 	const radius = Math.min(canvas.width, canvas.height) / 2;
	// 	const centerX = canvas.width / 2;
	// 	const centerY = canvas.height / 2;
	// 	const angle = (2 * Math.PI) / items.length;

	// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 	for (let i = 0; i < items.length; i++) {
	// 		const startAngle = i * angle + rotationAngle;
	// 		const endAngle = (i + 1) * angle + rotationAngle;

	// 		ctx.beginPath();
	// 		ctx.fillStyle = itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0'); // Use custom color if available, otherwise alternate between white and light gray
	// 		ctx.moveTo(centerX, centerY);
	// 		ctx.moveTo(centerX, centerY);
	// 		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
	// 		ctx.closePath();
	// 		ctx.fill();

	// 		ctx.save();
	// 		ctx.translate(centerX, centerY);
	// 		ctx.rotate(startAngle + angle / 2);

	// 		ctx.fillStyle = selectedItem === i ? '#22c55e' : '#fff'; // Set color to red for selected item, otherwise black
	// 		ctx.font = `bold ${isMobile ? '10px' : '11px'} Arial`;
	// 		ctx.textAlign = 'center';
	// 		ctx.textBaseline = 'middle';
	// 		ctx.fillText(items[i].toUpperCase(), radius / 2, 0);
	// 		ctx.restore();
	// 	}

	// 	// Highlight the selected item
	// 	if (selectedItem !== null) {
	// 		const selectedIndex = items.indexOf(selectedItem);
	// 		const highlightStartAngle = selectedIndex * angle + rotationAngle;
	// 		const highlightEndAngle = (selectedIndex + 1) * angle + rotationAngle;

	// 		ctx.beginPath();
	// 		ctx.moveTo(centerX, centerY);
	// 		ctx.arc(centerX, centerY, radius, highlightStartAngle, highlightEndAngle);
	// 		ctx.closePath();

	// 		ctx.save();
	// 		ctx.fillStyle = '#22c55e';
	// 		ctx.fill();
	// 		ctx.restore();

	// 		ctx.save();
	// 		ctx.translate(centerX, centerY);
	// 		ctx.rotate(highlightStartAngle + angle / 2);
	// 		ctx.fillStyle = '#FFFFFF';
	// 		ctx.fillText(items[selectedIndex].toUpperCase(), radius / 2, 0);
	// 		ctx.restore();
	// 	}
	// };

	const drawWheel = () => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');

		const radius = Math.min(canvas.width, canvas.height) / 2;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const angle = (2 * Math.PI) / items.length;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < items.length; i++) {
			const startAngle = i * angle + rotationAngle;
			const endAngle = (i + 1) * angle + rotationAngle;

			ctx.beginPath();
			ctx.fillStyle = itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0'); // Use custom color if available, otherwise alternate between white and light gray
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fill();

			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(startAngle + angle / 2);

			ctx.fillStyle = selectedItem === i ? '#22c55e' : '#fff'; // Set color to red for selected item, otherwise black
			ctx.font = `bold ${isMobile ? '10px' : '11px'} Arial`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(items[i].toUpperCase(), radius / 2, 0);
			ctx.restore();
		}

		// Draw the circle with pointer in the center
		ctx.beginPath();
		ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
		ctx.fillStyle = '#22c55e';
		ctx.fill();

		// Calculate the rotation angle for the pointer
		const selectedIndex = items.indexOf(selectedItem);
		const pointerRotationAngle =
			rotationAngle + selectedIndex * angle + angle / 2;

		// Draw the pointer
		ctx.save();
		ctx.translate(centerX, centerY);
		ctx.rotate(pointerRotationAngle);

		ctx.restore();

		// Highlight the selected item
		if (selectedItem !== null) {
			const highlightStartAngle = selectedIndex * angle + rotationAngle;
			const highlightEndAngle = (selectedIndex + 1) * angle + rotationAngle;

			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, highlightStartAngle, highlightEndAngle);
			ctx.closePath();

			ctx.save();
			ctx.fillStyle = '#22c55e';
			ctx.fill();
			ctx.restore();

			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(highlightStartAngle + angle / 2);
			ctx.fillStyle = '#FFFFFF';
			ctx.fillText(items[selectedIndex].toUpperCase(), radius / 2, 0);
			ctx.restore();
		}
	};

	useEffect(() => {
		drawWheel();
	}, [rotationAngle, selectedItem]);

	return (
		<div className='flex flex-col items-center'>
			<button
				className='p-2 mb-12 bg-green-500 rounded-full w-[80px] h-[80px] text-white font-bold hover:bg-green-200 transition-all ease-in duration-200'
				onClick={spinWheel}
				disabled={isSpinning}
			>
				SPIN
			</button>

			<canvas ref={canvasRef} width={width} height={height} />
		</div>
	);
};

export default SpinningWheel;
