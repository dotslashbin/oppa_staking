import React from 'react'
import styles from '../styles/Home.module.css'

const Summary = (props) => (
	<div className={ styles.summary }>
		<div>
			OPPA: <span className={ styles.highlightedText }>{ props.balance }</span>
		</div>
		<div>
			Your current staking delgation: <span className={ styles.highlightedText } >1,000,000,000</span>
		</div>
		<div>
			Next rewards comes in: <psan className={ styles.highlightedText }>10 mins, 23 seconds</psan>
		</div>
	</div>
)

export default Summary