import React from 'react'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown'


function Summary(props) {

	const renderer = ({ hours, minutes, seconds, completed }) => {
		if (completed ){
			return "Reward credited..."
		} else {
			return `${ minutes }: ${ seconds }`
		}
	}

	return (
		<div className={ styles.summary }>
			<div>
				OPPA: <span className={ styles.highlightedText }>{ props.balance }</span>
			</div>
			<div>
				Your current staking delgation: <span className={ styles.highlightedText } >1,000,000,000</span>
			</div>
			<div>
				Rewards collected: <span className={ styles.highlightedText } >1,234,456</span>
			</div>
			<div>
				Next rewards comes in: <psan className={ styles.highlightedText }><Countdown date={ Date.now() + 15000000 } renderer={ renderer } /></psan>
			</div>
		</div>
	)
}

export default Summary