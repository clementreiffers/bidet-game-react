import React, {useState} from 'react';
import BoardGame from './BoardGame';
// Import BoardGame from './BoardGame';

const App = () => {
	const [state, setState] = useState({
		scaleFactor: 0.5,
	});

	const handleScaleFactor = event => {
		console.log(event);
		setState({
			...state,
			scaleFactor: event.target.value,
		});
	};

	return (<>
		<input type={'range'} value={state.scaleFactor} onChange={handleScaleFactor} min={0} max={1} step={0.1}/>
        scaleFactor : {state.scaleFactor}
		<BoardGame scaleFactor={state.scaleFactor}/>
	</>);
};

export default App;
