import React, { useRef, useEffect, useState } from 'react';

const SpinningWheel = ({
	items,
	spinningDuration,
	spinningSpeed,
	width,
	height,
	onFinished,
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
			ctx.fillStyle = i % 2 === 0 ? '#FFFFFF' : '#F0F0F0';
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fill();

			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(startAngle + angle / 2);

			const maxTextWidth = radius * angle; // Maximum width available for the text within the section

			ctx.fillStyle = '#000000';
			ctx.font = `12px Arial`;
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(items[i], radius / 2, 0);
			ctx.restore();
		}

		// Highlight the selected item
		if (selectedItem !== null) {
			const selectedIndex = items.indexOf(selectedItem);
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
			ctx.fillText(items[selectedIndex], radius / 2, 0);
			ctx.restore();
		}
	};

	useEffect(() => {
		drawWheel();
	}, [rotationAngle, selectedItem]);

	return (
		<div>
			<button
				className='p-2 mt-3 bg-green-500 rounded-full w-[80px] h-[80px] text-white'
				onClick={spinWheel}
				disabled={isSpinning}
			>
				Spin
			</button>

			<canvas ref={canvasRef} width={width} height={height} />
		</div>
	);
};

export default SpinningWheel;
