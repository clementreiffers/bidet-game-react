import React from 'react';
import './App.css';

const generateBoardGame = (length, {width, height}) => {
	const scaleFactor = 0.25;
	const origin = {x: width * scaleFactor / 2, y: height * scaleFactor / 2};
	const unitCoordinate = {x: origin.x / length, y: origin.y / length};
	const boardGame = [origin];

	for (let i = 1; i <= length; i++) {
		boardGame.push(
			{...origin, x: origin.x + i * unitCoordinate.x, color: 'red'},
			{...origin, x: origin.x - i * unitCoordinate.x, color: 'green'},
			{...origin, y: origin.y + i * unitCoordinate.y, color: 'blue'},
			{...origin, y: origin.y - i * unitCoordinate.y, color: 'yellow'},
			{x: origin.x + i * unitCoordinate.x, y: origin.y - unitCoordinate.y},
			{
				x: origin.x - i * unitCoordinate.x,
				y: origin.y - unitCoordinate.y,
				color: i === length ? 'green' : 'gray',
			},
			{
				x: origin.x + i * unitCoordinate.x,
				y: origin.y + unitCoordinate.y,
				color: i === length ? 'red' : 'gray',
			},
			{x: origin.x - i * unitCoordinate.x, y: origin.y + unitCoordinate.y},
			{
				x: origin.x - unitCoordinate.x,
				y: origin.y + i * unitCoordinate.y,
				color: i === length ? 'blue' : 'gray',
			},
			{x: origin.x + unitCoordinate.x, y: origin.y + i * unitCoordinate.y},
			{
				x: origin.x + unitCoordinate.x,
				y: origin.y - i * unitCoordinate.y,
				color: i === length ? 'yellow' : 'gray',
			},
			{x: origin.x - unitCoordinate.x, y: origin.y - i * unitCoordinate.y},
		);
	}

	boardGame.push(
		{x: origin.x, y: origin.y + (length + 1) * unitCoordinate.y},
		{x: origin.x, y: origin.y - (length + 1) * unitCoordinate.y},
		{y: origin.y, x: origin.x - (length + 1) * unitCoordinate.x},
		{y: origin.y, x: origin.x + (length + 1) * unitCoordinate.x},
		{y: origin.y - unitCoordinate.y, x: origin.x - (length + 1) * unitCoordinate.x},
		{y: origin.y + unitCoordinate.y, x: origin.x - (length + 1) * unitCoordinate.x},
		{y: origin.y - unitCoordinate.y, x: origin.x + (length + 1) * unitCoordinate.x},
		{y: origin.y + unitCoordinate.y, x: origin.x + (length + 1) * unitCoordinate.x},
		{x: origin.x + unitCoordinate.x, y: origin.y + (length + 1) * unitCoordinate.y},
		{x: origin.x - unitCoordinate.x, y: origin.y - (length + 1) * unitCoordinate.y},
		{x: origin.x - unitCoordinate.x, y: origin.y + (length + 1) * unitCoordinate.y},
		{x: origin.x + unitCoordinate.x, y: origin.y - (length + 1) * unitCoordinate.y},
	);

	return boardGame;
};

const BoardGame = () => {
	const length = 3;
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
					backgroundColor: pion.color || 'gray',
				}}>
					{id}
				</div>
			))}
		</div>
	);
};

export default BoardGame;
