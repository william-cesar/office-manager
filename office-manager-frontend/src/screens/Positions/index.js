import React from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function Positions() {
	return (
		<div className='Positions'>
			<Header />
			<Sidebar />
			<div className='body'>
				<h1>Positions</h1>
			</div>
		</div>
	)
}
