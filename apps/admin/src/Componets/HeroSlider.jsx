'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectFade, Pagination, Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
    if (swiper) {
      swiper.slidePrev()
    }
  }, [swiper])

  const handleNext = useCallback(() => {
    if (swiper) {
      swiper.slideNext()
    }
  }, [swiper])

  const toggleAutoplay = useCallback(() => {
    if (swiper) {
      if (isAutoplay) {
        swiper.autoplay.stop()
      } else {
        swiper.autoplay.start()
      }
      setIsAutoplay(!isAutoplay)
    }
  }, [swiper, isAutoplay])

  const toggleInfo = useCallback(() => {
    setShowInfo(!showInfo)
  }, [showInfo])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        handlePrev()
      } else if (event.key === 'ArrowRight') {
        handleNext()
      } else if (event.key === 'i' || event.key === 'I') {
        toggleInfo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handlePrev, handleNext, toggleInfo])

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        effect={'fade'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        fadeEffect={{
          crossFade: true
        }}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + ' w-2 h-2 md:w-3 md:h-3"></span>'
          }
        }}
        navigation={false}
        modules={[EffectFade, Pagination, Autoplay, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center z-10 text-white p-4 md:p-8 text-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{slide.title}</h2>
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl ${showInfo ? 'block' : 'hidden md:block'}`}>{slide.description}</p>
                 
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Buttons */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center justify-center space-x-4 z-20">
        <button
          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3"
          onClick={toggleAutoplay}
        >
          {isAutoplay ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
        </button>
        <button
          className="rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 p-3"
          onClick={handleNext}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Pagination */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20 pb-4">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
            onClick={() => swiper && swiper.slideTo(index)}
          />
        ))}
      </div>
    </div>
  )
}
