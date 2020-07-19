import React, { useState, useEffect } from 'react'
import axios from 'axios'

import './styles.css'

export default function Home() {
	const [numberOfActiveProfiles, setNumberOfActiveProfiles] = useState(0)
	const [numberOfActivePositions, setNumberOfActivePositions] = useState(0)
	const [numberOfActiveUsers, setNumberOfActiveUsers] = useState(0)

	useEffect(() => {
		const getActiveProfiles = () => {
			const url = `http://localhost:3001/profiles/active/1`
			axios.get(url).then((res) => {
				setNumberOfActiveProfiles(res.data.data.count)
			})
		}
		getActiveProfiles()

		const getActivePositions = () => {
			const url = `http://localhost:3001/positions/active/1`
			axios.get(url).then((res) => {
				setNumberOfActivePositions(res.data.data.count)
			})
		}
		getActivePositions()

		const getActiveUsers = () => {
			const url = `http://localhost:3001/users/active/1`
			axios.get(url).then((res) => {
				setNumberOfActiveUsers(res.data.data.count)
			})
		}
		getActiveUsers()
	}, [])

	return (
		<div className='Home'>
			<div className='left-section'>
				<div className='section-logo'>
					<div className='circle'>
						<img
							src={process.env.PUBLIC_URL + '/images/profiles.png'}
							alt='building'
						/>
					</div>
				</div>
				<div className='section-label'>
					<h3>{numberOfActiveProfiles} Perfis</h3>
				</div>
				<div className='section-instruction'>
					<p>Clique em 'Visualizar perfis' para gerenciar seus perfis.</p>
				</div>
				<div className='section-button'>
					<button>Visualizar perfis</button>
				</div>
			</div>
			<div className='middle-section'>
				<div className='section-logo'>
					<div className='circle'>
						<img
							src={process.env.PUBLIC_URL + '/images/positions.png'}
							alt='building'
						/>
					</div>
				</div>
				<div className='section-label'>
					<h3>{numberOfActivePositions} Cargos</h3>
				</div>
				<div className='section-instruction'>
					<p>Clique em 'Visualizar cargos' para gerenciar seus cargos.</p>
				</div>
				<div className='section-button'>
					<button>Visualizar cargos</button>
				</div>
			</div>
			<div className='right-section'>
				<div className='section-logo'>
					<div className='circle'>
						<img
							src={process.env.PUBLIC_URL + '/images/users.png'}
							alt='building'
						/>
					</div>
				</div>
				<div className='section-label'>
					<h3>{numberOfActiveUsers} Usuários</h3>
				</div>
				<div className='section-instruction'>
					<p>Clique em 'Visualizar usuários' para gerenciar seus usuários.</p>
				</div>
				<div className='section-button'>
					<button>Visualizar usuários</button>
				</div>
			</div>
		</div>
	)
}
