import { useEffect } from 'react'
import './CertificateModal.css'

function CertificateModal({ certificate, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('certificate-modal-open')
      window.modalOpen = true
      
      // Store current scroll position to restore later
      window.modalScrollPosition = window.scrollY
    } else {
      document.body.classList.remove('certificate-modal-open')
      window.modalOpen = false
      
      // Restore scroll position if it changed
      if (window.modalScrollPosition !== undefined) {
        window.scrollTo(0, window.modalScrollPosition)
        window.modalScrollPosition = undefined
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('certificate-modal-open')
      window.modalOpen = false
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!certificate) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Certificate details data
  const certificateDetails = {
    1: {
      fullImage: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Frontend Development',
      description: 'Sertifikasi komprehensif dalam pengembangan aplikasi React modern, mencakup hooks, state management, dan best practices.',
      certificateNumber: 'META-REACT-2023-001',
      issueDate: '15 Desember 2023',
      expiryDate: 'Tidak Berlaku',
      credentialId: 'CRED-META-RCT-789',
      verificationUrl: 'https://coursera.org/verify/META-REACT-2023-001',
      skills: [
        { name: 'React Hooks', icon: '⚛️' },
        { name: 'JSX', icon: '📝' },
        { name: 'State Management', icon: '🔄' },
        { name: 'Component Design', icon: '🧩' }
      ],
      issuerDescription: 'Platform pembelajaran online terkemuka yang menawarkan kursus dari universitas dan perusahaan top dunia.'
    },
    2: {
      fullImage: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'UI/UX Design',
      description: 'Sertifikasi profesional dalam desain UI/UX yang mencakup design thinking, prototyping, dan user research.',
      certificateNumber: 'GOOGLE-UX-2023-002',
      issueDate: '20 November 2023',
      expiryDate: 'Tidak Berlaku',
      credentialId: 'CRED-GOOGLE-UX-456',
      verificationUrl: 'https://coursera.org/verify/GOOGLE-UX-2023-002',
      skills: [
        { name: 'Figma', icon: '🎨' },
        { name: 'Prototyping', icon: '📱' },
        { name: 'User Research', icon: '🔍' },
        { name: 'Design Systems', icon: '📐' }
      ],
      issuerDescription: 'Program sertifikasi profesional yang dirancang oleh Google untuk mempersiapkan karir di bidang UX design.'
    },
    3: {
      fullImage: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Frontend Development',
      description: 'Sertifikasi dalam algoritma dan struktur data JavaScript untuk pengembangan aplikasi web yang efisien.',
      certificateNumber: 'FCC-JS-ALG-2023-003',
      issueDate: '10 Oktober 2023',
      expiryDate: 'Tidak Berlaku',
      credentialId: 'CRED-FCC-JS-123',
      verificationUrl: 'https://freecodecamp.org/certification/fcc-js-alg-2023-003',
      skills: [
        { name: 'JavaScript ES6+', icon: '🟨' },
        { name: 'Algorithms', icon: '🧮' },
        { name: 'Data Structures', icon: '📊' },
        { name: 'Problem Solving', icon: '🧩' }
      ],
      issuerDescription: 'Organisasi nirlaba yang membantu jutaan orang belajar coding melalui kurikulum gratis dan komprehensif.'
    },
    4: {
      fullImage: 'https://images.pexels.com/photos/11035540/pexels-photo-11035540.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Frontend Development',
      description: 'Sertifikasi pengembangan web frontend yang mencakup HTML5, CSS3, JavaScript, dan framework modern.',
      certificateNumber: 'COURSERA-FE-2023-004',
      issueDate: '25 September 2023',
      expiryDate: 'Tidak Berlaku',
      credentialId: 'CRED-COURSERA-FE-789',
      verificationUrl: 'https://coursera.org/verify/COURSERA-FE-2023-004',
      skills: [
        { name: 'HTML5', icon: '🌐' },
        { name: 'CSS3', icon: '🎨' },
        { name: 'JavaScript', icon: '⚡' },
        { name: 'Responsive Design', icon: '📱' }
      ],
      issuerDescription: 'Platform pembelajaran online yang bermitra dengan universitas dan organisasi terkemuka untuk menyediakan kursus berkualitas tinggi.'
    },
    5: {
      fullImage: 'https://images.pexels.com/photos/11035364/pexels-photo-11035364.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Frontend Development',
      description: 'Sertifikasi dalam desain web responsif yang mencakup mobile-first design, flexbox, dan CSS Grid.',
      certificateNumber: 'FCC-RWD-2023-005',
      issueDate: '15 Agustus 2023',
      expiryDate: 'Tidak Berlaku',
      credentialId: 'CRED-FCC-RWD-456',
      verificationUrl: 'https://freecodecamp.org/certification/fcc-rwd-2023-005',
      skills: [
        { name: 'CSS Grid', icon: '📐' },
        { name: 'Flexbox', icon: '📦' },
        { name: 'Mobile First', icon: '📱' },
        { name: 'Media Queries', icon: '📺' }
      ],
      issuerDescription: 'Organisasi nirlaba yang menyediakan kurikulum coding gratis dengan fokus pada pembelajaran praktis dan project-based.'
    },
    6: {
      fullImage: 'https://images.pexels.com/photos/11035467/pexels-photo-11035467.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Backend Development',
      description: 'Sertifikasi pengembangan backend Node.js yang mencakup Express.js, database, dan API development.',
      certificateNumber: 'IBM-NODE-2023-006',
      issueDate: '30 Juli 2023',
      expiryDate: 'Tidak Berlaku',
      credentialId: 'CRED-IBM-NODE-123',
      verificationUrl: 'https://coursera.org/verify/IBM-NODE-2023-006',
      skills: [
        { name: 'Node.js', icon: '🟢' },
        { name: 'Express.js', icon: '🚀' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'REST APIs', icon: '🔗' }
      ],
      issuerDescription: 'Perusahaan teknologi multinasional yang menyediakan program sertifikasi profesional untuk pengembangan karir di bidang teknologi.'
    }
  }

  const details = certificateDetails[certificate.id] || {}

  return (
    <div 
      className={`certificate-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="certificate-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-header">
          <img 
            src={details.fullImage || certificate.image} 
            alt={certificate.name} 
            className="certificate-image-large"
          />
        </div>

        <div className="modal-content">
          <div className="certificate-header">
            <h2 className="certificate-title">{certificate.name}</h2>
            <div className="certificate-category">{details.category || 'Sertifikasi'}</div>
            <p className="certificate-description">
              {details.description || 'Sertifikasi profesional yang memvalidasi keahlian dan kompetensi dalam bidang teknologi.'}
            </p>
          </div>

          <div className="certificate-details">
            <div className="detail-section">
              <h4>
                <span className="detail-icon">📋</span>
                Informasi Sertifikat
              </h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Nomor Sertifikat</span>
                  <span className="detail-value">{details.certificateNumber || 'CERT-2023-001'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tanggal Terbit</span>
                  <span className="detail-value">{details.issueDate || certificate.date}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Masa Berlaku</span>
                  <span className="detail-value">{details.expiryDate || 'Tidak Berlaku'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Credential ID</span>
                  <span className="detail-value">{details.credentialId || 'CRED-001'}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>
                <span className="detail-icon">🏢</span>
                Penerbit Sertifikat
              </h4>
              <div className="issuer-info">
                <div className="issuer-logo">{certificate.icon}</div>
                <div className="issuer-details">
                  <h5>{certificate.issuer}</h5>
                  <p>{details.issuerDescription || 'Institusi terpercaya yang menyediakan sertifikasi profesional berkualitas tinggi.'}</p>
                </div>
              </div>
            </div>

            {details.skills && (
              <div className="detail-section">
                <h4>
                  <span className="detail-icon">🛠️</span>
                  Keahlian yang Dipelajari
                </h4>
                <div className="skills-grid">
                  {details.skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                      <span className="skill-icon">{skill.icon}</span>
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <a 
              href={details.verificationUrl || '#'} 
              className="modal-action-btn primary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Verifikasi Sertifikat</span>
              <span className="action-icon">🔗</span>
            </a>
            <a 
              href={details.fullImage || certificate.image} 
              className="modal-action-btn"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Lihat Sertifikat</span>
              <span className="action-icon">👁️</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertificateModal