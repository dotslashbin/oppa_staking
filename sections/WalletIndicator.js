import React from 'react'
import styles from '../styles/Home.module.css'

const WalletIndicator = () => (
<div>
	<div>
		<span>Wallet: </span>
		<span className={ styles.highlightedText }>abc...12x3</span>
	</div>
</div>
)

export default WalletIndicator