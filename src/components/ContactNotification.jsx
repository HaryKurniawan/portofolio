import { useEffect } from 'react'
import './ContactNotification.css'

function ContactNotification({ isVisible, onClose }) {
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isVisible])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isVisible, onClose])

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <>
      <div 
        className={`notification-overlay ${isVisible ? 'show' : ''}`}
        onClick={handleOverlayClick}
      />
      <div className={`contact-notification ${isVisible ? 'show' : ''}`}>
        <div className="notification-header">
          <h3 className="notification-title">Info Form Kontak</h3>
        </div>
        
        <p className="notification-content">
          Pesan Anda akan dikirim langsung ke dashboard saya
        </p>
        
        <div className="notification-fields">
          <div className="field-item">
            <div className="field-icon"></div>
            <span className="field-name">Nama</span>
          </div>
          <div className="field-item">
            <div className="field-icon"></div>
            <span className="field-name">Email</span>
          </div>
          <div className="field-item">
            <div className="field-icon"></div>
            <span className="field-name">Pesan</span>
          </div>
         
        </div>
        
        <div className="notification-footer">
          <button className="notification-close" onClick={onClose}>
            Mengerti!
          </button>
        </div>
      </div>
    </>
  )
}

export default ContactNotification