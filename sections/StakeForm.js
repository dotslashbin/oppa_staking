import React from 'react'
import styles from '../styles/Home.module.css'

const StakeForm = (props) => (
	<div className={ styles.summary }>
		<div>
			OPPA balance: <span className={ styles.highlightedText }>{ props.balance }</span>
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

export default StakeForm