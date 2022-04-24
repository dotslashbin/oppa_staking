import React from 'react'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown'


function Summary(props) {

	const { stakedAmount, nextEpoch } = props

	const countdownValue = 1000 * Number(nextEpoch)

	const renderer = ({ seconds, completed }) => {
		if (completed ){
			return "Reward credited..."
		} else {
			return `${ seconds } seconds`
		}
	}

	return (
		<div className={ styles.summary }>
			<div>
				OPPA: <span className={ styles.highlightedText }>{ props.balance }</span>
			</div>
			<div>
				Your current staking delgation: <span className={ styles.highlightedText } >{ stakedAmount }</span>
			</div>
			<div>
				Rewards collected: <span className={ styles.highlightedText } >{ props.totalRewards }</span>
			</div>
			<div>
				You will be getting: <span className={ styles.highlightedText }>(WIP)</span> in <Countdown date={ Date.now() + countdownValue } renderer={ renderer } />
			</div>
		</div>
	)
}

export default Summary