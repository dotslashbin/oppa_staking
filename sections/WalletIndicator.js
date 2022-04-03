import React from 'react'
import styles from '../styles/Home.module.css'
import * as _ from 'lodash'

const shortenAddress = (address) => _.truncate(address, { 'length': 8}) + address.substring(address.length - 4)

const WalletIndicator = (props) => (
	<div>
		<span className={ styles.lable_white }>Wallet: </span>
		{ props.active? (
			<span className={ styles.highlightedText }>{ shortenAddress(props.account) }</span>
		): (
			<span className={ styles.highlightedText } >not connected</span>
		)}
		
	</div>
)

export default WalletIndicator