import React from 'react'
import './Label.css'

export default function Label({ name }) {
	return (
		<div className='Label'>
			<h1>{name}</h1>
		</div>
	)
}
