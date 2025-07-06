import { useEffect, useRef } from 'react'
import './GitHubCTA.css'
import golangIcon from '../assets/golang.png';
import kotlinIcon from '../assets/kotlin.png';
import dataScienceIcon from '../assets/data.png';


function GitHubCTA() {
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

    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in, .scale-in')
    elementsToObserve?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="github-cta section" ref={sectionRef}>
      <div className="container">
        <div className="cta-content fade-in">
          <div className="cta-icon scale-in">
            <span>⚡</span>
          </div>
          <h2 className="cta-title">Fokus Saat Ini</h2>
          <p className="cta-description">
           Saat ini saya mendalami beberapa bidang untuk melengkapi kemampuan teknis dan memperluas pemahaman praktis
          </p>
          <div className="cta-stats">
            <div className="stat-item">
              <span className="stat-number">
                <img src={golangIcon} alt="Golang" className="icon-image" />
              </span>
              <span className="stat-label">Golang</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <img src={kotlinIcon} alt="Kotlin" className="icon-image" />
              </span>
              <span className="stat-label">Kotlin</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                <img src={dataScienceIcon} alt="Data Science" className="icon-image" />
              </span>
              <span className="stat-label">Data Science</span>
            </div>
          </div>

          {/* <a href="#" className="btn-primary cta-button">
            <span>Kunjungi GitHub</span>
          </a> */}
        </div>
      </div>
    </section>
  )
}

export default GitHubCTA