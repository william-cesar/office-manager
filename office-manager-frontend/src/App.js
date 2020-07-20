import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'

import Home from './screens/Home'
import Profiles from './screens/Profiles'
import Positions from './screens/Positions'
import Users from './screens/Users'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Switch>
					<Route path='/' exact>
						<Home />
					</Route>
					<Route path='/profiles' exact>
						<Profiles />
					</Route>
					<Route path='/positions' exact>
						<Positions />
					</Route>
					<Route path='/users' exact>
						<Users />
					</Route>
				</Switch>
			</BrowserRouter>
		</div>
	)
}

export default App
