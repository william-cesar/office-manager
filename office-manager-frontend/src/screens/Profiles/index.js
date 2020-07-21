import React from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import AddButton from '../../components/AddButton/AddButton'

export default function Profiles() {
	return (
		<div className='Profiles'>
			<Header name='perfil' table='profiles' />
			<Sidebar />
			<div className='body'>
				<Label name='Perfis' />
				<AddButton name='perfil' />
			</div>
		</div>
	)
}
