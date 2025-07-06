import { useState, useEffect } from 'react'
import './LoadingScreen.css'

function LoadingScreen({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Memuat')
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const loadingSteps = [
      { progress: 20, text: 'Memuat', duration: 200 },
      { progress: 40, text: 'Menyiapkan', duration: 200 },
      { progress: 60, text: 'Mengatur', duration: 200 },
      { progress: 80, text: 'Hampir siap', duration: 200 },
      { progress: 100, text: 'Selesai', duration: 300 }
    ]

    let currentStep = 0
    let currentProgress = 1

    // Start with 1%
    setProgress(1)

    const progressInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        
        // Update loading text
        setLoadingText(step.text)
        
        // Smooth progress increment
        const increment = (step.progress - currentProgress) / 15
        
        const smoothProgress = setInterval(() => {
          currentProgress += increment
          
          if (currentProgress >= step.progress) {
            currentProgress = step.progress
            setProgress(Math.round(currentProgress))
            clearInterval(smoothProgress)
            
            // Move to next step
            setTimeout(() => {
              currentStep++
              if (currentStep >= loadingSteps.length) {
                // Loading complete
                setTimeout(() => {
                  setIsVisible(false)
                  setTimeout(() => {
                    onLoadingComplete()
                  }, 600) // Wait for fade out
                }, 200)
              }
            }, step.duration)
          } else {
            setProgress(Math.round(currentProgress))
          }
        }, 30)
      }
    }, 50)

    // Cleanup
    return () => {
      clearInterval(progressInterval)
    }
  }, [onLoadingComplete])

  return (
    <div className={`loading-screen ${!isVisible ? 'fade-out' : ''}`}>
      <div className="loading-content">
        {/* Logo */}
        <div className="loading-logo">
          <div className="logo-icon">
            <img src="/logo.png" alt="Logo" className="logo-image" />
          </div>
        </div>

        {/* Progress container */}
        <div className="progress-container">
          <div className="progress-percentage">{progress}</div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Loading status */}
        <div className="loading-status">
          {loadingText}
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen