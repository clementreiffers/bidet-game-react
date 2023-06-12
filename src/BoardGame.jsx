import React from 'react';
import './App.css';

/* {x: origin.x + (i * unitCoordinate.x), y: origin.y - unitCoordinate.y},
{x: origin.x - (i * unitCoordinate.x), y: origin.y - unitCoordinate.y},
{x: origin.x - (i * unitCoordinate.x), y: origin.y + unitCoordinate.y},
{x: origin.x + (i * unitCoordinate.x), y: origin.y + unitCoordinate.y},

{y: origin.y + (i * unitCoordinate.y), x: origin.x - unitCoordinate.x},
*/

const generateBoardGame = (length, {width, height}, scaleFactor = 0.6) => {
	width *= scaleFactor;
	height *= scaleFactor;
	const origin = {x: width / 2, y: height / 2};
	const unitCoordinate = {x: origin.x / length, y: origin.y / length};
	const boardGame = [origin];

	for (let i = 1; i <= length; i++) {
		const skeletonCoords = [
			{...origin, x: origin.x + (i * unitCoordinate.x), color: 'red'},
			{...origin, x: origin.x - (i * unitCoordinate.x), color: 'red'},
			{...origin, y: origin.y + (i * unitCoordinate.y), color: 'red'},
			{...origin, y: origin.y - (i * unitCoordinate.y), color: 'red'},
		];
		boardGame.push(...skeletonCoords);
	}

	for (let i = 1; i <= length + 1; i++) {
		const edgeCoords = [
			{x: origin.x + (i * unitCoordinate.x), y: origin.y - unitCoordinate.y},
			{x: origin.x - (i * unitCoordinate.x), y: origin.y - unitCoordinate.y},
			{x: origin.x + (i * unitCoordinate.x), y: origin.y + unitCoordinate.y},
			{x: origin.x - (i * unitCoordinate.x), y: origin.y + unitCoordinate.y},
		];
		boardGame.push(...edgeCoords);
	}

	for (let i = 2; i <= length + 1; i++) {
		const cornerCoords = [
			{x: origin.x - unitCoordinate.x, y: origin.y + (i * unitCoordinate.y)},
			{x: origin.x + unitCoordinate.x, y: origin.y + (i * unitCoordinate.y)},
			{x: origin.x + unitCoordinate.x, y: origin.y - (i * unitCoordinate.y)},
			{x: origin.x - unitCoordinate.x, y: origin.y - (i * unitCoordinate.y)},
		];
		boardGame.push(...cornerCoords);
	}

	const additionalCoords = [
		{x: origin.x, y: origin.y + ((length + 1) * unitCoordinate.y)},
		{x: origin.x, y: origin.y - ((length + 1) * unitCoordinate.y)},
		{y: origin.y, x: origin.x - ((length + 1) * unitCoordinate.x)},
		{y: origin.y, x: origin.x + ((length + 1) * unitCoordinate.x)},
	];
	boardGame.push(...additionalCoords);

	return boardGame;
};

const BoardGame = () => {
	const length = 6;
	const boardGame = generateBoardGame(length, window.screen);
	const origin = boardGame[0];
	return (
		<div className='boardGame'>
			{boardGame.map((pion, id) => (
				<div key={id} style={{
					left: `${pion.x}px`,
					top: `${pion.y}px`,
					border: '1px solid black',
					position: 'absolute',
					width: origin.x / length,
					height: origin.y / length,
					backgroundColor: pion.color || 'blue',
				}}>
					{id}
				</div>
			))}
		</div>
	);
};

export default BoardGame;
