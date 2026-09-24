import { useEffect, useRef } from 'react'
import styles from './About.module.css'

export default function About({ t }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="section">
      <div ref={ref} className={`fade-in ${styles.about}`}>
        <h2 className="section-title">{t.about.title}</h2>
        <div className={styles.content}>
          <div className={styles.bio}>
            <p>{t.about.bio}</p>
          </div>
          <div className={styles.highlights}>
            {t.about.highlights.map((h, i) => (
              <div key={i} className={styles.highlight}>
                <span className={styles.highlight_value}>{h.value}</span>
                <span className={styles.highlight_label}>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
