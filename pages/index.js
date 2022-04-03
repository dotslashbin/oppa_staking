import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Web3 tools
import { useWeb3React } from "@web3-react/core"
import { injected } from '../app/wallet/Connector'

import { OPPAtoken } from '../contract'

// Sections 
import HarvestForm from '../sections/HarvestForm'
import TopMenu from '../sections/TopMenu'
import FooterMenu from '../sections/FooterMenu'
import WalletIndicator from '../sections/WalletIndicator'
import Summary from '../sections/summary'
import StakeForm from '../sections/StakeForm'

export default function Home() {

  const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const [ balance, setBalance ] = useState('')

  

  async function connect() {
    try {
      console.log('Connecting wallet ...')
      await activate(injected)
    } catch (error) {
      console.log(error)
    }
  }

  async function disconnect() {
    try {
      console.log('DISCONNECTING WALLET')
      deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(active) {
      OPPAtoken.methods.balanceOf(account).call().then(output => setBalance(output))
    }
  })

  

  return (
    <div className={styles.container}>
      <Head>
        <title>OPPA staking</title>
        <meta name="description" content="OPPA Token Staking" />
        <link rel="icon" href="./Oppa_Favicon.png" />
      </Head>
    
      <TopMenu active={ active } connect={ connect } disconnect={ disconnect } />

      <main className={styles.main}>
        <WalletIndicator active={ active } account={ account } />
        { active ? (<StakeForm />):(
        <>
          <Summary balance={ balance } />
          <HarvestForm balance={ balance } />
        </>)}
        
      </main>
 
      <FooterMenu />
    </div>
  )
}
