import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import GitHubCTA from './components/GitHubCTA'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'
import SmoothScroll from './components/SmoothScroll'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      // Skip if modal is open
      if (window.modalOpen) {
        return
      }
      
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact']
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && scrollPosition >= section.offsetTop) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  }

  return (
    <div className="App">
      <Navigation activeSection={activeSection} />
      <ThemeToggle />
      <SmoothScroll />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <GitHubCTA />
      <Certificates />
      <Contact />
      <Footer />
    </div>
  )
}

export default App