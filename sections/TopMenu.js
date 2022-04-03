import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const TopMenu = () => (
	<header className={ styles.topNavBar }>
		<div className='log-container'>
			<Image src='/images/logo.png' alt='OPPA logo' height={50} width={50}/>
		</div>
		<div className='wallet-connector'>
			<div>
				<button>Disconnect</button>
			</div>
		</div>
	</header>
)

export default TopMenu