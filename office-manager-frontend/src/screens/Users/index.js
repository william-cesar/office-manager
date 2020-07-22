import React, { useState } from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import Cards from '../../components/Cards/Cards'

export default function Users() {
	const [queryData, setQueryData] = useState('')

	const getQueryData = (data) => {
		setQueryData(data)
	}

	return (
		<div className='Users'>
			<Header name='usuários' table='users' cardData={getQueryData} />
			<Sidebar />
			<div className='body'>
				<Label name='Usuários' />
				<Cards cardInfo={queryData} table='users' />
			</div>
		</div>
	)
}
