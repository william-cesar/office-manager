import React, { useState } from 'react'
import axios from 'axios'

import './Header.css'

export default function Header() {
	const [inputValue, setInputValue] = useState('*')
	const [radioValue, setRadioValue] = useState('active')

	const search = () => {
		const url = `http://localhost:3001/profiles/${radioValue}/${inputValue}/1`
		axios.get(url).then((res) => {
			console.log(res)
		})
	}

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			search()
		}
	}

	return (
		<header className='Header'>
			<div className='search-area' onKeyDown={handleKeyDown}>
				<input
					type='text'
					placeholder='Buscar perfil'
					onChange={(event) => setInputValue(event.target.value)}
				/>
			</div>
			<div
				className='radio-buttons'
				onChange={(event) => setRadioValue(event.target.value)}
			>
				<div className='radio'>
					<input type='radio' value='active' defaultChecked name='radio' />
					<label htmlFor='active'>Ativos</label>
				</div>
				<div className='radio'>
					<input type='radio' value='inactive' name='radio' />
					<label htmlFor='inactive'>Inativos</label>
				</div>
			</div>
			<div className='search-button'>
				<button onClick={search}>Buscar</button>
			</div>
		</header>
	)
}
