import React, { useState } from 'react'
import axios from 'axios'

import './Header.css'

export default function Header({ name, table, cardData }) {
	const [inputValue, setInputValue] = useState('*')
	const [radioStatus, setRadioStatus] = useState('active')
	const [radioOrder, setRadioOrder] = useState('ASC')
	const [showOptionsMenu, setShowOptionsMenu] = useState(false)

	const search = () => {
		const url = `http://localhost:3001/${table}/${radioStatus}/${inputValue}/${radioOrder}/1`
		axios
			.get(url)
			.then((res) => {
				cardData(res.data.data)
			})
			.catch((err) => {
				const errorType = err.toString()
				cardData(errorType)
			})
		setShowOptionsMenu(false)
		setRadioStatus('active')
		setRadioOrder('ASC')
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			search()
		}
	}

	const showMenu = () => {
		setShowOptionsMenu(!showOptionsMenu)
	}

	return (
		<header className='Header'>
			<div className='search-area' onKeyDown={handleKeyDown}>
				<input
					type='text'
					placeholder={`Buscar ${name}`}
					onChange={(event) => setInputValue(event.target.value)}
				/>
			</div>
			<div className='search-button'>
				<button onClick={search}>Buscar</button>
			</div>
			<div className='options'>
				<button onClick={showMenu}>
					<div></div>
					<div></div>
					<div></div>
				</button>
			</div>
			{showOptionsMenu ? (
				<div className='options-menu'>
					<div
						className='radio-buttons-status'
						onChange={(event) => setRadioStatus(event.target.value)}
					>
						<div className='radio'>
							<input type='radio' value='active' defaultChecked name='status' />
							<label htmlFor='active'>Ativos</label>
						</div>
						<div className='radio'>
							<input type='radio' value='inactive' name='status' />
							<label htmlFor='inactive'>Inativos</label>
						</div>
					</div>
					<div
						className='radio-buttons-order'
						onChange={(event) => setRadioOrder(event.target.value)}
					>
						<div className='radio'>
							<input type='radio' value='ASC' defaultChecked name='order' />
							<label htmlFor='ASC'>A-Z</label>
						</div>
						<div className='radio'>
							<input type='radio' value='DESC' name='order' />
							<label htmlFor='DESC'>Z-A</label>
						</div>
					</div>
				</div>
			) : null}
		</header>
	)
}
