import { useEffect, useRef, useState } from 'react'
import ProjectModal from './ProjectModal'
import './Projects.css'

// Import gambar lokal
import nayaImg from '../assets/naya.png'
import capstoneImg from '../assets/capstone.png'
import umkmImg from '../assets/umkm.png'

function Projects() {
  const sectionRef = useRef(null)
  const [selectedProject, setSelectedProject] = useState(null)
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

    const elementsToObserve = sectionRef.current?.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in')
    elementsToObserve?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const openModal = (project) => {
    event?.preventDefault()
    event?.stopPropagation()
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    event?.preventDefault()
    event?.stopPropagation()
    setIsModalOpen(false)
    setTimeout(() => setSelectedProject(null), 300)
  }

  const projects = [
    {
      id: 1,
      title: 'UI Naya AI Apps',
      description: 'Solusi e-commerce modern dengan pembayaran aman, inventori real-time, dan desain responsif.',
      technologies: ['UI UX', 'Figma'],
      image: nayaImg,
      demoLink: '#',
      githubLink: '#'
    },
    {
      id: 2,
      title: 'Capstone MSIB',
      description: 'Menyelesaikan tugas akhir membuat frontend e-commerce',
      technologies: ['React', 'Redux', 'Local Storage', 'UI Library'],
      image: capstoneImg,
      demoLink: '#',
      githubLink: '#'
    },
    {
      id: 3,
      title: 'Web UMKM',
      description: 'Aplikasi cuaca canggih dengan chart interaktif, prediksi lokasi, dan UI animasi.',
      technologies: ['React', 'axios', 'Supabase', 'Tailwind'],
      image: umkmImg,
      demoLink: '#',
      githubLink: '#'
    }
  ]

  return (
    <section id="projects" className="projects section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title fade-in">Proyek Unggulan</h2>
        <p className="projects-subtitle fade-in">
          Karya terbaru yang menggabungkan desain modern dengan teknologi terdepan
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card scale-in`}
              style={{ animationDelay: `${index * 0.2}s` }}
              // onClick={() => openModal(project)} // sementara dinonaktifkan
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>

              <div className="project-content">
                <div className="project-number">0{project.id}</div>
                <h3>{project.title}</h3>
                <div className="project-tech">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  )
}

export default Projects
