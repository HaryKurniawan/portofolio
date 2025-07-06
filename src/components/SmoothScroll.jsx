import { useEffect, useRef } from 'react'

function SmoothScroll() {
  const isScrollingRef = useRef(false)
  const scrollTimeoutRef = useRef(null)
  const lastScrollTimeRef = useRef(0)
  const isAtBottomRef = useRef(false)
  const isMobileRef = useRef(false)

  useEffect(() => {
    // Detect if device is mobile
    const checkIfMobile = () => {
      const isMobile = window.innerWidth <= 768 || 
                      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                      ('ontouchstart' in window) ||
                      (navigator.maxTouchPoints > 0)
      
      isMobileRef.current = isMobile
      console.log(`📱 Mobile detected: ${isMobile}`)
      return isMobile
    }

    // Initial mobile check
    checkIfMobile()

    // Update mobile detection on resize
    const handleResize = () => {
      checkIfMobile()
    }

    // Get all sections with better detection
    const getAllSections = () => {
      const sections = []
      
      // Get all elements with section tag OR elements with IDs that look like sections
      const sectionSelectors = [
        'section[id]',
        '#home',
        '#about', 
        '#skills',
        '#projects',
        '#certificates',
        '#contact',
        '.hero',
        '.about',
        '.skills', 
        '.projects',
        '.github-cta',
        '.certificates',
        '.contact'
      ]
      
      const foundElements = new Set()
      
      sectionSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector)
          elements.forEach(element => {
            // Avoid duplicates
            if (!foundElements.has(element)) {
              foundElements.add(element)
              
              // Get or generate an ID
              let id = element.id
              if (!id) {
                // Try to get ID from class name
                const classList = Array.from(element.classList)
                id = classList.find(cls => 
                  ['hero', 'about', 'skills', 'projects', 'github-cta', 'certificates', 'contact'].includes(cls)
                ) || 'section-' + sections.length
              }
              
              sections.push({
                id: id,
                element: element,
                top: element.offsetTop,
                height: element.offsetHeight,
                bottom: element.offsetTop + element.offsetHeight
              })
            }
          })
        } catch (e) {
          // Ignore invalid selectors
        }
      })
      
      // Sort sections by their position on the page
      const sortedSections = sections.sort((a, b) => a.top - b.top)
      
      return sortedSections
    }

    const getCurrentSectionIndex = (sections) => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      // Find the section that contains the current scroll position
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i]
        const nextSection = sections[i + 1]
        
        if (nextSection) {
          // Check if we're between this section and the next
          if (scrollPosition >= section.top && scrollPosition < nextSection.top) {
            return i
          }
        } else {
          // Last section
          if (scrollPosition >= section.top) {
            return i
          }
        }
      }
      
      return 0
    }

    const isNearBottom = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Check if we're within 100px of the bottom
      return (scrollPosition + windowHeight) >= (documentHeight - 100)
    }

    const isInContactSection = (sections) => {
      const currentIndex = getCurrentSectionIndex(sections)
      const currentSection = sections[currentIndex]
      
      // Check if current section is contact (last section)
      return currentSection && (
        currentSection.id === 'contact' || 
        currentSection.id.includes('contact') ||
        currentIndex === sections.length - 1
      )
    }

    const scrollToSection = (sections, index) => {
      if (index < 0 || index >= sections.length) return
      
      const section = sections[index]
      if (section && section.element) {
        isScrollingRef.current = true
        
        console.log(`📍 Scrolling to section: ${section.id}`)
        
        // Scroll to center of the section
        const sectionTop = section.top
        const sectionHeight = section.height
        const windowHeight = window.innerHeight
        const scrollTo = sectionTop + (sectionHeight / 2) - (windowHeight / 2)
        
        window.scrollTo({
          top: Math.max(0, scrollTo),
          behavior: 'smooth'
        })

        // Reset scrolling flag after animation completes
        setTimeout(() => {
          isScrollingRef.current = false
        }, 1000)
      }
    }

    const handleWheel = (e) => {
      // Skip if modal is open
      if (window.modalOpen) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      
      // Skip scroll snap on mobile devices
      if (isMobileRef.current) {
        return // Allow normal scrolling on mobile
      }

      // Prevent if already scrolling programmatically
      if (isScrollingRef.current) {
        e.preventDefault()
        return
      }

      const now = Date.now()
      
      // Throttle wheel events
      if (now - lastScrollTimeRef.current < 150) {
        e.preventDefault()
        return
      }
      
      lastScrollTimeRef.current = now
      
      // Get all sections dynamically each time
      const sections = getAllSections()
      if (sections.length === 0) return
      
      const currentSectionIndex = getCurrentSectionIndex(sections)
      const delta = e.deltaY
      const nearBottom = isNearBottom()
      const inContactSection = isInContactSection(sections)

      // Update bottom state
      isAtBottomRef.current = nearBottom

      console.log(`🎯 Current section: ${sections[currentSectionIndex]?.id} (index: ${currentSectionIndex})`)
      console.log(`📍 Near bottom: ${nearBottom}, In contact: ${inContactSection}`)

      // Special handling for contact section and footer area
      if (inContactSection) {
        if (delta > 0) {
          // Scrolling down in contact section
          if (!nearBottom) {
            // Allow normal scroll to show footer
            console.log('🔽 Allowing scroll to footer')
            return // Don't prevent default, allow normal scroll
          } else {
            // Already at bottom, prevent further scrolling
            e.preventDefault()
            return
          }
        } else {
          // Scrolling up from contact section
          if (nearBottom) {
            // If we're at the bottom, allow normal scroll up first
            console.log('🔼 Allowing scroll up from footer')
            return // Don't prevent default, allow normal scroll
          } else {
            // If we're in contact but not at bottom, snap to previous section
            e.preventDefault()
            const targetIndex = Math.max(currentSectionIndex - 1, 0)
            scrollToSection(sections, targetIndex)
            return
          }
        }
      }

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Prevent default scroll for section snapping
      e.preventDefault()

      // Determine scroll direction and target section
      let targetIndex = currentSectionIndex
      
      if (delta > 0) {
        // Scrolling down
        targetIndex = Math.min(currentSectionIndex + 1, sections.length - 1)
      } else {
        // Scrolling up
        targetIndex = Math.max(currentSectionIndex - 1, 0)
      }

      // Scroll to target section
      scrollToSection(sections, targetIndex)
    }

    const handleKeyDown = (e) => {
      // Skip if modal is open
      if (window.modalOpen) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
      
      // Skip scroll snap on mobile devices
      if (isMobileRef.current) {
        return // Allow normal scrolling on mobile
      }

      if (isScrollingRef.current) return

      // Get all sections dynamically
      const sections = getAllSections()
      if (sections.length === 0) return
      
      const currentSectionIndex = getCurrentSectionIndex(sections)
      const inContactSection = isInContactSection(sections)
      const nearBottom = isNearBottom()

      // Special handling for contact section
      if (inContactSection && (e.key === 'ArrowDown' || e.key === 'PageDown')) {
        if (!nearBottom) {
          // Allow normal scroll to show footer
          return
        } else {
          // Already at bottom, prevent further scrolling
          e.preventDefault()
          return
        }
      }

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault()
          scrollToSection(sections, Math.min(currentSectionIndex + 1, sections.length - 1))
          break
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault()
          // If we're at bottom of contact, scroll up normally first
          if (inContactSection && nearBottom) {
            window.scrollBy({ top: -window.innerHeight / 2, behavior: 'smooth' })
          } else {
            scrollToSection(sections, Math.max(currentSectionIndex - 1, 0))
          }
          break
        case 'Home':
          e.preventDefault()
          scrollToSection(sections, 0)
          break
        case 'End':
          e.preventDefault()
          // Scroll to bottom of page (footer area)
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          })
          break
      }
    }

    // Monitor scroll position to detect when user scrolls up from footer
    const handleScroll = () => {
      // Skip if modal is open
      if (window.modalOpen) {
        return false
      }
      
      // Skip scroll snap on mobile devices
      if (isMobileRef.current) {
        return // Allow normal scrolling on mobile
      }

      if (isScrollingRef.current) return
      
      const sections = getAllSections()
      if (sections.length === 0) return
      
      const nearBottom = isNearBottom()
      const inContactSection = isInContactSection(sections)
      
      // If user was at bottom and scrolled up significantly, re-enable snap scrolling
      if (isAtBottomRef.current && !nearBottom && inContactSection) {
        console.log('🔄 Re-enabling snap scroll from footer area')
        isAtBottomRef.current = false
      }
    }

    // Initial detection
    setTimeout(() => {
      getAllSections()
    }, 1000)

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false, capture: true })
    window.addEventListener('keydown', handleKeyDown, { capture: true })
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel, { capture: true })
      window.removeEventListener('keydown', handleKeyDown, { capture: true })
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return null // This component doesn't render anything
}

export default SmoothScroll