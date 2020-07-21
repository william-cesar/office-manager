import React from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import AddButton from '../../components/AddButton/AddButton'

export default function Users() {
	return (
		<div className='Users'>
			<Header name='usuários' table='users' />
			<Sidebar />
			<div className='body'>
				<Label name='Usuários' />
				<AddButton name='usuário' />
			</div>
		</div>
	)
}
