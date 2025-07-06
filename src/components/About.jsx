import { useEffect, useRef } from 'react'
import TypewriterCode from './TypewriterCode'
import './About.css'

function About() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    elementsToObserve?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Tentang Saya</h2>
        <div className="about-content">
          <div className="about-text slide-in-left">
            <div className="about-highlights">
              <div className="highlight">
                <h4>Profil Saya</h4>
                <p>
                  Mahasiswa Sistem Informasi semester 6 yang memiliki ketertarikan pada desain dan koding. Saya menyatukan keduanya untuk membangun antarmuka digital yang fungsional dan menarik.
                </p>
              </div>
              <div className="highlight">
                <h4>Fokus & Minat</h4>
                <p>
                  Tertarik pada UI/UX design dan pengembangan frontend. Saya senang menciptakan solusi yang tidak hanya berjalan baik, tapi juga menyenangkan untuk digunakan.
                </p>
              </div>
            </div>
          </div>
          <div className="about-visual slide-in-right">
            <div className="visual-container">
              <div className="code-window">
                <div className="window-header">
                  <div className="window-controls">
                    <span className="control red"></span>
                    <span className="control yellow"></span>
                    <span className="control green"></span>
                  </div>
                  <span className="window-title">about.js</span>
                </div>
                <div className="code-content">
                  <TypewriterCode />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About