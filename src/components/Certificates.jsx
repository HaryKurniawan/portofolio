import { useEffect, useRef } from 'react'
import { useState } from 'react'
import CertificateModal from './CertificateModal'
import './Certificates.css'

// Import gambar lokal
import reactImg from '../assets/dicoding.png'
import uiuxImg from '../assets/fast.png'
import jsImg from '../assets/bwa.png'
import frontendImg from '../assets/bwa.png'
import responsiveImg from '../assets/fast.png'
import nodejsImg from '../assets/fast.png'

function Certificates() {
  const sectionRef = useRef(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in')
    elementsToObserve?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const openModal = (certificate) => {
    // Prevent any default behavior
    event?.preventDefault()
    event?.stopPropagation()
    
    setSelectedCertificate(certificate)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    // Prevent any default behavior
    event?.preventDefault()
    event?.stopPropagation()
    
    setIsModalOpen(false)
    setTimeout(() => setSelectedCertificate(null), 300)
  }

  const certificates = [
    {
      id: 1,
      name: 'Frontend Developer',
      issuer: 'Meta',
      date: 'Dec 2023',
      image: reactImg,
    },
    {
      id: 2,
      name: 'UI/UX Design Course',
      issuer: 'Google',
      date: 'Nov 2023',
      image: uiuxImg,
    },
    {
      id: 3,
      name: 'Bootcamp Mern Stack',
      issuer: 'freeCodeCamp',
      date: 'Oct 2023',
      image: jsImg,
    },
    {
      id: 4,
      name: 'Pengembangan Web Frontend',
      issuer: 'Coursera',
      date: 'Sep 2023',
      image: frontendImg,
    },
    {
      id: 5,
      name: 'Desain Web Responsif',
      issuer: 'freeCodeCamp',
      date: 'Aug 2023',
      image: responsiveImg,
    },
    {
      id: 6,
      name: 'Bootcamp UI UX',
      issuer: 'BWA',
      date: 'Jul 2023',
      image: nodejsImg,
    }
  ]

  const row1Certificates = [...certificates, ...certificates, ...certificates]
  const row2Certificates = [...certificates.slice().reverse(), ...certificates.slice().reverse(), ...certificates.slice().reverse()]

  return (
    <section id="certificates" className="certificates section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Sertifikasi & Pencapaian</h2>
        
        <div className="certificates-container">
          {/* First Row - Right to Left */}
          <div className="certificates-track certificates-row-1">
            {row1Certificates.map((cert, index) => (
              <div 
                key={`row1-${index}`} 
                className="certificate-card"
                // onClick={() => openModal(cert)} // sementara dinonaktifkan
                style={{ cursor: 'default' }}
              >
                <div className="certificate-header">
                  <div className="certificate-image">
                    <img src={cert.image} alt={cert.name} />
                  </div>
                  <div className="certificate-info">
                    <h3 className="certificate-name">{cert.name}</h3>
                    <div className="certificate-issuer">
                      <span className="issuer-icon">{cert.icon}</span>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                </div>
                <div className="certificate-date">{cert.date}</div>
              </div>
            ))}
          </div>

          {/* Second Row - Left to Right */}
          <div className="certificates-track certificates-row-2">
            {row2Certificates.map((cert, index) => (
              <div 
                key={`row2-${index}`} 
                className="certificate-card"
                // onClick={() => openModal(cert)} // sementara dinonaktifkan
                style={{ cursor: 'default' }}
              >
                <div className="certificate-header">
                  <div className="certificate-image">
                    <img src={cert.image} alt={cert.name} />
                  </div>
                  <div className="certificate-info">
                    <h3 className="certificate-name">{cert.name}</h3>
                    <div className="certificate-issuer">
                      <span className="issuer-icon">{cert.icon}</span>
                      <span>{cert.issuer}</span>
                    </div>
                  </div>
                </div>
                <div className="certificate-date">{cert.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CertificateModal 
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}

export default Certificates
