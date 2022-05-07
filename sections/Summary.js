import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { REWARD_PERCENTAGE } from '../config'
import moment from 'moment'

// Contract
import { OPPAStaking } from '../contract'


function Summary(props) {

	const { enableHarvest, stakedAmount, startTime } = props

	const [ differenceInSeconds, setDifferenceInSeconds ] = useState(0)
	const [ rewardsPercentage, setRewardsPercentage ] = useState(0)
	const [ integerMultiplier, setIntegerMultiplier ] = useState(0)
	const [ frequency, setFrequency ] = useState(0)

	const hasEochElapsed = (difference) => difference > frequency

	useEffect(() => {
		OPPAStaking.methods.GetRewardsPercentagePerEpoch().call().then(result => setRewardsPercentage(result)).catch(error => console.log('ERROR in fetching rewars percentage ...', error))
		OPPAStaking.methods.GetRewardsFrequencyInMinutes().call().then(result => setFrequency(result)).catch(error => console.log('ERROR fetching frequency in minutes', error))
		// OPPAStaking.methods.GetIntegerMultiplier().call().then(result => setIntegerMultiplier(result) ).catch(error => console.log('ERROR fetching Integer multiplier ...', error))
		

		const startingMoment = moment.unix(startTime)
		const currentMoment = moment(new Date())

		const difference = currentMoment.diff(startingMoment, 'seconds')

		const differenceInMinutes = difference / 60
		
		if(differenceInMinutes > frequency) {
			console.log('TOGGLE NA ...')
			enableHarvest(true)
		} else {
			console.log('NOPE MOT FOUND')
			enableHarvest(false)
		}

		const remaining = (difference / 60) % frequency

		// console.log('DEBUG ...', startingMoment.format("Y-M-D h:mm:ss a"), currentMoment.format("Y-M-D h:mm:ss a"), difference, difference / 60, remaining)



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
			NEXT reward: <span className={ styles.highlightedText }>{ getRewardPercentage( props.balance ) } or { REWARD_PERCENTAGE }%</span>
			{/* NEXT reward: <span className={ styles.highlightedText }>{ getRewardPercentage( props.balance ) } or { REWARD_PERCENTAGE }%</span> in <Countdown date={ Date.now() + countdownValue } renderer={ renderer } /> */}
			</div>
		</div>
	)
}

export default Summary