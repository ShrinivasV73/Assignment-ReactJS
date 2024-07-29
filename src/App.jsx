import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '../public/vite.svg';
import './App.css';

import { MembersData } from './components/MembersData/MembersData';

const App = () => {
	return (
		<>
			<header>
				<h1>🍾 Who's Up for a Party? 🎊</h1>
			</header>
			<MembersData />
		</>
	);
};

export default App;
