import React, { useState, useEffect } from 'react'
import './Cards.css'

export default function Cards({ cardInfo }) {
	const [cardContent, setCardContent] = useState('')

	useEffect(() => {
		setCardContent(cardInfo)
	}, [cardInfo])

	return (
		<div className='Cards'>
			<div className='cards-area'>{cardContent}</div>
		</div>
	)
}
