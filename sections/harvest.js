import React from 'react'
import styles from '../styles/Home.module.css'

const HarvestForm = () => (
	<div className={ styles.control }>
		<div>
			<button>Harvest rewards</button>
			<div>
				<span className={ styles.notices } >Harvesting rewards will undelegate ALL of your tokens</span>
			</div>
		</div>
	</div>
)

export default HarvestForm