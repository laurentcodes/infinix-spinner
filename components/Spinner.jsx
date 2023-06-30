import React, { useRef, useEffect, useState } from 'react';

// const SpinningWheel = ({
// 	items,
// 	itemColors,
// 	spinningDuration,
// 	spinningSpeed,
// 	width,
// 	height,
// 	onFinished,
// 	isMobile,
// }) => {
// 	const canvasRef = useRef(null);
// 	const [selectedItem, setSelectedItem] = useState(null);
// 	const [isSpinning, setIsSpinning] = useState(false);
// 	const [rotationAngle, setRotationAngle] = useState(0);

// 	const spinWheel = () => {
// 		setIsSpinning(true);
// 		setSelectedItem(null);

// 		const randomIndex = Math.floor(Math.random() * items.length);
// 		const selectedItem = items[randomIndex];

// 		const targetAngle =
// 			360 * spinningDuration + randomIndex * (360 / items.length);

// 		let currentAngle = 0;

// 		const spinInterval = setInterval(() => {
// 			currentAngle += spinningSpeed;

// 			if (currentAngle >= targetAngle) {
// 				clearInterval(spinInterval);
// 				setIsSpinning(false);
// 				setSelectedItem(selectedItem);
// 				onFinished(selectedItem); // Call the onFinished function with the selected item
// 			}

// 			setRotationAngle(currentAngle);
// 		}, spinningSpeed);
// 	};

// 	const drawWheel = () => {
// 		const canvas = canvasRef.current;
// 		const ctx = canvas.getContext('2d');

// 		const spinButtonSize = isMobile ? 0.17 : 0.19;

// 		const radius = Math.min(canvas.width, canvas.height) / 2;
// 		const centerX = canvas.width / 2;
// 		const centerY = canvas.height / 2;
// 		const angle = (2 * Math.PI) / items.length;

// 		ctx.clearRect(0, 0, canvas.width, canvas.height);

// 		for (let i = 0; i < items.length; i++) {
// 			const startAngle = i * angle + rotationAngle;
// 			const endAngle = (i + 1) * angle + rotationAngle;

// 			ctx.beginPath();
// 			ctx.fillStyle = itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0'); // Use custom color if available, otherwise alternate between white and light gray
// 			ctx.moveTo(centerX, centerY);
// 			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
// 			ctx.closePath();
// 			ctx.fill();

// 			ctx.save();
// 			ctx.translate(centerX, centerY);
// 			ctx.rotate(startAngle + angle / 2);

// 			ctx.fillStyle = selectedItem === i ? '#22c55e' : '#fff'; // Set color to red for selected item, otherwise black
// 			ctx.font = `bold ${isMobile ? '12px' : '20px'} Arial`;
// 			ctx.textAlign = 'center';
// 			ctx.textBaseline = 'middle';
// 			ctx.fillText(items[i].toUpperCase(), radius / 2, 0);
// 			ctx.restore();
// 		}

// 		// Highlight the selected item
// 		if (selectedItem !== null) {
// 			const selectedIndex = items.indexOf(selectedItem);
// 			const highlightStartAngle = selectedIndex * angle + rotationAngle;
// 			const highlightEndAngle = (selectedIndex + 1) * angle + rotationAngle;

// 			ctx.beginPath();
// 			ctx.moveTo(centerX, centerY);
// 			ctx.arc(centerX, centerY, radius, highlightStartAngle, highlightEndAngle);
// 			ctx.closePath();

// 			ctx.save();
// 			ctx.fillStyle = '#22c55e';
// 			ctx.fill();
// 			ctx.restore();

// 			ctx.save();
// 			ctx.translate(centerX, centerY);
// 			ctx.rotate(highlightStartAngle + angle / 2);
// 			ctx.fillStyle = '#FFFFFF';
// 			ctx.fillText(items[selectedIndex].toUpperCase(), radius / 2, 0);
// 			ctx.restore();
// 		}

// 		// Draw the spin button in the center
// 		const buttonSize = radius * spinButtonSize; // Adjust the size of the button relative to the radius
// 		ctx.fillStyle = '#22c55e'; // Green color for the button
// 		ctx.beginPath();
// 		ctx.arc(centerX, centerY, buttonSize, 0, 2 * Math.PI);
// 		ctx.fill();

// 		ctx.fillStyle = '#fff'; // White color for the button text
// 		ctx.font = `bold ${isMobile ? '13px' : '16px'} Arial`;
// 		ctx.textAlign = 'center';
// 		ctx.textBaseline = 'middle';
// 		ctx.fillText('SPIN', centerX, centerY);

// 		// Draw white border
// 		const borderWidth = 2; // Width of the white border
// 		ctx.strokeStyle = '#fff'; // White color for the border
// 		ctx.lineWidth = borderWidth;
// 		ctx.beginPath();
// 		ctx.arc(centerX, centerY, radius - borderWidth / 2, 0, 2 * Math.PI);
// 		ctx.stroke();
// 	};

// 	useEffect(() => {
// 		drawWheel();
// 	}, [rotationAngle, selectedItem]);

// 	return (
// 		<div className='flex flex-col items-center'>
// 			<canvas
// 				ref={canvasRef}
// 				width={width}
// 				height={height}
// 				onClick={spinWheel}
// 				style={{ cursor: 'pointer' }}
// 			/>
// 		</div>
// 	);
// };

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
	const [imagesLoaded, setImagesLoaded] = useState(false);

	const spinWheel = () => {
		setIsSpinning(true);
		setSelectedItem(null);

		const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
		const weightedRandom = Math.random() * totalWeight;

		let accumulatedWeight = 0;
		let selectedItemValue = null;

		for (const item of items) {
			accumulatedWeight += item.weight;

			if (weightedRandom <= accumulatedWeight) {
				selectedItemValue = item.value;
				break;
			}
		}

		const randomIndex = items.findIndex(
			(item) => item.value === selectedItemValue
		);

		const targetAngle =
			360 * spinningDuration + randomIndex * (360 / items.length);

		let currentAngle = 0;

		const spinInterval = setInterval(() => {
			currentAngle += spinningSpeed;

			if (currentAngle >= targetAngle) {
				clearInterval(spinInterval);
				setIsSpinning(false);
				setSelectedItem(selectedItemValue);
				onFinished(selectedItemValue); // Call the onFinished function with the selected item
			}

			setRotationAngle(currentAngle);
		}, spinningSpeed);
	};

	const loadImage = (src) => {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.onerror = (error) => reject(error);
			image.src = src;
		});
	};

	useEffect(() => {
		const loadImages = async () => {
			try {
				await Promise.all(items.map((item) => loadImage(item.src)));
				setImagesLoaded(true);
			} catch (error) {
				console.error('Error loading images:', error);
			}
		};

		loadImages();
	}, []);

	const drawWheel = () => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return; // Return early if canvas is not available
		}

		const ctx = canvas.getContext('2d');

		const spinButtonSize = isMobile ? 0.17 : 0.19;

		const imageXOffset = isMobile ? 115 : 190;
		const imageYOffset = 5;

		const radius = Math.min(canvas.width, canvas.height) / 2;
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const angle = (2 * Math.PI) / items.length;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		for (let i = 0; i < items.length; i++) {
			const startAngle = i * angle + rotationAngle;
			const endAngle = (i + 1) * angle + rotationAngle;

			ctx.beginPath();
			ctx.fillStyle =
				selectedItem === items[i].value
					? '#80ed99'
					: itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
			ctx.closePath();
			ctx.fill();

			ctx.save();
			ctx.translate(centerX, centerY);
			ctx.rotate(startAngle + angle / 2);

			if (imagesLoaded) {
				const image = new Image();
				image.src = items[i].src;

				const aspectRatio = image.width / image.height;

				// Adjust the desired width and height for the images
				const desiredImageWidth = radius * 0.4; // Change this value as desired
				const desiredImageHeight = desiredImageWidth / aspectRatio;

				const imageX = -desiredImageWidth / 2 + imageXOffset; // Position the image in the center horizontally
				const imageY = -desiredImageHeight / 2 - imageYOffset; // Position the image in the center vertically

				ctx.drawImage(
					image,
					imageX,
					imageY,
					desiredImageWidth,
					desiredImageHeight
				);
			}

			ctx.restore();
		}

		const buttonSize = radius * spinButtonSize;
		ctx.fillStyle = '#80ed99';
		ctx.beginPath();
		ctx.arc(centerX, centerY, buttonSize, 0, 2 * Math.PI);
		ctx.fill();

		ctx.fillStyle = '#fff';
		ctx.font = `bold ${isMobile ? '13px' : '16px'} Arial`;
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText('SPIN', centerX, centerY);

		const borderWidth = 2;
		ctx.strokeStyle = '#fff';
		ctx.lineWidth = borderWidth;
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius - borderWidth / 2, 0, 2 * Math.PI);
		ctx.stroke();
	};

	useEffect(() => {
		drawWheel();
	}, [rotationAngle, selectedItem, imagesLoaded]);

	return (
		<div className='flex flex-col items-center'>
			{imagesLoaded && (
				<canvas
					ref={canvasRef}
					width={width}
					height={height}
					onClick={spinWheel}
					style={{ cursor: 'pointer' }}
				/>
			)}
		</div>
	);
};

export default SpinningWheel;
