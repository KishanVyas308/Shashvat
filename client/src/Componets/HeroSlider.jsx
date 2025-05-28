'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'

const slides = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.25_a9fdebb9.jpg?alt=media&token=3788136b-5328-41a1-bcf2-06db7f49d833',
    title: 'Components Parts',
    description: 'Our component parts category encompasses a wide range of brass parts used in diverse industries such as automotive, electronics, and machinery.',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.26_92957453.jpg?alt=media&token=fa0ee2f1-2e96-49c8-ad18-43c7cdf1ebfa',
    title: 'Sanitary Parts',
    description: 'Our sanitary brass parts are designed with precision and quality to ensure optimal performance and durability in plumbing and sanitary applications.',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp_Image_2024-06-22_at_00.04.04_365b4e8b-transformed.jpeg?alt=media&token=f0f4273c-4b1d-468f-a99f-0b36583007c0',
    title: 'Hardware Parts',
    description: 'Our brass hardware parts are crafted to meet the highest standards of strength and reliability, making them ideal for various industrial and construction applications.',
  },
]

export default function HeroSlider() {
  const [swiper, setSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(true)
  const [showInfo, setShowInfo] = useState(false)

  const handlePrev = useCallback(() => {
    swiper?.slidePrev()
  }, [swiper])

  const handleNext = useCallback(() => {
    swiper?.slideNext()
  }, [swiper])

  const toggleAutoplay = useCallback(() => {
    if (!swiper) return
    isAutoplay ? swiper.autoplay.stop() : swiper.autoplay.start()
    setIsAutoplay(!isAutoplay)
  }, [swiper, isAutoplay])

  const toggleInfo = useCallback(() => {
    setShowInfo(!showInfo)
  }, [showInfo])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') handlePrev()
      else if (event.key === 'ArrowRight') handleNext()
      else if (event.key.toLowerCase() === 'i') toggleInfo()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext, toggleInfo])

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-black">
      <Swiper
        effect="fade"
        grabCursor
        centeredSlides
        slidesPerView={1}
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        modules={[EffectFade, Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
            <div className="absolute inset-0 flex items-center justify-center text-white p-4 z-20">
              <div className="text-center max-w-2xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fadeInUp">
                  {slide.title}
                </h2>
                <p className={`text-base sm:text-lg md:text-xl transition-opacity duration-300 ${showInfo ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Controls */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-30">
        <button
          className="bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur"
          onClick={handlePrev}
        >
          <ChevronLeft className="text-white h-5 w-5" />
        </button>
        <button
          className="bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur"
          onClick={toggleAutoplay}
        >
          {isAutoplay ? (
            <Pause className="text-white h-5 w-5" />
          ) : (
            <Play className="text-white h-5 w-5" />
          )}
        </button>
        <button
          className="bg-white/20 hover:bg-white/30 rounded-full p-3 backdrop-blur"
          onClick={handleNext}
        >
          <ChevronRight className="text-white h-5 w-5" />
        </button>
      </div>

      {/* Bullets */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
            onClick={() => swiper?.slideTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
