import React from 'react'
import styles from '../styles/Home.module.css'

const Stake = () => (
	<div className={ styles.summary }>
		<div>
			OPPA balance: <span className={ styles.highlightedText }>112,300,000,000,000,000</span>
		</div>
		<div className={ styles.inputContainer }>
			<label>Amount to stake</label>
			<div className={ styles.formInput } >
				<input type='text' />
				<a>Use max</a>
			</div>
		</div>

		<div className={ styles.stakeClear }>
			<button>Stake</button>
			<a>Reset</a>
		</div>

	</div>
)

export default Stake