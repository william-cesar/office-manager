import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles.css'

import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import Label from '../../components/Label/Label'
import Cards from '../../components/Cards/Cards'
import EditDelete from '../../components/EditDelete/EditDelete'

export default function Profiles() {
	const [queryData, setQueryData] = useState('')
	const [cardInfo, setCardInfo] = useState('')

	const getQueryData = (data) => {
		setQueryData(data)
	}

	useEffect(() => {
		const defaultUrl = 'http://localhost:3001/profiles/active/*/ASC/1'
		axios
			.get(defaultUrl)
			.then((res) => {
				const result = res.data.data.rows
				const cardsArr = []
				for (const { id, profile_name, Positions } of result) {
					cardsArr.push(
						<div className='card-unit' key={id}>
							<div className='card-label'>
								<h2>{profile_name}</h2>
							</div>
							<div className='card-info'>
								<h4>{Positions.length} cargos ativos</h4>
							</div>
							<EditDelete />
						</div>
					)
				}
				setCardInfo(cardsArr)
			})
			.catch((err) => {
				const errorType = err.toString().substring(7, 14)
				if (errorType === 'Network') {
					const errorMsg = []
					errorMsg.push(
						<div key={errorType} className='error'>
							<h1>505 - Network Error</h1>
						</div>
					)
					setCardInfo(errorMsg)
				}
			})
	}, [])

	useEffect(() => {
		if (typeof queryData === 'object') {
			const cardsArr = []
			for (const { id, profile_name, Positions = [], isActive } of queryData) {
				cardsArr.push(
					<div className='card-unit' key={id}>
						<div className='card-label'>
							<h2>{profile_name}</h2>
						</div>
						<div className='card-info'>
							<h4>{Positions.length} cargos ativos</h4>
						</div>
						<EditDelete status={isActive} />
					</div>
				)
			}
			setCardInfo(cardsArr)
		}

		if (typeof queryData === 'string') {
			const errorType = queryData.substring(7, 14)

			if (errorType === 'Request') {
				const errorMsg = []
				errorMsg.push(
					<div className='error'>
						<h1>404 - Not Found</h1>
					</div>
				)
				setCardInfo(errorMsg)
			}

			if (errorType === 'Network') {
				const errorMsg = []
				errorMsg.push(
					<div className='error'>
						<h1>505 - Network Error</h1>
					</div>
				)
				setCardInfo(errorMsg)
			}
		}
	}, [queryData])

	return (
		<div className='Profiles'>
			<Header name='perfil' table='profiles' searchData={getQueryData} />
			<Sidebar />
			<div className='body'>
				<Label name='Perfis' />
				<Cards cardInfo={cardInfo} table='profiles' />
			</div>
		</div>
	)
}
