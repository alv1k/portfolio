import { useEffect, useRef } from 'react'
import styles from './Skills.module.css'

export default function Skills({ t }) {
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
    <section id="skills" className="section">
      <div ref={ref} className={`fade-in ${styles.skills}`}>
        <h2 className="section-title">{t.skills.title}</h2>
        <div className={styles.grid}>
          {t.skills.categories.map((cat, i) => (
            <div key={i} className={styles.category}>
              <h3 className={styles.category_name}>{cat.name}</h3>
              <div className={styles.badges}>
                {cat.items.map((item, j) => (
                  <span key={j} className={styles.badge}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
