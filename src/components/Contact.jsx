import { useEffect, useRef, useState } from 'react'
import ContactNotification from './ContactNotification'
import './Contact.css'

function Contact() {
  const sectionRef = useRef(null)
  const [showNotification, setShowNotification] = useState(false)
  const [hasShownNotification, setHasShownNotification] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            // Show notification only once when contact section is visible
            if (!hasShownNotification) {
              setTimeout(() => {
                setShowNotification(true)
                setHasShownNotification(true)
              }, 800) // Delay to let the section animation complete
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right')
    elementsToObserve?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [hasShownNotification])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    })
  }

  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Hubungi Saya</h2>
        <div className="contact-content">
          <div className="contact-info slide-in-left">
            {/* <h3>Mari Berkolaborasi</h3> */}
            {/* <p>
              Selalu tertarik dengan peluang baru dan proyek yang menarik. 
              Mari terhubung dan diskusikan ide Anda!
            </p> */}
            <div className="contact-methods">
              <div className="contact-method">
                <div className="method-icon">@</div>
                <div className="method-info">
                  <h4>Email</h4>
                  <p>harykurniawan7723@gmail.com</p>
                </div>
              </div>
              {/* <div className="contact-method">
                <div className="method-icon">☎</div>
                <div className="method-info">
                  <h4>Telepon</h4>
                  <p>+62 812-3456-7890</p>
                </div>
              </div> */}
              <div className="contact-method">
                <div className="method-icon">⌘</div>
                <div className="method-info">
                  <h4>Lokasi</h4>
                  <p>Bandung, Indonesia</p>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">LinkedIn</a>
              <a href="#" className="social-link">GitHub</a>
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Dribbble</a>
              <a href="#" className="social-link">Behance</a>

            </div>
          </div>
          <div className="contact-form slide-in-right">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nama</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email.anda@contoh.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Ketikkan pesan anda..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </div>
      
      <ContactNotification 
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />
    </section>
  )
}

export default Contact