import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'

import { STAKING_CONTRACT_ADDRESS } from '../config'

import { GetAllowedStakablePercentage, GetPercentageFromValue } from '../app/utils'

// Contract
import { OPPAStaking, OPPAtoken} from '../contract'

function StakeForm(props) {

	const [ stakedAmount, setStakedAmount ] = useState('')
	const [ fieldMessage, setFieldMessage ] = useState('')
	const [ isApproved, setIsApproved ] = useState(false)
	const [ message, setMessage ] = useState('')
	const [ transferHash, setTransferHash ] = useState('')
	const [ stakingHash, setStakingHash] = useState('')
	const [ isLoading, setIsLoading ] = useState(false)

	const { account, balance } = props

	const handleChange = (event) => {
		if (event.target.validity.valid) {
			setStakedAmount(event.target.value)
		}
	}

	const useMaxBalance = () => {
		const allowablePercentage = GetAllowedStakablePercentage()
		const maxValue = GetPercentageFromValue(allowablePercentage, parseFloat(props.balance))
		setStakedAmount(maxValue.toString())
		setFieldMessage('You can only use 90% of your balance')
	}

	const resetFields = () => {
		setStakedAmount('')
		setFieldMessage('')
	}

	const stake = () => {
		setIsLoading(true)
		setMessage('progress 0/3')
		
		OPPAtoken.methods.approve(account, stakedAmount).send({ from: account }).then(() => {
			setIsApproved(true)
			setMessage('progress 1/3')
			OPPAtoken.methods.transferFrom(account, STAKING_CONTRACT_ADDRESS, stakedAmount).send({ from: account }).then(tokenTransfer => {
					console.log('DEBUG ...', 'transferFrom', tokenTransfer)
					setTransferHash(tokenTransfer.blockHash)
					setMessage('progress 2/3')
					OPPAStaking.methods.StakeTokens(stakedAmount).send({ from: account }).then(staking => {
						setStakingHash( staking.blockHash )
						setMessage(`Staking Complete!`)
						setStakedAmount('')
						setMessage('Complete! 3/3')
						setIsLoading(false)
					})
				})
		})
	}
	
	return (
		<div className={ styles.summary }>
			<div className={ styles.instructions }>
				<div>Fill in the form below and enjoy the rewards given every 10 minutes. </div>
				<div className={ styles.notices } >There will be 3 transactions to sign.</div>
			</div>
			<br />
			<div>
				OPPA balance: <span className={ styles.highlightedText }>{ props.balance }</span>
			</div>
			<div className={ styles.inputContainer }>
				<label>Amount to stake</label>
				<div className={ styles.formInput } >
					<div>
						<input type='text' value={ stakedAmount } onChange={ handleChange } pattern="[0-9.]*"/>
						<div className={ styles.fieldMessageContianer }>
						{ fieldMessage? (<span className={ styles.fieldMessage } >{ fieldMessage }</span>):null }
						</div>
					</div>
					<a className={ styles.clickable_link } href='#' onClick={ useMaxBalance }>Use max</a>
				</div>
			</div>
	
			<div className={ styles.dashboardActivityButtons }>
				<button onClick={() => { stake() } }>Stake</button>
				<a className={ styles.clickable_link } href='#' onClick={() => { resetFields() }} >Reset</a>
			</div>
		
			<div>
				<div>{ isLoading? 'Validating transactions':'' }</div>
				<div>{ message }</div>
			</div>
		</div>
	)
}

export default StakeForm