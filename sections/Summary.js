import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { REWARD_PERCENTAGE } from '../config'
import moment from 'moment'

// Contract
import { OPPAStaking } from '../contract'

function Summary(props) {

	const { frequency, stakedAmount, startTime } = props

	const [ differenceInSeconds, setDifferenceInSeconds ] = useState(0)
	const [ rewardsPercentage, setRewardsPercentage ] = useState(0)
	const [ integerMultiplier, setIntegerMultiplier ] = useState(0)
	const [ remainingTime, setRemainingTime ] = useState(0)

	const hasEochElapsed = (difference) => difference > frequency

	useEffect(() => {
		OPPAStaking.methods.GetRewardsPercentagePerEpoch().call().then(result => setRewardsPercentage(result)).catch(error => console.log('ERROR in fetching rewars percentage ...', error))
		OPPAStaking.methods.GetRewardsFrequencyInMinutes().call().then(result => setFrequency(result)).catch(error => console.log('ERROR fetching frequency in minutes', error))

		const startingMoment = moment.unix(startTime)
		const currentMoment = moment(new Date())

		const difference = currentMoment.diff(startingMoment, 'seconds')

	}, [startTime])

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
			You are rewarded <span className={ styles.highlightedText }>{ REWARD_PERCENTAGE }%</span> every <span className={ styles.highlightedText }>{ frequency }</span> minute(s)
			</div>
		</div>
	)
}

export default Summary