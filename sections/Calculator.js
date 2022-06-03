import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

import { OPPAStaking } from '../contract'

import { GetAllowedStakablePercentage, GetEpochValues, GetPercentageFromValue } from '../app/utils'

const epochPeriods = ['Day', 'Month', 'Year']

function Calculator(props)  {

	const [ baseBalance, setBaseBalance ] = useState('')
	const [ projectionInput, setProjectionInput ] = useState('')
	const [ activeEpoch, setActiveEpoh ] = useState('Year')
	const [ finalBalance, setFinalBalance ] = useState('')
	const [ rewardsPercentage, setRewardsPercentage ] = useState('')

	const generate = (baseValue) => {
		// const container = []
		let endingBalance = 0
		const epochValues = GetEpochValues(activeEpoch)

		if(epochValues === 0) {
			return
		}

		for (var i = 1; i <= (epochValues * parseInt(projectionInput)); i++) {
			if(i === 1) {
				endingBalance = baseValue
			}
			const valueToAdd = (endingBalance/100)*(rewardsPercentage/1000)
			// container.push(valueToAdd)
			endingBalance += valueToAdd
		}

		setFinalBalance(endingBalance.toString())
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
		setFinalBalance('')
		setBaseBalance('')
		setProjectionInput('')
	}

	const autoFillBalance = () => {
		const allowableStakeAmount = GetPercentageFromValue(GetAllowedStakablePercentage(), props.balance)
		setBaseBalance(allowableStakeAmount)
	}

	useEffect(() => {
		OPPAStaking.methods.GetRewardsPercentagePerEpoch().call().then(result => setRewardsPercentage(Number(result))).catch(error => console.log('ERROR in fetching rewars percentage ...', error))
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
						<input type='text' value={ projectionInput } onChange={ updateProjectionInput } pattern="[0-9]*"  />
					</div>
				</div>
				<div className={ styles.formInput }>
				<div className={ styles.epochOptions }>
						{ epochPeriods.map((period, key) => <span onClick={() => { setActiveEpoh(period) }} key={ key } className={ activeEpoch === period ? styles.epochOption:'' } >{ period }(s)</span>) }
					</div>
				</div>

			</div>

			<div>
				Resulting Balance: { finalBalance }
			</div>
			<div>
				{ finalBalance > 0 ? (<>
					Total Earnings: { finalBalance - baseBalance }
					</>):(<></>)}
				
			</div>

			<div className={ styles.dashboardActivityButtons }>
				<button onClick={() => { generate( parseFloat(baseBalance) ) }}>Calculate</button>
				<a className={ styles.clickable_link } onClick={() => { resetCalculator() }} >Reset</a>
			</div>
			
		</div>
	)
}

export default Calculator