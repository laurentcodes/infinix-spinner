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

	const loadImages = async () => {
		try {
			await Promise.all(items.map((item) => loadImage(item.src)));
			setImagesLoaded(true);
		} catch (error) {
			console.error('Error loading images:', error);
		}
	};

	useEffect(() => {
		loadImages();
	}, []);

	const drawWheel = () => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return; // Return early if canvas is not available
		}

		const ctx = canvas.getContext('2d');

		const spinButtonSize = isMobile ? 0.17 : 0.19;

		const imageXOffset = isMobile ? 110 : 170;
		const imageYOffset = 20;

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
					? '#22c55e'
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

				const imageWidth = radius * 0.4; // Adjust the image width as desired
				const imageHeight = radius * 0.4; // Adjust the image height as desired

				const imageX = -imageWidth / 2 + imageXOffset; // Position the image in the center horizontally
				const imageY = -imageHeight / 2 - imageYOffset; // Position the image in the center vertically

				ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
			}

			ctx.restore();
		}

		const buttonSize = radius * spinButtonSize;
		ctx.fillStyle = '#22c55e';
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
