import { Routes, Route } from 'react-router-dom';
import logo from './EPLogoName.png';
import Login from './Login.js'
import Trade from './Trade.js'
import Billing from './Billing.js'
import Transactions from './Transactions.js'

import './css/App.css';

function App() {
    return (
	<div className="App">
	    <div className="App-logo" >
		<img src={logo} alt="logo" />
	    </div>
	    <div className="App-header">
                EnergyChain
            </div>
	    <Routes>
		<Route path="/" element={<Login />} />
		<Route path="/billing" element={<Billing />} />
		<Route path="/trade" element={<Trade />} />
		<Route path="/transactions" element={<Transactions />} />
	    </Routes>
	</div>
    );
}



export default App;
