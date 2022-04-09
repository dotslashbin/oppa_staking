import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

import { GetEpochValues } from '../app/utils'

const REWARD_PERCENTAGE = 0.00005

const epochPeriods = ['Day', 'Month', 'Year']

function Calculator(props)  {

	const [ baseBalance, setBaseBalance ] = useState('')
	const [ projectionInput, setProjectionInput ] = useState('')
	const [ activeEpoch, setActiveEpoh ] = useState('Year')
	const [ finalBalance, setFinalBalance ] = useState('')
	

	const generate = (baseValue) => {
		let container = []
		let endingBalance = 0
		const epochValues = GetEpochValues(activeEpoch)

		if(epochValues === 0) {
			return
		}

		for (var i = 1; i <= (epochValues * parseInt(projectionInput)); i++) {
			if(i === 1) {
				endingBalance = baseValue
			}
			const valueToAdd = (endingBalance/100)*(REWARD_PERCENTAGE)
			container.push(valueToAdd)
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

	return(
		<div className={ styles.summary }>
			<div className='instructions'>
				Here, you can calculate your earnings based on month, day and year. You may input any hypothetical balance, or use your current balance for the projections.
			</div>

			<div className={ styles.inputContainer }>
				<label>Starting balance</label>
				<div className={ styles.formInput } >
					<input type='text' value={ baseBalance } onChange={ updateBaseBalance } pattern="[0-9.]*" />
					<a className={ styles.clickable_link } onClick={() => { setBaseBalance(props.balance) }}>auto fill</a>
				</div>

				<div className={ styles.formInput } >
					<div>
						<input className={ styles.smaller } type='text' value={ projectionInput } onChange={ updateProjectionInput } pattern="[0-9]*" />
					</div>
					<div className={ styles.epochOptions }>
						{ epochPeriods.map((period, key) => <span onClick={() => { setActiveEpoh(period) }} key={ key } className={ activeEpoch === period ? styles.epochOption:'' } >{ period }</span>) }
					</div>
				</div>

			</div>

			<div>
				Final Balance: { finalBalance }
			</div>

			<div className={ styles.dashboardActivityButtons }>
				<button onClick={() => { generate( parseFloat(baseBalance) ) }}>Calculate</button>
				<a className={ styles.clickable_link } onClick={() => { resetCalculator() }} >Reset</a>
			</div>
			
		</div>
	)
}

export default Calculator