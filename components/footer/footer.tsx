import styles from './Footer.module.scss'
export function Footer() {
    return(
        <footer className={styles.footer}>
       <p>
        YogaApp - {new Date().getFullYear()}
        </p>
      </footer>
    )
}