import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

function HarvestForm(props) {
	
	const [ showHarvest, setShowHarvest ] = useState(true)

	const handleHarvest = () => {
		props.unstake()
		setShowHarvest(false)
	}

	return (
		<div className={ styles.control }>
			<div>
				{ showHarvest? (<button onClick={ handleHarvest }>Harvest rewards</button>): (<p>Your tokens coming your way! please wait ...</p>) }
				<div>
					<span className={ styles.notices } >Harvesting rewards will undelegate ALL of your tokens</span>
				</div>
			</div>
		</div>
	)
} 



export default HarvestForm