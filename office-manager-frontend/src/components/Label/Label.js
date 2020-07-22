import React from 'react'
import './Label.css'

import AddButton from '../AddButton/AddButton'

export default function Label({ name }) {
	return (
		<div className='Label'>
			<div className='title'>
				<h1>{name}</h1>
			</div>
			<AddButton name={name} />
		</div>
	)
}
