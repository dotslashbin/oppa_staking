import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const TopMenu = (props) => (
	<header className={ styles.topNavBar }>
		<div className='log-container'>
			<Image src='/images/logo.png' alt='OPPA logo' height={50} width={50}/>
		</div>
		<div className='wallet-connector'>
			<div>
				{ props.active ? (
					<button onClick={ props.disconnect }>Disconnect</button>
				): (
					<button onClick={ props.connect }>Connect</button>
				)}
				
			</div>
		</div>
	</header>
)

export default TopMenu