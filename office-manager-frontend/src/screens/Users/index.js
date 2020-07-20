import React from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'

export default function Users() {
	return (
		<div className='Users'>
			<Header />
			<Sidebar />
			<div className='body'>
				<h1>Users</h1>
			</div>
		</div>
	)
}
