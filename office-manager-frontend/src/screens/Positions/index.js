import React from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import AddButton from '../../components/AddButton/AddButton'

export default function Positions() {
	return (
		<div className='Positions'>
			<Header name='cargos' table='positions' />
			<Sidebar />
			<div className='body'>
				<Label name='Cargos' />
				<AddButton name='cargo' />
			</div>
		</div>
	)
}
