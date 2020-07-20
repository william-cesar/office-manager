import React from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function Profiles() {
	return (
		<div className='Profiles'>
			<Header />
			<Sidebar />
			<div className='body'>
				<h1>Profiles</h1>
			</div>
		</div>
	)
}
