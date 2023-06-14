import React from 'react';
import './App.css';

const setSquare = (origin, unitCoordinate) => (point, axe) => origin[axe] + (point * unitCoordinate[axe]);

const colors = {
	top: 'yellow',
	bottom: 'blue',
	right: 'red',
	left: 'green',
	path: 'gray',
};

const generateBoardGame = (length, {width, height}, scaleFactor = 0.25) => {
	const origin = {x: width * scaleFactor / 2, y: height * scaleFactor / 2};
	const unitCoordinate = {x: origin.x / length, y: origin.y / length};
	const boardGame = [origin];

	const squareSetter = setSquare(origin, unitCoordinate);
	const createSquare = (x, y, color = colors.path) => ({x: squareSetter(x, 'x'), y: squareSetter(y, 'y'), color});

	for (let i = 1; i <= length; i++) {
		boardGame.push(
			createSquare(i, -1),
			createSquare(-i, -1, i === length ? colors.left : colors.path),
			createSquare(i, 1, i === length ? colors.right : colors.path),
			createSquare(-i, 1),
			createSquare(-1, i, i === length ? colors.blue : colors.path),
			createSquare(1, i),
			createSquare(1, -i, i === length ? colors.top : colors.path),
			createSquare(-1, -i),
			createSquare(i, 0, colors.right),
			createSquare(-i, 0, colors.left),
			createSquare(0, i, colors.bottom),
			createSquare(0, -i, colors.top),

		);
	}

	boardGame.push(
		createSquare(0, length + 1),
		createSquare(0, -length - 1),
		createSquare(-length - 1, 0),
		createSquare(length + 1, 0),
		createSquare(-(length + 1), -1),
		createSquare(-(length + 1), 1),
		createSquare(length + 1, -1),
		createSquare(length + 1, 1),
		createSquare(1, length + 1),
		createSquare(-1, -(length + 1)),
		createSquare(-1, length + 1),
		createSquare(1, -(length + 1)),
	);

	return boardGame;
};

const BoardGame = ({scaleFactor}) => {
	const length = 6;
	const boardGame = generateBoardGame(length, window.screen, scaleFactor);
	const origin = boardGame[0];
	return (
		<div className='board-game'>
			<div className={'board-game-content'}>
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
		</div>
	);
};

export default BoardGame;
