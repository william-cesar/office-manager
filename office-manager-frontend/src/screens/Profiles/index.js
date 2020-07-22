import React, { useState } from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import Cards from '../../components/Cards/Cards'

export default function Profiles() {
	const [queryData, setQueryData] = useState('')

	const getQueryData = (data) => {
		setQueryData(data)
	}

	return (
		<div className='Profiles'>
			<Header name='perfil' table='profiles' cardData={getQueryData} />
			<Sidebar />
			<div className='body'>
				<Label name='Perfis' />
				<Cards cardInfo={queryData} table='profiles' />
			</div>
		</div>
	)
}
