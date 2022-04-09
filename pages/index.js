import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Web3 tools
import { useWeb3React } from "@web3-react/core"
import { injected } from '../app/wallet/Connector'

import { OPPAtoken } from '../contract'

// Sections 
import Calculator from '../sections/Calculator'
import HarvestForm from '../sections/HarvestForm'
import TopMenu from '../sections/TopMenu'
import FooterMenu from '../sections/FooterMenu'
import WalletIndicator from '../sections/WalletIndicator'
import Summary from '../sections/summary'
import StakeForm from '../sections/StakeForm'
import Web3 from 'web3'

const STAKE_HARVEST_DASHBOARD = 1
const CALCULATOR_DASHBOARD = 2

export default function Home() {

  // const { active, account, library, connector, activate, deactivate } = useWeb3React()
  const { active, account, activate, deactivate } = useWeb3React()

  const [ balance, setBalance ] = useState('')
  const [ hasStake, setHasStake ] = useState(false)
  const [ activeDashboard, setActiveDashboard ] = useState(STAKE_HARVEST_DASHBOARD)

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
      OPPAtoken.methods.balanceOf(account).call().then(output => {
        setBalance(Web3.utils.fromWei(output,'Gwei'))
      })
    }

  }, [account, active])

  const showCalculator = () => {
    if(!active) return

    return <Calculator balance={ balance } />
  }

  const showStakeNHarvest = () => {
    if(!active) return

    if(hasStake) {
      return(
        <>
          <Summary balance={ balance } />
          <HarvestForm balance={ balance } unstake={ unstake }/>
        </>
      )
    } else {
      return (<StakeForm balance={ balance } activateStake={ activateStake } /> )
    }
  }

  const activateStake = () => {
    setHasStake(true)
  }

  const unstake = () => {
    setHasStake(false)
  }

  const toggleDashboards = () => (activeDashboard === STAKE_HARVEST_DASHBOARD? setActiveDashboard(CALCULATOR_DASHBOARD):setActiveDashboard(STAKE_HARVEST_DASHBOARD))

  const getDashboardMenus = () => {
    if(active) {
      return (
        <div>
          <span onClick={() => {toggleDashboards() }} className={ styles.clickable_link } >Go to { activeDashboard === STAKE_HARVEST_DASHBOARD? 'Calculator':'Staking'}</span>
        </div>
      )
    }

    return (<></>)
  }

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
        { activeDashboard === STAKE_HARVEST_DASHBOARD ? showStakeNHarvest():showCalculator() }
        { getDashboardMenus() }
      </main>
 
      <FooterMenu />
    </div>
  )
}
