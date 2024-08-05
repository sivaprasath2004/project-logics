import PinterestLayout from './components/PinterestLayout.js';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Slider } from './components/Slider.js';
import './styles.css';

function App() {
	return ( 
		<>
           <BrowserRouter>
		    <Routes>
				<Route path='/' element={<PinterestLayout />} />
				<Route path='/image/:id/:place' element={<Slider />} />
			</Routes> 
			</BrowserRouter>
	</>
	);
}

export default App;

