import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

// Sections 
import HarvestForm from '../sections/harvest'
import Header from '../sections/header'
import Footer from '../sections/footer'
import WalletIndicator from '../sections/wallet'
import Summary from '../sections/summary'
import Stake from '../sections/stake'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OPPA staking</title>
        <meta name="description" content="OPPA Token Staking" />
        <link rel="icon" href="./Oppa_Favicon.png" />
      </Head>

      <Header />

      <main className={styles.main}>
        <WalletIndicator />
        <Stake />
        {/* <Summary /> */}
        {/* <HarvestForm /> */}
      </main>
 
      <Footer />
    </div>
  )
}
