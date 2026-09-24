import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

export default function Navbar({ t, lang, setLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['hero', 'about', 'projects', 'skills', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.projects },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ]

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  const toggleLang = () => setLang(lang === 'ru' ? 'en' : 'ru')

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <button className={styles.logo} onClick={() => scrollTo('hero')}>
          <span className={styles.logo_icon}>/</span>
          <span className={styles.logo_text}>alena.dev</span>
        </button>

        <div className={`${styles.links} ${mobileOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.link} ${activeSection === item.id ? styles.active : ''}`}
              onClick={() => scrollTo(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button className={styles.lang_btn} onClick={toggleLang}>
            {lang === 'ru' ? '🇷🇺 RU' : '🇬🇧 EN'}
          </button>
        </div>

        <button className={styles.burger} onClick={() => setMobileOpen(!mobileOpen)}>
          <span className={`${styles.burger_line} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.burger_line} ${mobileOpen ? styles.open : ''}`} />
          <span className={`${styles.burger_line} ${mobileOpen ? styles.open : ''}`} />
        </button>
      </div>
    </nav>
  )
}
