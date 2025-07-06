import { useEffect, useState } from 'react'
import './Hero.css'

function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentRole, setCurrentRole] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)

  const roles = ['Hary Kurniawan', 'UI/UX Designer', 'Frontend Developer']

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100
    const currentRoleText = roles[roleIndex]

    if (!isDeleting && charIndex < currentRoleText.length) {
      const timeout = setTimeout(() => {
        setCurrentRole(prev => prev + currentRoleText[charIndex])
        setCharIndex(prev => prev + 1)
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else if (isDeleting && charIndex > 0) {
      const timeout = setTimeout(() => {
        setCurrentRole(prev => prev.slice(0, -1))
        setCharIndex(prev => prev - 1)
      }, typeSpeed)
      return () => clearTimeout(timeout)
    } else if (!isDeleting && charIndex === currentRoleText.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true)
      }, 2000)
      return () => clearTimeout(timeout)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex(prev => (prev + 1) % roles.length)
    }
  }, [charIndex, isDeleting, roleIndex, roles])
  const scrollToContact = () => {
    // Don't scroll if modal is open
    if (window.modalOpen) {
      return
    }
    
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToProjects = () => {
    // Don't scroll if modal is open
    if (window.modalOpen) {
      return
    }
    
    const element = document.getElementById('projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className={`hero-text ${isVisible ? 'visible' : ''}`}>
            <h1 className="hero-title">
              <span className="title-line">Halo, Saya</span>
              <span className="title-line main-title">{currentRole}<span className="cursor">|</span></span>
            </h1>
            <p className="hero-subtitle">
              Merancang UI yang intuitif dan membangun frontend yang efisien & scalable.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={scrollToProjects}>
                Lihat Karya Saya
              </button>
              <button className="btn" onClick={scrollToContact}>
                Mari Berkolaborasi
              </button>
            </div>
          </div>
          <div className={`hero-visual ${isVisible ? 'visible' : ''}`}>
            <div className="hero-circle">
              <div className="circle-inner">
                <div className="floating-elements">
                  <div className="element element-1">●</div>
                  <div className="element element-2">●</div>
                  <div className="element element-3">●</div>
                  <div className="element element-4">●</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-indicator">
            <span>Scroll ke Bawah</span>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero