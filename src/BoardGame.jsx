import React, {useState} from 'react';
import './App.css';
import {pipe, pluck, where} from 'ramda';

const setSquare = (origin, unitCoordinate) => (point, axe) => origin[axe] + (point * unitCoordinate[axe]);

const colors = {
	top: 'yellow',
	bottom: 'blue',
	right: 'red',
	left: 'green',
	path: 'gray',
};

const generateBoardGame = (length, scaleFactor = 0.25) => {
	const origin = {x: 1000 * scaleFactor / 2, y: 1000 * scaleFactor / 2};
	const unitCoordinate = {x: origin.x / length, y: origin.y / length};
	const boardGame = [origin];

	const squareSetter = setSquare(origin, unitCoordinate);
	const createSquare = (x, y, kind, color = colors.path) =>
		({x: squareSetter(x, 'x'), y: squareSetter(y, 'y'), ...kind, color});

	for (let i = 1; i <= length; i++) {
		boardGame.push(
			createSquare(-i, -1, {kind: i === length ? 'spawn' : 'path', value: 1}, i === length ? colors.left : colors.path),
			createSquare(i, 1, {kind: 'spawn', value: 1}, i === length ? colors.right : colors.path),
			createSquare(-1, i, {kind: 'spawn', value: 1}, i === length ? colors.bottom : colors.path),
			createSquare(1, -i, {kind: 'spawn', value: 1}, i === length ? colors.top : colors.path),
			createSquare(i, -1, {kind: 'path', value: 1}),
			createSquare(-i, 1, {kind: 'path', value: 1}),
			createSquare(1, i, {kind: 'path', value: 1}),
			createSquare(-1, -i, {kind: 'path', value: 1}),
			createSquare(i, 0, {kind: 'throne', value: 6 - i + 1}, colors.right),
			createSquare(-i, 0, {kind: 'throne', value: 6 - i + 1}, colors.left),
			createSquare(0, i, {kind: 'throne', value: 6 - i + 1}, colors.bottom),
			createSquare(0, -i, {kind: 'throne', value: 6 - i + 1}, colors.top),
		);
	}

	boardGame.push(
		createSquare(0, length + 1, {kind: 'path', value: 1}),
		createSquare(0, -length - 1, {kind: 'path', value: 1}),
		createSquare(-length - 1, 0, {kind: 'path', value: 1}),
		createSquare(length + 1, 0, {kind: 'path', value: 1}),
		createSquare(-(length + 1), -1, {kind: 'path', value: 1}),
		createSquare(-(length + 1), 1, {kind: 'path', value: 1}),
		createSquare(length + 1, -1, {kind: 'path', value: 1}),
		createSquare(length + 1, 1, {kind: 'path', value: 1}),
		createSquare(1, length + 1, {kind: 'path', value: 1}),
		createSquare(-1, -(length + 1), {kind: 'path', value: 1}),
		createSquare(-1, length + 1, {kind: 'path', value: 1}),
		createSquare(1, -(length + 1), {kind: 'path', value: 1}),
	);
	return boardGame;// .sort(compareCoords); // .sort((a, b) => a.y);
};

const getSpawns = boardGame => boardGame.filter(obj => obj.kind === 'spawn');

const BoardGame = ({scaleFactor}) => {
	const length = 6;
	const boardGame = generateBoardGame(length, scaleFactor);
	const origin = boardGame[0];

	const [playerPosition, setPlayerPosition] = useState(getSpawns(boardGame));

	console.log(playerPosition);

	return (
		<div className='board-game'>
			<div className={'board-game-content'}>
				{boardGame.map((box, id) => (
					<div key={id} className={'box'} style={{
						left: `${box.x}px`,
						top: `${box.y}px`,
						width: origin.x / length,
						height: origin.y / length,
						backgroundColor: box.color || 'gray',
					}}>
						{id}
					</div>
				))}
			</div>
		</div>
	);
};

export default BoardGame;
