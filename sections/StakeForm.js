import React, { useState } from 'react'
import styles from '../styles/Home.module.css'

function StakeForm(props) {

	const [ stakedAmount, setStakedAmount ] = useState('')

	const handleChange = (event) => {
		setStakedAmount(event.target.value)
	}
	
	return (
		<div className={ styles.summary }>
			<div className='instructions'>
				You have not staked any of your OPPA tokens yet. Fill in the form below and enjoy the rewards given every 30 minutes. 
			</div>
			<div>
				OPPA balance: <span className={ styles.highlightedText }>{ props.balance }</span>
			</div>
			<div className={ styles.inputContainer }>
				<label>Amount to stake</label>
				<div className={ styles.formInput } >
					<input type='text' value={ stakedAmount } onChange={ handleChange }/>
					<a className={ styles.clickable_link } href='#' onClick={() => { setStakedAmount(props.balance)} }>Use max</a>
				</div>
			</div>
	
			<div className={ styles.stakeClear }>
				<button onClick={() => { props.activateStake(true) } }>Stake</button>
				<a className={ styles.clickable_link } href='#' onClick={() => { setStakedAmount('') }} >Reset</a>
			</div>
	
		</div>
	)
}

export default StakeForm