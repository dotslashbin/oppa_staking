import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Web3 tools
import { useWeb3React } from "@web3-react/core"
import { injected } from '../app/wallet/Connector'

// Sections 
import HarvestForm from '../sections/HarvestForm'
import TopMenu from '../sections/TopMenu'
import FooterMenu from '../sections/FooterMenu'
import WalletIndicator from '../sections/WalletIndicator'
import Summary from '../sections/summary'
import StakeForm from '../sections/StakeForm'

export default function Home() {

  const { active, account, library, connector, activate, deactivate } = useWeb3React()

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
      // deactivate()
    } catch (error) {
      console.log(error)
    }
  }

  const testMe = () => {
    console.log('oieufoeufoeufo')
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>OPPA staking</title>
        <meta name="description" content="OPPA Token Staking" />
        <link rel="icon" href="./Oppa_Favicon.png" />
      </Head>
    
      <TopMenu test={ testMe } active={ active } connect={ connect } />

      <main className={styles.main}>
        <WalletIndicator />
        <StakeForm />
        <Summary />
        <HarvestForm />
      </main>
 
      <FooterMenu />
    </div>
  )
}
