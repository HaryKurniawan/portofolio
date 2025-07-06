import { useEffect } from 'react'
import './ProjectModal.css'

function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open')
      // Disable all scroll behaviors when modal is open
      window.modalOpen = true
      
      // Store current scroll position
      window.modalScrollPosition = window.scrollY
      
      // Prevent any scroll events
      const preventScroll = (e) => {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      
      // Add scroll prevention
      window.addEventListener('scroll', preventScroll, { passive: false })
      window.addEventListener('wheel', preventScroll, { passive: false })
      window.addEventListener('touchmove', preventScroll, { passive: false })
      window.addEventListener('keydown', preventScroll, { passive: false })
      
      // Store the prevention function for cleanup
      window.modalPreventScroll = preventScroll
    } else {
      document.body.classList.remove('modal-open')
      window.modalOpen = false
      
      // Remove scroll prevention
      if (window.modalPreventScroll) {
        window.removeEventListener('scroll', window.modalPreventScroll)
        window.removeEventListener('wheel', window.modalPreventScroll)
        window.removeEventListener('touchmove', window.modalPreventScroll)
        window.removeEventListener('keydown', window.modalPreventScroll)
        window.modalPreventScroll = null
      }
      
      // Restore scroll position if it changed
      if (window.modalScrollPosition !== undefined) {
        window.scrollTo(0, window.modalScrollPosition)
        window.modalScrollPosition = undefined
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open')
      window.modalOpen = false
      
      // Cleanup scroll prevention
      if (window.modalPreventScroll) {
        window.removeEventListener('scroll', window.modalPreventScroll)
        window.removeEventListener('wheel', window.modalPreventScroll)
        window.removeEventListener('touchmove', window.modalPreventScroll)
        window.removeEventListener('keydown', window.modalPreventScroll)
        window.modalPreventScroll = null
      }
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

  if (!project) return null

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const projectDetails = {
    1: {
      fullDescription: "Platform e-commerce komprehensif yang dibangun dengan teknologi modern dan best practices. Proyek ini menampilkan pola React tingkat lanjut, manajemen state dengan Redux, pemrosesan pembayaran aman dengan Stripe, dan backend Node.js yang robust. Platform ini memiliki fitur manajemen inventori real-time, pencarian dan filter canggih, autentikasi pengguna, pelacakan pesanan, dan dashboard admin yang intuitif.",
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'PostgreSQL', icon: '🐘' },
        { name: 'Stripe', icon: '💳' },
        { name: 'Redux', icon: '🔄' },
        { name: 'Express', icon: '🚀' },
        { name: 'JWT', icon: '🔐' },
        { name: 'AWS S3', icon: '☁️' }
      ],
      features: [
        {
          icon: '🛒',
          title: 'Keranjang Belanja & Checkout',
          description: 'Fungsi keranjang canggih dengan penyimpanan persisten dan proses checkout yang aman'
        },
        {
          icon: '💳',
          title: 'Integrasi Pembayaran',
          description: 'Pemrosesan pembayaran aman dengan Stripe mendukung berbagai metode pembayaran'
        },
        {
          icon: '📊',
          title: 'Dashboard Admin',
          description: 'Panel admin komprehensif untuk mengelola produk, pesanan, dan analitik'
        },
        {
          icon: '🔍',
          title: 'Pencarian Canggih',
          description: 'Pencarian pintar dengan filter, sorting, dan saran real-time'
        },
        {
          icon: '📱',
          title: 'Desain Responsif',
          description: 'Dioptimalkan untuk semua perangkat dengan pendekatan mobile-first'
        },
        {
          icon: '🔐',
          title: 'Autentikasi Pengguna',
          description: 'Sistem login aman dengan token JWT dan enkripsi password'
        }
      ],
      challenges: [
        {
          icon: '💳',
          title: 'Keamanan Pembayaran',
          problem: 'Mengimplementasikan pemrosesan pembayaran yang aman sambil mempertahankan pengalaman pengguna dan menangani berbagai metode pembayaran di berbagai wilayah.',
          solution: 'Mengintegrasikan Stripe dengan kepatuhan PCI, mengimplementasikan tokenisasi untuk data kartu, menambahkan autentikasi 3D Secure, dan membuat metode pembayaran cadangan.',
          result: 'Mencapai tingkat keberhasilan pembayaran 99,9% tanpa insiden keamanan dan mengurangi cart abandonment sebesar 35%.'
        },
        {
          icon: '📊',
          title: 'Inventori Real-time',
          problem: 'Mengelola inventori di beberapa gudang dengan update real-time sambil mencegah overselling selama periode traffic tinggi.',
          solution: 'Mengimplementasikan Redis caching dengan database locks, membuat sistem reservasi inventori, dan menambahkan update WebSocket real-time.',
          result: 'Menghilangkan masalah overselling dan meningkatkan akurasi inventori menjadi 99,8% dengan visibilitas stok real-time.'
        },
        {
          icon: '⚡',
          title: 'Optimasi Performa',
          problem: 'Aplikasi lambat dengan katalog produk besar, mempengaruhi pengalaman pengguna dan ranking SEO.',
          solution: 'Mengimplementasikan lazy loading, optimasi gambar, indexing database, dan React.memo untuk optimasi komponen.',
          result: 'Mengurangi waktu loading halaman sebesar 60% dan meningkatkan skor Core Web Vitals, menghasilkan peningkatan conversion rate 25%.'
        }
      ]
    },
    2: {
      fullDescription: "Aplikasi manajemen proyek intuitif yang dirancang untuk tim modern. Dibangun dengan React dan TypeScript untuk type safety, menampilkan kolaborasi real-time melalui Socket.io, dan backend MongoDB yang powerful. Aplikasi ini mencakup pelacakan proyek canggih, manajemen tim, berbagi file, pelacakan waktu, dan fitur pelaporan komprehensif.",
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'TypeScript', icon: '📘' },
        { name: 'Socket.io', icon: '🔌' },
        { name: 'MongoDB', icon: '🍃' },
        { name: 'Express', icon: '🚀' },
        { name: 'Node.js', icon: '🟢' },
        { name: 'JWT', icon: '🔐' },
        { name: 'Cloudinary', icon: '☁️' }
      ],
      features: [
        {
          icon: '📋',
          title: 'Manajemen Tugas',
          description: 'Membuat, menugaskan, dan melacak tugas dengan fungsi drag-and-drop'
        },
        {
          icon: '👥',
          title: 'Kolaborasi Tim',
          description: 'Update real-time, komentar, dan fitur komunikasi tim'
        },
        {
          icon: '📊',
          title: 'Analitik Proyek',
          description: 'Pelaporan dan analitik komprehensif untuk wawasan proyek'
        },
        {
          icon: '⏰',
          title: 'Pelacakan Waktu',
          description: 'Pelacakan waktu built-in dengan laporan detail dan metrik produktivitas'
        },
        {
          icon: '📁',
          title: 'Manajemen File',
          description: 'Upload, atur, dan bagikan file proyek dengan version control'
        },
        {
          icon: '🔔',
          title: 'Notifikasi',
          description: 'Notifikasi real-time untuk update, deadline, dan mention'
        }
      ],
      challenges: [
        {
          icon: '🔄',
          title: 'Sinkronisasi Real-time',
          problem: 'Memastikan semua anggota tim melihat update secara instan tanpa konflik ketika beberapa pengguna mengedit proyek yang sama secara bersamaan.',
          solution: 'Mengimplementasikan operational transformation dengan Socket.io, menambahkan algoritma resolusi konflik, dan membuat optimistic UI updates.',
          result: 'Mencapai kolaborasi real-time yang seamless dengan akurasi sinkronisasi 99,9% dan meningkatkan produktivitas tim sebesar 40%.'
        },
        {
          icon: '📈',
          title: 'Arsitektur Scalable',
          problem: 'Performa aplikasi menurun dengan tim besar dan proyek kompleks, menyebabkan waktu loading lambat dan timeout.',
          solution: 'Mendesain ulang skema database dengan indexing yang tepat, mengimplementasikan paginasi data, dan menambahkan lapisan caching.',
          result: 'Mendukung tim 10x lebih besar dengan waktu loading 70% lebih cepat dan menghilangkan masalah timeout sepenuhnya.'
        },
        {
          icon: '🎯',
          title: 'User Experience',
          problem: 'Fitur manajemen proyek yang kompleks membuat pengguna baru kewalahan, menyebabkan tingkat adopsi rendah.',
          solution: 'Membuat progressive disclosure UI, menambahkan onboarding interaktif, dan mengimplementasikan sistem bantuan kontekstual.',
          result: 'Meningkatkan adopsi pengguna sebesar 85% dan mengurangi tiket support sebesar 50% melalui desain UX yang lebih baik.'
        }
      ]
    },
    3: {
      fullDescription: "Aplikasi cuaca canggih yang melampaui prediksi dasar. Menampilkan visualisasi data interaktif menggunakan Chart.js, layanan berbasis lokasi, analisis cuaca historis, dan komponen UI animasi yang indah. Dibangun sebagai Progressive Web App (PWA) untuk fungsi offline dan optimasi mobile.",
      technologies: [
        { name: 'React', icon: '⚛️' },
        { name: 'Chart.js', icon: '📊' },
        { name: 'Weather API', icon: '🌤️' },
        { name: 'CSS3', icon: '🎨' },
        { name: 'PWA', icon: '📱' },
        { name: 'Geolocation', icon: '📍' },
        { name: 'LocalStorage', icon: '💾' },
        { name: 'Service Worker', icon: '⚙️' }
      ],
      features: [
        {
          icon: '🌡️',
          title: 'Prediksi Detail',
          description: 'Prediksi per jam dan 7 hari dengan metrik cuaca detail'
        },
        {
          icon: '📊',
          title: 'Chart Interaktif',
          description: 'Visualisasi data indah untuk suhu, kelembaban, dan curah hujan'
        },
        {
          icon: '📍',
          title: 'Layanan Lokasi',
          description: 'Deteksi lokasi otomatis dengan pencarian lokasi manual'
        },
        {
          icon: '📱',
          title: 'Fitur PWA',
          description: 'Fungsi offline, push notification, dan pengalaman seperti aplikasi'
        },
        {
          icon: '🎨',
          title: 'UI Animasi',
          description: 'Animasi halus dan background dinamis berdasarkan cuaca'
        },
        {
          icon: '📈',
          title: 'Data Historis',
          description: 'Akses ke pola dan tren cuaca historis'
        }
      ],
      challenges: [
        {
          icon: '📡',
          title: 'Pembatasan API',
          problem: 'API cuaca memiliki batas rate yang ketat menyebabkan gangguan layanan selama waktu penggunaan puncak.',
          solution: 'Mengimplementasikan strategi caching cerdas, menambahkan fallback API multiple, dan membuat sistem antrian request.',
          result: 'Mencapai uptime 99,9% dengan pengurangan panggilan API 80% sambil mempertahankan akurasi data real-time.'
        },
        {
          icon: '📱',
          title: 'Fungsi Offline',
          problem: 'Pengguna membutuhkan informasi cuaca bahkan tanpa koneksi internet, terutama untuk aktivitas outdoor.',
          solution: 'Membangun Progressive Web App dengan service workers, mengimplementasikan penyimpanan data lokal, dan menambahkan background sync.',
          result: 'Mengaktifkan fungsi offline penuh dengan prediksi cache 7 hari, meningkatkan engagement pengguna sebesar 60%.'
        },
        {
          icon: '📊',
          title: 'Visualisasi Data',
          problem: 'Data cuaca kompleks sulit dipahami, menyebabkan engagement pengguna yang buruk dengan prediksi detail.',
          solution: 'Membuat chart interaktif dengan Chart.js, menambahkan ikon cuaca animasi, dan mengimplementasikan progressive data disclosure.',
          result: 'Meningkatkan engagement pengguna sebesar 120% dan meningkatkan waktu yang dihabiskan pada prediksi detail sebesar 200%.'
        }
      ]
    }
  }

  const details = projectDetails[project.id] || {}

  return (
    <div 
      className={`project-modal-overlay ${isOpen ? 'active' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="project-modal">
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>
        
        <div className="modal-header">
          <img src={project.image} alt={project.title} />
          <div className="modal-header-overlay">
            <h2 className="modal-title">{project.title}</h2>
          </div>
        </div>

        <div className="modal-content">
          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="section-icon">📝</span>
              Gambaran Proyek
            </h3>
            <p className="modal-description">
              {details.fullDescription || project.description}
            </p>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">
              <span className="section-icon">🛠️</span>
              Teknologi yang Digunakan
            </h3>
            <div className="modal-tech-grid">
              {(details.technologies || project.technologies.map(tech => ({ name: tech, icon: '⚡' }))).map((tech) => (
                <div key={tech.name} className="modal-tech-item">
                  <span className="tech-icon">{tech.icon}</span>
                  <span className="tech-name">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {details.features && (
            <div className="modal-section">
              <h3 className="modal-section-title">
                <span className="section-icon">✨</span>
                Fitur Utama
              </h3>
              <div className="modal-features">
                {details.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {details.challenges && (
            <div className="modal-section">
              <h3 className="modal-section-title">
                <span className="section-icon">⚡</span>
                Tantangan & Solusi
              </h3>
              <div className="challenges-grid">
                {details.challenges.map((challenge, index) => (
                  <div key={index} className="challenge-item">
                    <div className="challenge-header">
                      <div className="challenge-icon">{challenge.icon}</div>
                      <h4 className="challenge-title">{challenge.title}</h4>
                    </div>
                    <div className="challenge-content">
                      <div className="challenge-problem">
                        <h5>🔴 Tantangan:</h5>
                        <p>{challenge.problem}</p>
                      </div>
                      <div className="challenge-solution">
                        <h5>🟢 Solusi:</h5>
                        <p>{challenge.solution}</p>
                      </div>
                      <div className="challenge-result">
                        <h5>🎯 Hasil:</h5>
                        <p>{challenge.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions">
            <a 
              href={project.demoLink} 
              className="modal-action-btn primary"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Demo Langsung</span>
              <span className="action-icon">↗</span>
            </a>
            <a 
              href={project.githubLink} 
              className="modal-action-btn"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <span>Lihat Kode</span>
              <span className="action-icon">⚡</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectModal