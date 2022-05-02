import React from 'react'
import styles from '../styles/Home.module.css'
import Countdown from 'react-countdown'
import { REWARD_PERCENTAGE } from '../config'


function Summary(props) {

	const { stakedAmount, nextEpoch, nextReward } = props

	const countdownValue = 1000 * Number(nextEpoch)

	const renderer = ({ seconds, completed }) => {
		if (!completed ){
			return `${ seconds } seconds`
		} 
	}

	const getRewardPercentage = (amount) => ((REWARD_PERCENTAGE / 100)*amount).toFixed(2)

	return (
		<div className={ styles.summary }>
			<div>
				OPPA: <span className={ styles.highlightedText }>{ props.balance }</span>
			</div>
			<div>
				You currently have <span className={ styles.highlightedText } >{ stakedAmount }</span> on stake.
			</div>
			<div>
				Rewards accumulated: <span className={ styles.highlightedText } >{ props.totalRewards }</span>
			</div>
			<div>
				<hr />
			</div>
			<div>
				NEXT reward: <span className={ styles.highlightedText }>{ getRewardPercentage( props.balance ) } or { REWARD_PERCENTAGE }%</span> in <Countdown date={ Date.now() + countdownValue } renderer={ renderer } />
			</div>
		</div>
	)
}

export default Summary