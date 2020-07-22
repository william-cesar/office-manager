import React from 'react'
import './AddButton.css'

export default function AddButton({ name }) {
	return (
		<div className='AddButton'>
			<button>{`Adicionar ${name}`}</button>
		</div>
	)
}
