import { Routes, Route } from 'react-router-dom';
import logo from './EPLogoName.png';
import cityLogo from './ParlierCityIcon.png';
import Login from './Login.js'
import Overview from './Overview.js'
import Escrow from './Escrow.js'

import './css/App.css';

function App() {
    return (
	<div className="App">
	    <div className="City-logo">
		<img src={cityLogo} alt="logo" />
	    </div>
	    <div className="App-logo">
		<img src={logo} alt="logo" />
	    </div>
	    <div className="App-header">
                EnergyChain
            </div>
	    <Routes>
		<Route path="/" element={<Login />} />
		<Route path="/escrow" element={<Escrow />} /> 
		<Route path="/overview" element={<Overview />} /> 
	    </Routes>
	</div>
    );
}



export default App;
