import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

import { GetPercentageFromValue } from '../app/utils'

function StakeForm(props) {

	const [ stakedAmount, setStakedAmount ] = useState('')
	const [ fieldMessage, setFieldMessage ] = useState('')

	const handleChange = (event) => {
		setStakedAmount(event.target.value)
	}

	const useMaxBalance = () => {
		const maxValue = GetPercentageFromValue(90, parseFloat(props.balance))
		setStakedAmount(maxValue.toString())
		setFieldMessage('You can only use 90% of your balance')
	}

	const resetFields = () => {
		setStakedAmount('')
		setFieldMessage('')
	}
	
	return (
		<div className={ styles.summary }>
			<div className='instructions'>
				You have not staked any of your OPPA tokens yet. Fill in the form below and enjoy the rewards given every 30 minutes. 
			</div>
			<br />
			<div>
				OPPA balance: <span className={ styles.highlightedText }>{ props.balance }</span>
			</div>
			<div className={ styles.inputContainer }>
				<label>Amount to stake</label>
				<div className={ styles.formInput } >
					<div>
						<input type='text' value={ stakedAmount } onChange={ handleChange }/>
						<div className={ styles.fieldMessageContianer }>
						{ fieldMessage? (<span className={ styles.fieldMessage } >{ fieldMessage }</span>):null }
						</div>
					</div>
					<a className={ styles.clickable_link } href='#' onClick={ useMaxBalance }>Use max</a>
				</div>
			</div>
	
			<div className={ styles.dashboardActivityButtons }>
				<button onClick={() => { props.activateStake(true) } }>Stake</button>
				<a className={ styles.clickable_link } href='#' onClick={() => { resetFields() }} >Reset</a>
			</div>
	
		</div>
	)
}

export default StakeForm