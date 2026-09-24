import styles from './Footer.module.css'

export default function Footer({ t }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>/alena.dev</span>
          </div>
           <div className={styles.links}>
             <a href="https://github.com/alv1k" target="_blank" rel="noopener noreferrer">GitHub</a>
           </div>
        </div>
        <div className={styles.bottom}>
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
