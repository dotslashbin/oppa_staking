import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { REWARD_PERCENTAGE } from '../config'
import humanizeDuration from 'humanize-duration'

// Contract
import { OPPAStaking } from '../contract'

function Summary(props) {

	const { account, frequency, stakedAmount, startTime } = props

	const [ rewardsPercentage, setRewardsPercentage ] = useState(0)
	const [ integerMultiplier, setIntegerMultiplier ] = useState(0)
	const [ timeDifference, setTimeDifference ] = useState(0)

	useEffect(() => {
		OPPAStaking.methods.GetRewardsFrequencyInMinutes().call().then(result => setFrequency(result)).catch(error => console.log('ERROR fetching frequency in minutes', error))
		OPPAStaking.methods.GetStakeSummary().call({ from: account }).then(output => setTimeDifference(output.difference * 1000)).catch(_error => console.log('Error computing for time difference', _error ))
		OPPAStaking.methods.GetRewardsPercentagePerEpoch().call().then(result => {
			setRewardsPercentage(result)
			OPPAStaking.methods.GetIntegerMultiplier().call().then(result => {
				setIntegerMultiplier(result)
			}).catch(error => console.log('ERROR fetching integer multiplier', error))
		}).catch(error => console.log('ERROR fetching percentage per epoch', error))

	}, [startTime])

	const getRewardPercentage = (rewardsPercentage / integerMultiplier)

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
				Staking started: { humanizeDuration(timeDifference) }
			</div>
			<div>
				<hr />
			</div>
			<div>
			You are rewarded <span className={ styles.highlightedText }>{ getRewardPercentage }%</span> every <span className={ styles.highlightedText }>{ frequency }</span> minute(s)
			</div>
		</div>
	)
}

export default Summary