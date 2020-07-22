import React, { useState } from 'react'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import Cards from '../../components/Cards/Cards'

export default function Positions() {
	const [queryData, setQueryData] = useState('')

	const getQueryData = (data) => {
		setQueryData(data)
	}

	return (
		<div className='Positions'>
			<Header name='cargos' table='positions' cardData={getQueryData} />
			<Sidebar />
			<div className='body'>
				<Label name='Cargos' />
				<Cards cardInfo={queryData} table='positions' />
			</div>
		</div>
	)
}
