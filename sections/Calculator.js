import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { OPPAStaking } from '../contract'

import { GetAllowedStakablePercentage, GetMinutesFromTimeUnit, GetPercentageFromValue } from '../app/utils'

const epochPeriods = ['Day', 'Month', 'Year']

function Calculator(props)  {

	const [ activeEpoch, setActiveEpoh ] = useState('Year')
	const [ baseBalance, setBaseBalance ] = useState('')
	const [ frequency, setFrequency ] = useState(0)
	const [ integerMultiplier, setIntegerMultiplier ] = useState(0)
	const [ projectionInput, setProjectionInput ] = useState('')
	const [ resultingBalance, setResultingBalance ] = useState('')
	const [ rewardsPercentage, setRewardsPercentage ] = useState(0)
	const [ totalEarnings, setTotalEarnings ] = useState('')

	const generate = () => {
		const minutesFromTimeUnit = GetMinutesFromTimeUnit(activeEpoch)

		if(minutesFromTimeUnit === 0) {
			return
		}
		
		const totalEarned = getTotalEarned(minutesFromTimeUnit)
		setTotalEarnings(totalEarned.toString())
		setResultingBalance(getResultingBalance(totalEarned).toString())
	}

	const getResultingBalance = (totalEarned) => Number(baseBalance) + totalEarned

	const getTotalEarned = (minutesFromTimeUnit) => {

		let totalEarned = 0 
		
		const numberOfEpochs = (parseInt(projectionInput) * minutesFromTimeUnit / frequency)
		const percentagePerEcoh = (rewardsPercentage/100)*Number(baseBalance)
		totalEarned = (percentagePerEcoh/integerMultiplier) * numberOfEpochs	

		return totalEarned
	}


	const updateBaseBalance = (event) => {
		if(event.target.validity.valid) {
			setBaseBalance(event.target.value)
		}
	}

	const updateProjectionInput = (event) => {
		if (event.target.validity.valid) {
			setProjectionInput(event.target.value)
		}
	}

	const resetCalculator = () => {
		setActiveEpoh('Year')
		setBaseBalance('')
		setProjectionInput('')
		setTotalEarnings('')
	}

	const autoFillBalance = () => {
		const allowableStakeAmount = GetPercentageFromValue(GetAllowedStakablePercentage(), props.balance)
		setBaseBalance(allowableStakeAmount)
	}

	useEffect(() => {
		OPPAStaking.methods.GetRewardsFrequencyInMinutes().call().then(result => setFrequency(Number(result))).catch(error => console.log('ERROR fetching frequency in minutes', error))
		OPPAStaking.methods.GetRewardsPercentagePerEpoch().call().then(rewards => {
			setRewardsPercentage(Number(rewards))
			OPPAStaking.methods.GetIntegerMultiplier().call().then(multiplier => {
				setIntegerMultiplier(Number(multiplier))
			}).catch(error => console.log('ERROR fetching integer multiplier', error))
		}).catch(error => console.log('ERROR fetching percentage per epoch', error))
	}, [])

	return(
		<div className={ styles.summary }>
			<div className='instructions'>
				Enter a projected amount, or automatically calculate for your current balance. 
			</div>
			<div className={ styles.inputContainer }>
				<div>
					1. Enter a the amount of tokens you want to stake. You currently have : <span className={ styles.highlightedText }>{ props.balance }</span> OPPA
				</div>
				<div className={ styles.formInput } >
					<input type='text' value={ baseBalance } onChange={ updateBaseBalance } pattern="[0-9.]*" />
					<a className={ styles.clickable_link } onClick={() => { autoFillBalance() }}>auto fill</a>
				</div>

				<div>
					2. FIll in your projected duration below. 
				</div>

				<div className={ styles.formInput } >
					<div>
						<input className={ styles.smaller } type='text' value={ projectionInput } onChange={ updateProjectionInput } pattern="[0-9]*" />
					</div>
					<div className={ styles.epochOptions }>
						{ epochPeriods.map((period, key) => <span onClick={() => { setActiveEpoh(period) }} key={ key } className={ activeEpoch === period ? styles.epochOption:'' } >{ period }(s)</span>) }
					</div>
				</div>

			</div>

			<div>
				Resulting Balance: { resultingBalance }
			</div>
			<div>
				Total Earnings: { totalEarnings }
			</div>

			<div className={ styles.dashboardActivityButtons }>
				<button onClick={() => { generate() }}>Calculate</button>
				<a className={ styles.clickable_link } onClick={() => { resetCalculator() }} >Reset</a>
			</div>
			
		</div>
	)
}

export default Calculator