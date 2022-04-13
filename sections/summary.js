import React from 'react'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown'


function Summary(props) {

	const renderer = ({ minutes, seconds, completed }) => {
		if (completed ){
			return "Reward credited..."
		} else {
			return `${ minutes } minutes and ${ seconds } seconds`
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
				You will be getting: <span className={ styles.highlightedText }>123321</span> in <Countdown date={ Date.now() + 15000000 } renderer={ renderer } />
			</div>
		</div>
	)
}

export default Summary