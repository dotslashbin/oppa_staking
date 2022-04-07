import React from 'react'
import Web3 from 'web3'

const REWARD_PERCENTAGE = 0.00005
const EPOCh_YEAR = 52559
const EPOCh_MONT = 4380
const EPOCh__DAY = 144

function Calculator(props)  {

	const generate = (baseValue) => {
		let container = []

		let endingBalance = 0
		
		for (var i = 1; i <= EPOCh_YEAR; i++) {
			if(i === 1) {
				endingBalance = baseValue
			}
			const valueToAdd = (endingBalance/100)*(REWARD_PERCENTAGE)
			container.push(valueToAdd)
			endingBalance += valueToAdd
		}

		console.log(endingBalance)
	}

	return(
		<div>
			<span>calc</span>
			<input type="text" value={ props.balance } />
			<button onClick={() => { generate( parseFloat(props.balance) ) }}>Calculate</button>
		</div>
	)
}

export default Calculator