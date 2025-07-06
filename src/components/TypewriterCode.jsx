import { useState, useEffect } from 'react'
import './TypewriterCode.css'

function TypewriterCode() {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const codeText = `const developer = {
  nama: "Hary Kurniawan",
  fokus: "UI/UX & Frontend Developer",
  passion: "Design",
  mindset: "Build better, think deeper",

  buat: function() {
    return "Menyederhanakan yang rumit, memperindah yang sederhana..";
  }
};

console.log(developer.buat());`

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.5 }
    )

    const element = document.querySelector('.typewriter-container')
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    if (currentIndex < codeText.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + codeText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 30) // Typing speed - adjust as needed

      return () => clearTimeout(timer)
    }
  }, [currentIndex, codeText, isVisible])

  return (
    <div className="typewriter-container">
      <pre className="typewriter-text">
        {displayedText}
        <span className="cursor">|</span>
      </pre>
    </div>
  )
}

export default TypewriterCode