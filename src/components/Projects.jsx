import { useEffect, useRef } from 'react'
import styles from './Projects.module.css'

function MockupDevice({ type, children }) {
  if (type === 'phone') {
    return (
      <div className={styles.mockup_phone}>
        <div className={styles.phone_screen}>{children}</div>
        <div className={styles.phone_notch} />
      </div>
    )
  }
  return (
    <div className={styles.mockup_laptop}>
      <div className={styles.laptop_screen}>{children}</div>
      <div className={styles.laptop_base} />
    </div>
  )
}

function ProjectSection({ project, t, index }) {
  const ref = useRef(null)
  const isEven = index % 2 === 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) ref.current.classList.add('visible') },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const mockupType = project.screenshotType || (index >= 2 ? 'phone' : 'laptop')
  const hasScreenshot = project.screenshot

  return (
    <div ref={ref} className={`fade-in ${styles.project} ${isEven ? '' : styles.reverse}`}>
      <div className={styles.project_info}>
        <div className={styles.project_header}>
          <div className={styles.project_dot} style={{ background: project.color }} />
          <div>
            <h3 className={styles.project_title}>{project.title}</h3>
            <p className={styles.project_subtitle}>{project.subtitle}</p>
            {project.priceLabel && (
              <span className={styles.price_label}>{project.priceLabel}</span>
            )}
          </div>
        </div>
        <p className={styles.project_desc}>{project.description}</p>

        <div className={styles.features}>
          <h4 className={styles.features_title}>{t.projects.features_title}</h4>
          <ul className={styles.features_list}>
            {project.features.map((f, i) => (
              <li key={i} className={styles.feature_item}>
                <span className={styles.feature_check}>&#10003;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.stack}>
          <h4 className={styles.stack_title}>{t.projects.stack_title}</h4>
          <div className={styles.stack_badges}>
            {project.stack.map((s, i) => (
              <span key={i} className={styles.stack_badge}>{s}</span>
            ))}
          </div>
        </div>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.demo_btn}
            style={{ '--btn-color': project.color }}
          >
            {t.projects.demo_btn} &rarr;
          </a>
        )}
      </div>

      <div className={styles.project_visual}>
        <MockupDevice type={mockupType}>
          {hasScreenshot ? (
            <img
              src={project.screenshot}
              alt={project.title}
              className={styles.screenshot_img}
            />
          ) : (
            <div className={styles.mockup_content} style={{ '--mockup-color': project.color }}>
              <div className={styles.mockup_header}>
                <div className={styles.mockup_dot} />
                <div className={styles.mockup_dot} />
                <div className={styles.mockup_dot} />
              </div>
              <div className={styles.mockup_body}>
                <div className={styles.mockup_line} style={{ width: '60%' }} />
                <div className={styles.mockup_line} style={{ width: '80%' }} />
                <div className={styles.mockup_line} style={{ width: '45%' }} />
                <div className={styles.mockup_block} />
                <div className={styles.mockup_line} style={{ width: '70%' }} />
                <div className={styles.mockup_line} style={{ width: '55%' }} />
                <div className={styles.mockup_block} />
                <div className={styles.mockup_line} style={{ width: '90%' }} />
              </div>
            </div>
          )}
        </MockupDevice>
      </div>
    </div>
  )
}

export default function Projects({ t }) {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">{t.projects.title}</h2>
      <div className={styles.projects_list}>
        {t.projects.items.map((project, i) => (
          <ProjectSection key={project.id} project={project} t={t} index={i} />
        ))}
      </div>
    </section>
  )
}
