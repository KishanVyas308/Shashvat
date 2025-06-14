import React, { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play, Info, ZoomIn } from 'lucide-react'

const slides = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.25_a9fdebb9.jpg?alt=media&token=3788136b-5328-41a1-bcf2-06db7f49d833',
    title: 'Components Parts',
    description: 'Our component parts category encompasses a wide range of brass parts used in diverse industries such as automotive, electronics, and machinery.',
    category: 'Industrial Components'
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.26_92957453.jpg?alt=media&token=fa0ee2f1-2e96-49c8-ad18-43c7cdf1ebfa',
    title: 'Sanitary Parts',
    description: 'Our sanitary brass parts are designed with precision and quality to ensure optimal performance and durability in plumbing and sanitary applications.',
    category: 'Plumbing Solutions'
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp_Image_2024-06-22_at_00.04.04_365b4e8b-transformed.jpeg?alt=media&token=f0f4273c-4b1d-468f-a99f-0b36583007c0',
    title: 'Hardware Parts',
    description: 'Our brass hardware parts are crafted to meet the highest standards of strength and reliability, making them ideal for various industrial and construction applications.',
    category: 'Construction Hardware'
  },
]

export default function EnhancedHeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [showInfo, setShowInfo] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [imageLoaded, setImageLoaded] = useState({})
  const [autoplayProgress, setAutoplayProgress] = useState(0)

  const handlePrev = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning])

  const handleNext = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setActiveIndex((prevIndex) => 
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    )
    setTimeout(() => setIsTransitioning(false), 300)
  }, [isTransitioning])

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay(!isAutoplay)
    setAutoplayProgress(0)
  }, [isAutoplay])

  const toggleInfo = useCallback(() => {
    setShowInfo(!showInfo)
  }, [showInfo])

  const goToSlide = useCallback((index) => {
    if (isTransitioning || index === activeIndex) return
    setIsTransitioning(true)
    setActiveIndex(index)
    setAutoplayProgress(0)
    setTimeout(() => setIsTransitioning(false), 300)
  }, [activeIndex, isTransitioning])

  // Enhanced touch handlers with drag support
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleTouchMove = (e) => {
    if (!touchStart) return
    const currentTouch = e.targetTouches[0].clientX
    setTouchEnd(currentTouch)
    const offset = currentTouch - touchStart
    setDragOffset(Math.max(-100, Math.min(100, offset / 3)))
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false)
      setDragOffset(0)
      return
    }
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 80
    const isRightSwipe = distance < -80

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()
    
    setIsDragging(false)
    setDragOffset(0)
  }

  // Mouse drag support for desktop
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX)
    setIsDragging(true)
    setDragOffset(0)
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !touchStart) return
    const offset = e.clientX - touchStart 
    setDragOffset(Math.max(-100, Math.min(100, offset / 3)))
  }

  const handleMouseUp = (e) => {
    if (!isDragging || !touchStart) return
    const distance = touchStart - e.clientX
    const isLeftSwipe = distance > 80
    const isRightSwipe = distance < -80

    if (isLeftSwipe) handleNext()
    if (isRightSwipe) handlePrev()
    
    setIsDragging(false)
    setDragOffset(0)
    setTouchStart(null)
  }

  // Image loading handler
  const handleImageLoad = (index) => {
    setImageLoaded(prev => ({ ...prev, [index]: true }))
  }

  // Autoplay with progress
  useEffect(() => {
    if (!isAutoplay) return
    
    let progress = 0
    const interval = setInterval(() => {
      progress += 2
      setAutoplayProgress(progress)
      
      if (progress >= 100) {
        handleNext()
        progress = 0
        setAutoplayProgress(0)
      }
    }, 100)
    
    return () => clearInterval(interval)
  }, [handleNext, isAutoplay, activeIndex])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') handlePrev()
      else if (event.key === 'ArrowRight') handleNext()
      else if (event.key === ' ') {
        event.preventDefault()
        toggleAutoplay()
      }
      else if (event.key.toLowerCase() === 'i') toggleInfo()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext, toggleInfo, toggleAutoplay])

  // Mouse leave cleanup
  useEffect(() => {
    const handleMouseLeave = () => {
      if (isDragging) {
        setIsDragging(false)
        setDragOffset(0)
        setTouchStart(null)
      }
    }
    
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, touchStart])

  return (
    <div className="relative w-full h-[40vh] sm:h-[40vh] md:h-[50vh] lg:h-[50vh] xl:h-[80vh] 2xl:h-[85vh] min-h-[300px] max-h-screen overflow-hidden bg-gray-900 select-none">
      {/* Slider Container */}
      <div 
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        style={{
          transform: `translateX(${dragOffset}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === activeIndex
          const isPrev = index === (activeIndex - 1 + slides.length) % slides.length
          const isNext = index === (activeIndex + 1) % slides.length
          
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive 
                  ? 'opacity-100 scale-100 z-20' 
                  : isPrev || isNext
                    ? 'opacity-30 scale-95 z-10'
                    : 'opacity-0 scale-90 z-0'
              }`}
              style={{
                transform: `translateX(${
                  isPrev ? '-20%' : isNext ? '20%' : '0%'
                }) scale(${isActive ? 1 : 0.9})`
              }}
            >
              {/* Background Image with Ken Burns effect */}
              <div className="w-full h-full relative overflow-hidden bg-gray-800">
                <div className={`w-full h-full transition-transform duration-[10s] ease-linear ${
                  isActive && !isDragging ? 'scale-110' : 'scale-100'
                }`}>
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                    onLoad={() => handleImageLoad(index)}
                  />
                  {!imageLoaded[index] && (
                    <div className="absolute inset-0 bg-gray-700 animate-pulse flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Multi-layer Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
              
              {/* Content with improved typography and animations */}
              <div className="absolute inset-0 flex items-end justify-center text-white px-4 sm:px-6 pb-16 sm:pb-20 md:pb-24">
                <div className={`text-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl transition-all duration-700 ${
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/10 shadow-2xl">
                    {/* Category Badge */}
                    <div className="inline-block bg-[#c5b173] text-black text-xs sm:text-sm font-semibold px-3 py-1 rounded-full mb-3 sm:mb-4">
                      {slide.category}
                    </div>
                    
                    {/* Title with gradient text */}
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                      {slide.title}
                    </h2>
                    
                    {/* Description with better readability */}
                    <p className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 transition-all duration-500 ${
                      showInfo || window.innerWidth >= 640 ? 'opacity-100 translate-y-0 max-h-40' : 'opacity-0 translate-y-4 max-h-0 overflow-hidden'
                    }`}>
                      {slide.description}
                    </p>
                    
                    {/* Call to action button - Hidden on small screens (below sm breakpoint) */}
                  <div className="flex justify-center">
  <button className="hidden sm:block mt-4 sm:mt-6 px-6 py-3 bg-[#c5b173] text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-black">
    Learn More
  </button>
</div>

                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Enhanced Navigation Controls - Desktop */}
      <div className="hidden lg:block">
        <button
          className="absolute left-4 xl:left-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-4 xl:p-5 backdrop-blur-md transition-all duration-300 z-30 border border-white/20 group hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={handlePrev}
          disabled={isTransitioning}
          aria-label="Previous slide"
        >
          <ChevronLeft className="text-white h-6 w-6 xl:h-7 xl:w-7 group-hover:animate-pulse" />
        </button>
        <button
          className="absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 rounded-full p-4 xl:p-5 backdrop-blur-md transition-all duration-300 z-30 border border-white/20 group hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
          onClick={handleNext}
          disabled={isTransitioning}
          aria-label="Next slide"
        >
          <ChevronRight className="text-white h-6 w-6 xl:h-7 xl:w-7 group-hover:animate-pulse" />
        </button>
      </div>

      {/* Enhanced Bottom Controls */}
      <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        {/* Mobile Info Toggle */}
       
        
        {/* Control Buttons with improved design */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6">
          <button
            className="bg-black/40 hover:bg-black/60 rounded-full p-3 sm:p-4 backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={handlePrev}
            disabled={isTransitioning}
            aria-label="Previous slide"
          >
            <ChevronLeft className="text-white h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <button
            className="bg-black/40 hover:bg-black/60 rounded-full p-3 sm:p-4 backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 relative overflow-hidden"
            onClick={toggleAutoplay}
            aria-label={isAutoplay ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoplay && (
              <div 
                className="absolute inset-0 bg-[#c5b173] rounded-full transition-all duration-100"
                style={{ 
                  transform: `scale(${autoplayProgress / 100})`,
                  opacity: autoplayProgress / 100
                }}
              />
            )}
            {isAutoplay ? (
              <Pause className="text-white h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
            ) : (
              <Play className="text-white h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
            )}
          </button>
          
          <button
            className="bg-black/40 hover:bg-black/60 rounded-full p-3 sm:p-4 backdrop-blur-md transition-all duration-300 border border-white/20 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={handleNext}
            disabled={isTransitioning}
            aria-label="Next slide"
          >
            <ChevronRight className="text-white h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>

        {/* Enhanced Pagination Dots */}
        <div className="flex justify-center gap-2 sm:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded-full ${
                index === activeIndex 
                  ? 'w-8 sm:w-12 h-3 sm:h-4' 
                  : 'w-3 h-3 sm:w-4 sm:h-4 hover:scale-125'
              }`}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={`w-full h-full rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'bg-transparent' 
                  : 'bg-white/50 hover:bg-white/80'
              }`} />
              {index === activeIndex && isAutoplay && (
                <div 
                  className="absolute inset-0 bg-[#c5b173] rounded-full transition-all duration-100 origin-left"
                  style={{ 
                    width: `${autoplayProgress}%`
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Slide counter */}
    

      {/* Keyboard shortcuts hint */}
    
    </div>
  )
}