// ctx.beginPath();
// ctx.fillStyle =
// 	selectedItem === items[i].value
// 		? '#081c15'
// 		: itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
// ctx.moveTo(centerX, centerY);
// ctx.arc(centerX, centerY, radius, startAngle, endAngle);
// ctx.closePath();
// ctx.fill();

// ctx.beginPath();
// ctx.fillStyle = itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
// ctx.moveTo(centerX, centerY);
// ctx.arc(centerX, centerY, radius, startAngle, endAngle);
// ctx.closePath();
// ctx.fill();

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
// 	const [imagesLoaded, setImagesLoaded] = useState(false);

// 	const spinWheel = () => {
// 		setIsSpinning(true);
// 		setSelectedItem(null);

// 		const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
// 		const weightedRandom = Math.random() * totalWeight;

// 		let accumulatedWeight = 0;
// 		let selectedItemValue = null;

// 		for (const item of items) {
// 			accumulatedWeight += item.weight;

// 			if (weightedRandom <= accumulatedWeight) {
// 				selectedItemValue = item.value;
// 				break;
// 			}
// 		}

// 		const randomIndex = items.findIndex(
// 			(item) => item.value === selectedItemValue
// 		);

// 		const targetAngle =
// 			360 * spinningDuration + randomIndex * (360 / items.length);

// 		let currentAngle = 0;

// 		const spinInterval = setInterval(() => {
// 			currentAngle += spinningSpeed;

// 			if (currentAngle >= targetAngle) {
// 				clearInterval(spinInterval);
// 				setIsSpinning(false);
// 				setSelectedItem(selectedItemValue);
// 				onFinished(selectedItemValue); // Call the onFinished function with the selected item
// 			}

// 			setRotationAngle(currentAngle);
// 		}, spinningSpeed);
// 	};

// 	const loadImage = (src) => {
// 		return new Promise((resolve, reject) => {
// 			const image = new Image();
// 			image.onload = () => resolve(image);
// 			image.onerror = (error) => reject(error);
// 			image.src = src;
// 		});
// 	};

// 	useEffect(() => {
// 		const loadImages = async () => {
// 			try {
// 				await Promise.all(items.map((item) => loadImage(item.src)));
// 				setImagesLoaded(true);
// 			} catch (error) {
// 				console.error('Error loading images:', error);
// 			}
// 		};

// 		loadImages();
// 	}, []);

// 	// const drawWheel = () => {
// 	// 	const canvas = canvasRef.current;

// 	// 	if (!canvas) {
// 	// 		return; // Return early if canvas is not available
// 	// 	}

// 	// 	const ctx = canvas.getContext('2d');

// 	// 	const spinButtonSize = isMobile ? 0.17 : 0.15;

// 	// 	const imageXOffset = isMobile ? 115 : 190;
// 	// 	const imageYOffset = 5;

// 	// 	const radius = Math.min(canvas.width, canvas.height) / 2;
// 	// 	const centerX = canvas.width / 2;
// 	// 	const centerY = canvas.height / 2;
// 	// 	const angle = (2 * Math.PI) / items.length;

// 	// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

// 	// 	for (let i = 0; i < items.length; i++) {
// 	// 		const startAngle = i * angle + rotationAngle;
// 	// 		const endAngle = (i + 1) * angle + rotationAngle;

// 	// 		ctx.beginPath();
// 	// 		// ctx.fillStyle =
// 	// 		// 	selectedItem === items[i].value
// 	// 		// 		? '#081c15'
// 	// 		// 		: itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
// 	// 		ctx.fillStyle = itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
// 	// 		ctx.moveTo(centerX, centerY);
// 	// 		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
// 	// 		ctx.closePath();
// 	// 		ctx.fill();

// 	// 		ctx.save();
// 	// 		ctx.translate(centerX, centerY);
// 	// 		ctx.rotate(startAngle + angle / 2);

// 	// 		if (imagesLoaded) {
// 	// 			const image = new Image();
// 	// 			image.src = items[i].src;

// 	// 			const aspectRatio = image.width / image.height;

// 	// 			// Adjust the desired width and height for the images
// 	// 			const desiredImageWidth = radius * 0.4;
// 	// 			const desiredImageHeight = desiredImageWidth / aspectRatio;

// 	// 			const imageX = -desiredImageWidth / 2 + imageXOffset;
// 	// 			const imageY = -desiredImageHeight / 2 - imageYOffset;

// 	// 			ctx.drawImage(
// 	// 				image,
// 	// 				imageX,
// 	// 				imageY,
// 	// 				desiredImageWidth,
// 	// 				desiredImageHeight
// 	// 			);
// 	// 		}

// 	// 		ctx.restore();
// 	// 	}

// 	// 	const buttonSize = radius * spinButtonSize;
// 	// 	ctx.fillStyle = '#081c15';
// 	// 	ctx.beginPath();
// 	// 	ctx.arc(centerX, centerY, buttonSize, 0, 2 * Math.PI);
// 	// 	ctx.fill();

// 	// 	// Draw the triangle on the spin button (facing up)
// 	// 	const triangleSize = buttonSize * 0.9; // Adjust the triangle size as needed
// 	// 	const triangleX = centerX;
// 	// 	const triangleY = centerY - buttonSize; // Adjust the vertical position of the triangle

// 	// 	ctx.beginPath();
// 	// 	ctx.moveTo(triangleX, triangleY - triangleSize / 2); // Top point
// 	// 	ctx.lineTo(triangleX + triangleSize / 2, triangleY + triangleSize / 3); // Bottom right point
// 	// 	ctx.lineTo(triangleX - triangleSize / 2, triangleY + triangleSize / 3); // Bottom left point
// 	// 	ctx.closePath();

// 	// 	ctx.fillStyle = '#081c15'; // White color for the triangle
// 	// 	ctx.fill();

// 	// 	ctx.strokeStyle = '#081c15'; // White color for the triangle border
// 	// 	ctx.lineWidth = 2;
// 	// 	ctx.stroke();

// 	// 	// Draw the "SPIN" text on the button
// 	// 	ctx.fillStyle = '#fff';
// 	// 	ctx.font = `bold ${isMobile ? '13px' : '22px'} Arial`;
// 	// 	ctx.textAlign = 'center';
// 	// 	ctx.textBaseline = 'middle';
// 	// 	ctx.fillText('SPIN', centerX, centerY);

// 	// 	const borderWidth = 5;
// 	// 	ctx.strokeStyle = '#081c15';
// 	// 	ctx.lineWidth = borderWidth;
// 	// 	ctx.beginPath();
// 	// 	ctx.arc(centerX, centerY, radius - borderWidth / 2, 0, 2 * Math.PI);
// 	// 	ctx.stroke();
// 	// };

// 	// const drawWheel = () => {
// 	// 	const canvas = canvasRef.current;

// 	// 	if (!canvas) {
// 	// 		return; // Return early if canvas is not available
// 	// 	}

// 	// 	const ctx = canvas.getContext('2d');

// 	// 	const spinButtonSize = isMobile ? 0.17 : 0.15;

// 	// 	const imageXOffset = isMobile ? 115 : 190;
// 	// 	const imageYOffset = 5;

// 	// 	const radius = Math.min(canvas.width, canvas.height) / 2;
// 	// 	const centerX = canvas.width / 2;
// 	// 	const centerY = canvas.height / 2;
// 	// 	const angle = (2 * Math.PI) / items.length;

// 	// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

// 	// 	for (let i = 0; i < items.length; i++) {
// 	// 		const startAngle = i * angle + rotationAngle;
// 	// 		const endAngle = (i + 1) * angle + rotationAngle;

// 	// 		ctx.beginPath();
// 	// 		ctx.fillStyle = itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
// 	// 		ctx.moveTo(centerX, centerY);
// 	// 		ctx.arc(centerX, centerY, radius, startAngle, endAngle);
// 	// 		ctx.closePath();
// 	// 		ctx.fill();

// 	// 		ctx.save();
// 	// 		ctx.translate(centerX, centerY);
// 	// 		ctx.rotate(startAngle + angle / 2);

// 	// 		if (imagesLoaded) {
// 	// 			const image = new Image();
// 	// 			image.src = items[i].src;

// 	// 			const aspectRatio = image.width / image.height;

// 	// 			// Adjust the desired width and height for the images
// 	// 			const desiredImageWidth = radius * 0.4;
// 	// 			const desiredImageHeight = desiredImageWidth / aspectRatio;

// 	// 			const imageX = -desiredImageWidth / 2 + imageXOffset;
// 	// 			const imageY = -desiredImageHeight / 2 - imageYOffset;

// 	// 			ctx.drawImage(
// 	// 				image,
// 	// 				imageX,
// 	// 				imageY,
// 	// 				desiredImageWidth,
// 	// 				desiredImageHeight
// 	// 			);
// 	// 		}

// 	// 		ctx.restore();

// 	// 		if (selectedItem !== null && items[i].value === selectedItem) {
// 	// 			ctx.save();
// 	// 			ctx.translate(centerX, centerY);
// 	// 			ctx.rotate(startAngle + angle / 2);

// 	// 			const triangleSize = radius * spinButtonSize * 0.9; // Adjust the triangle size as needed
// 	// 			const triangleX = radius * 0.8; // Adjust the horizontal position of the triangle
// 	// 			const triangleY = 0; // Adjust the vertical position of the triangle

// 	// 			ctx.beginPath();
// 	// 			ctx.moveTo(triangleX, triangleY - triangleSize / 2); // Top point
// 	// 			ctx.lineTo(triangleX + triangleSize / 2, triangleY + triangleSize / 3); // Bottom right point
// 	// 			ctx.lineTo(triangleX - triangleSize / 2, triangleY + triangleSize / 3); // Bottom left point
// 	// 			ctx.closePath();

// 	// 			ctx.fillStyle = '#081c15'; // White color for the triangle
// 	// 			ctx.fill();

// 	// 			ctx.restore();
// 	// 		}
// 	// 	}

// 	// 	const buttonSize = radius * spinButtonSize;
// 	// 	ctx.fillStyle = '#081c15';
// 	// 	ctx.beginPath();
// 	// 	ctx.arc(centerX, centerY, buttonSize, 0, 2 * Math.PI);
// 	// 	ctx.fill();

// 	// 	// Draw the triangle on the spin button (facing up)
// 	// 	const triangleSize = buttonSize * 0.9; // Adjust the triangle size as needed
// 	// 	const triangleX = centerX;
// 	// 	const triangleY = centerY - buttonSize; // Adjust the vertical position of the triangle

// 	// 	ctx.beginPath();
// 	// 	ctx.moveTo(triangleX, triangleY - triangleSize / 2); // Top point
// 	// 	ctx.lineTo(triangleX + triangleSize / 2, triangleY + triangleSize / 3); // Bottom right point
// 	// 	ctx.lineTo(triangleX - triangleSize / 2, triangleY + triangleSize / 3); // Bottom left point
// 	// 	ctx.closePath();

// 	// 	ctx.fillStyle = '#081c15'; // White color for the triangle
// 	// 	ctx.fill();

// 	// 	ctx.strokeStyle = '#081c15'; // White color for the triangle border
// 	// 	ctx.lineWidth = 2;
// 	// 	ctx.stroke();

// 	// 	// Draw the "SPIN" text on the button
// 	// 	ctx.fillStyle = '#fff';
// 	// 	ctx.font = `bold ${isMobile ? '13px' : '22px'} Arial`;
// 	// 	ctx.textAlign = 'center';
// 	// 	ctx.textBaseline = 'middle';
// 	// 	ctx.fillText('SPIN', centerX, centerY);

// 	// 	const borderWidth = 5;
// 	// 	ctx.strokeStyle = '#081c15';
// 	// 	ctx.lineWidth = borderWidth;
// 	// 	ctx.beginPath();
// 	// 	ctx.arc(centerX, centerY, radius - borderWidth / 2, 0, 2 * Math.PI);
// 	// 	ctx.stroke();
// 	// };

// 	const drawWheel = () => {
// 		const canvas = canvasRef.current;

// 		if (!canvas) {
// 			return; // Return early if canvas is not available
// 		}

// 		const ctx = canvas.getContext('2d');

// 		const spinButtonSize = isMobile ? 0.17 : 0.15;

// 		const imageXOffset = isMobile ? 115 : 190;
// 		const imageYOffset = 5;

// 		const radius = Math.min(canvas.width, canvas.height) / 2;
// 		const centerX = canvas.width / 2;
// 		const centerY = canvas.height / 2;
// 		const angle = (2 * Math.PI) / items.length;

// 		ctx.clearRect(0, 0, canvas.width, canvas.height);

// 		for (let i = 0; i < items.length; i++) {
// 			const startAngle = i * angle + rotationAngle;
// 			const endAngle = (i + 1) * angle + rotationAngle;

// 			ctx.beginPath();
// 			ctx.fillStyle =
// 				selectedItem === items[i].value
// 					? '#081c15'
// 					: itemColors[i] || (i % 2 === 0 ? '#FFFFFF' : '#F0F0F0');
// 			ctx.moveTo(centerX, centerY);
// 			ctx.arc(centerX, centerY, radius, startAngle, endAngle);
// 			ctx.closePath();
// 			ctx.fill();

// 			ctx.save();
// 			ctx.translate(centerX, centerY);
// 			ctx.rotate(startAngle + angle / 2);

// 			if (imagesLoaded) {
// 				const image = new Image();
// 				image.src = items[i].src;

// 				const aspectRatio = image.width / image.height;

// 				// Adjust the desired width and height for the images
// 				const desiredImageWidth = radius * 0.4;
// 				const desiredImageHeight = desiredImageWidth / aspectRatio;

// 				const imageX = -desiredImageWidth / 2 + imageXOffset;
// 				const imageY = -desiredImageHeight / 2 - imageYOffset;

// 				ctx.drawImage(
// 					image,
// 					imageX,
// 					imageY,
// 					desiredImageWidth,
// 					desiredImageHeight
// 				);
// 			}

// 			ctx.restore();

// 			if (selectedItem !== null && items[i].value === selectedItem) {
// 				ctx.save();
// 				ctx.translate(centerX, centerY);
// 				ctx.rotate(startAngle + angle / 2);

// 				const circleSize = radius * spinButtonSize * 0.5; // Adjust the circle size as needed
// 				const circleX = radius * 0.9; // Adjust the horizontal position of the circle
// 				const circleY = 0; // Adjust the vertical position of the circle

// 				ctx.beginPath();
// 				ctx.arc(circleX, circleY, circleSize / 2, 0, 2 * Math.PI); // Draw the circle

// 				ctx.fillStyle = '#fff'; // Fill color for the circle
// 				ctx.fill();

// 				ctx.restore();
// 			}

// 			// if (selectedItem !== null && items[i].value === selectedItem) {
// 			// 	ctx.save();
// 			// 	ctx.translate(centerX, centerY);

// 			// 	const angleToCenter = Math.atan2(centerY, centerX);
// 			// 	const triangleAngle = startAngle + angle / 2;

// 			// 	const triangleSize = radius * spinButtonSize * 0.5; // Adjust the triangle size as needed
// 			// 	const triangleX = radius * 0.92; // Adjust the horizontal position of the triangle
// 			// 	const triangleY = 0; // Adjust the vertical position of the triangle

// 			// 	ctx.rotate(triangleAngle);

// 			// 	ctx.beginPath();
// 			// 	ctx.moveTo(triangleX, triangleY - triangleSize / 2); // Top point
// 			// 	ctx.lineTo(triangleX + triangleSize / 2, triangleY + triangleSize / 2); // Bottom right point
// 			// 	ctx.lineTo(triangleX - triangleSize / 2, triangleY + triangleSize / 2); // Bottom left point
// 			// 	ctx.closePath();

// 			// 	ctx.fillStyle = '#081c15'; // Fill color for the triangle
// 			// 	ctx.fill();

// 			// 	ctx.restore();
// 			// }
// 		}

// 		const buttonSize = radius * spinButtonSize;
// 		ctx.fillStyle = '#081c15';
// 		ctx.beginPath();
// 		ctx.arc(centerX, centerY, buttonSize, 0, 2 * Math.PI);
// 		ctx.fill();

// 		// Draw the triangle on the spin button (facing up)
// 		// const triangleSize = buttonSize * 0.9; // Adjust the triangle size as needed
// 		// const triangleX = centerX;
// 		// const triangleY = centerY - buttonSize; // Adjust the vertical position of the triangle

// 		// ctx.beginPath();
// 		// ctx.moveTo(triangleX, triangleY - triangleSize / 2); // Top point
// 		// ctx.lineTo(triangleX + triangleSize / 2, triangleY + triangleSize / 3); // Bottom right point
// 		// ctx.lineTo(triangleX - triangleSize / 2, triangleY + triangleSize / 3); // Bottom left point
// 		// ctx.closePath();

// 		// ctx.fillStyle = '#081c15'; // White color for the triangle
// 		// ctx.fill();

// 		// ctx.strokeStyle = '#081c15'; // White color for the triangle border
// 		// ctx.lineWidth = 2;
// 		// ctx.stroke();

// 		// Draw the "SPIN" text on the button
// 		ctx.fillStyle = '#fff';
// 		ctx.font = `bold ${isMobile ? '13px' : '22px'} Arial`;
// 		ctx.textAlign = 'center';
// 		ctx.textBaseline = 'middle';
// 		ctx.fillText('SPIN', centerX, centerY);

// 		const borderWidth = 5;
// 		ctx.strokeStyle = '#081c15';
// 		ctx.lineWidth = borderWidth;
// 		ctx.beginPath();
// 		ctx.arc(centerX, centerY, radius - borderWidth / 2, 0, 2 * Math.PI);
// 		ctx.stroke();
// 	};

// 	useEffect(() => {
// 		drawWheel();
// 	}, [rotationAngle, selectedItem, imagesLoaded]);

// 	return (
// 		<div className='flex flex-col items-center'>
// 			{imagesLoaded && (
// 				<canvas
// 					ref={canvasRef}
// 					width={width}
// 					height={height}
// 					onClick={spinWheel}
// 					style={{ cursor: 'pointer' }}
// 				/>
// 			)}
// 		</div>
// 	);
// };
