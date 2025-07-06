import { useEffect, useRef } from 'react'
import './Skills.css'

function Skills() {
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

  const skills = [
    {
      name: 'Figma',
       icon: '◉',
      category: 'Design',
      description: 'UI/UX Design & Prototyping'
    },
    {
      name: 'React JS',
      icon: '◉',
      category: 'Frontend',
      description: 'Component-based UI Library'
    },
    {
      name: 'Express JS',
       icon: '◉',
      category: 'Backend',
      description: 'Node.js Web Framework'
    },
    {
      name: 'PostgreSQL',
       icon: '◉',
      category: 'Database',
      description: 'Relational Database System'
    }
  ]

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-titlee fade-in">Keahlian & Tools</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={skill.name} className="skill-card scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="skill-icon">
                <span>{skill.icon}</span>
              </div>
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <span className="skill-category">{skill.category}</span>
                <p>{skill.description}</p>
              </div>
              <div className="skill-hover-effect"></div>
            </div>
          ))}
        </div>
        <div className="skills-additional fade-in">
          <h3>Keahlian Tambahan</h3>
          <div className="additional-skills">
            <span className="skill-tag">HTML5</span>
            <span className="skill-tag">CSS3</span>
            <span className="skill-tag">JavaScript</span>
            <span className="skill-tag">TypeScript</span>
            <span className="skill-tag">Next.js</span>
            <span className="skill-tag">Redux</span>
            <span className="skill-tag">Tailwind CSS</span>
            <span className="skill-tag">Git</span>
            <span className="skill-tag">REST APIs</span>
            <span className="skill-tag">Desain Responsif</span>
            <span className="skill-tag">User Testing</span>
            <span className="skill-tag">Wireframing</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills