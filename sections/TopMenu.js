import React from 'react'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import packageJson from '../package.json'

const TopMenu = (props) => (
	<header className={ styles.topNavBar }>
		<div className='log-container'>
			<Image src='/images/Oppa_Logo.png' alt='OPPA logo' height={40} width={150}/>
			<div className={ styles.versionDisplay } >version: { packageJson.version }</div>
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