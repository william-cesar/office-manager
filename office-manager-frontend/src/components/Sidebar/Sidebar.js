import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
	return (
		<aside className='Sidebar'>
			<div className='home-button'>
				<Link to='/'>
					<img src={process.env.PUBLIC_URL + '/images/home.png'} alt='home' />
				</Link>
			</div>
			<div className='nav-buttons'>
				<Link to='/profiles'>
					<img
						src={process.env.PUBLIC_URL + '/images/profiles.png'}
						alt='building'
					/>
				</Link>
				<Link to='/positions'>
					<img
						src={process.env.PUBLIC_URL + '/images/positions.png'}
						alt='chair'
					/>
				</Link>
				<Link to='/users'>
					<img
						src={process.env.PUBLIC_URL + '/images/users.png'}
						alt='two people'
					/>
				</Link>
			</div>
			<div className='email-button'>
				<a href='mailto:mailto@hotmail.com'>
					<img
						src={process.env.PUBLIC_URL + '/images/email.png'}
						alt='envelope'
					/>
				</a>
			</div>
		</aside>
	)
}
