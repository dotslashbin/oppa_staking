import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Image from 'next/image'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>OPPA staking</title>
        <meta name="description" content="OPPA Token Staking" />
        <link rel="icon" href="./Oppa_Favicon.png" />
      </Head>

      <header className={ styles.topNavBar }>
        <div className='log-container'>
          <Image src='/images/logo.png' alt='OPPA logo' height={50} width={50}/>
        </div>
        <div className='wallet-connector'>
          <div>
            <button>Connect Wallet</button>
          </div>
        </div>
        
      </header>

      <main className={styles.main}>
        <div>
          <span>CONNECTED WALLET: </span>
          <span>...ABCD</span>
          <div>
            Current OPPA BALANCE: 100
          </div>
          <div>
            Current Staking delegation: 123
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        Some footer thing
      </footer>
    </div>
  )
}
