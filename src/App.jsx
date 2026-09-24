import { useState, useEffect } from 'react'
import { translations } from './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  const [lang, setLang] = useState('ru')
  const t = translations[lang]

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className="app">
      <Navbar t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <About t={t} />
      <Projects t={t} />
      <Skills t={t} />
      <Contact t={t} lang={lang} />
      <Footer t={t} />
    </div>
  )
}
