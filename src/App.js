import React from 'react';
import './App.css';


const generateBoardGame = (length, {width, height}) => {
    width *= 25 / 100
    height *= 25 / 100
    const origin = {
        x: Number(width / 2),
        y: Number(height / 2)
    }
    const unitCoordinate = {
        x: origin.x / length,
        y: origin.y / length
    }
    let boargGame = [origin];
    for (var i = 1; i <= length; i++) {
        boargGame.push(
            [
                {...origin, x: origin.x + i * unitCoordinate.x, color: "red"},
                {...origin, x: origin.x - i * unitCoordinate.x, color: 'red'},
                {...origin, y: origin.y + i * unitCoordinate.y, color: "red"},
                {...origin, y: origin.y - i * unitCoordinate.y, color: 'red'},

                {x: origin.x + i * unitCoordinate.x, y: origin.y - unitCoordinate.y, color: "blue"},
                {x: origin.x - i * unitCoordinate.x, y: origin.y - unitCoordinate.y, color: "blue"},
                {x: origin.x - i * unitCoordinate.x, y: origin.y + unitCoordinate.y, color: "blue"},
                {x: origin.x + i * unitCoordinate.x, y: origin.y + unitCoordinate.y, color: "blue"},


            ]
        )
    }
    return boargGame.flat();
}

const PlateauJeu = () => {
    const length = 2;
    const boardGame = generateBoardGame(length, window.screen);
    const origin = boardGame[0];
    return (
        <div className="plateau-jeu">
            {boardGame.map((pion, id) => (
                <div key={id} style={{
                    left: `${pion.x}px`,
                    top: `${pion.y}px`,
                    border: "1px solid black",
                    position: "absolute",
                    width: origin.x / length,
                    height: origin.y / length,
                    backgroundColor: pion.color || "blue"
                }}>
                    {id}
                </div>
            ))}
        </div>
    );
};

export default PlateauJeu;
