import Head from 'next/head'
import styles from '../styles/Home.module.css'

// Sections 
import HarvestForm from '../sections/HarvestForm'
import TopMenu from '../sections/TopMenu'
import FooterMenu from '../sections/FooterMenu'
import WalletIndicator from '../sections/WalletIndicator'
import Summary from '../sections/summary'
import StakeForm from '../sections/StakeForm'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OPPA staking</title>
        <meta name="description" content="OPPA Token Staking" />
        <link rel="icon" href="./Oppa_Favicon.png" />
      </Head>

      <TopMenu />

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
