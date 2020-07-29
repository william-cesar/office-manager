import React from 'react'
import './EditDelete.css'

export default function EditDelete({ status }) {
	return (
		<div className='EditDelete'>
			<button className='edit'>Editar</button>
			{status === false ? (
				<button className='delete' disabled>
					Deletar
				</button>
			) : (
				<button className='delete'>Deletar</button>
			)}
		</div>
	)
}
