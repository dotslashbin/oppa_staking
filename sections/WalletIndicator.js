import { replaceBasePath } from 'next/dist/server/router'
import React from 'react'
import styles from '../styles/Home.module.css'
import * as _ from 'lodash'

const shortenAddress = (address) => _.truncate(address, { 'length': 8}) + address.substring(address.length - 4)

const WalletIndicator = (props) => (
<div>
	<div>
		<span>Wallet: </span>
		{ props.active? (
			<span className={ styles.highlightedText }>{ shortenAddress(props.account) }</span>
		): (
			<span className={ styles.highlightedText } >not connected</span>
		)}
		
	</div>
</div>
)

export default WalletIndicator