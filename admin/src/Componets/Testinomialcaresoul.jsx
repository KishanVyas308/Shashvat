"use client"

import { useEffect, useState } from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import "tailwindcss/tailwind.css"
import { Modal, Button, Form, Input, Upload, message } from "antd"
import { useRecoilState, useRecoilValue } from "recoil"
import { userAtom } from "../Atoms/userAtom"
import { storeReview, getAllReviews } from "../backend/manageRewiew"
import { allReviewsAtom } from "../Atoms/allReviewsAtom"
import Loading from "./Loading"
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Quote, 
  UploadIcon, 
  CheckCircle, 
  ImageIcon,
  MessageSquare
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useRecoilState(allReviewsAtom)
  const user = useRecoilValue(userAtom)
  const [modalVisible, setModalVisible] = useState(false)
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [currentRating, setCurrentRating] = useState(5)
  const [previewImage, setPreviewImage] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [form] = Form.useForm()
  const [hoveringStars, setHoveringStars] = useState(0)

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true)
      try {
        const reviews = await getAllReviews()
        setTestimonials(reviews)
      } catch (error) {
        console.error("Error fetching reviews:", error)
        message.error("Failed to load testimonials")
      } finally {
        setLoading(false)
      }
    }
    fetchReviews()
  }, [setTestimonials])

  const handleModalOpen = () => {
    setModalVisible(true)
    setCurrentRating(5)
    setFile(null)
    setPreviewImage(null)
    form.resetFields()
  }

  const handleModalClose = () => {
    setModalVisible(false)
    setShowSuccess(false)
  }

  const handleUpload = ({ file }) => {
    setFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
        setPreviewImage(e.target?.result)
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      await storeReview({ ...values, rating: currentRating }, file)
      const updatedReviews = await getAllReviews()
      setTestimonials(updatedReviews)
      setShowSuccess(true)
      setTimeout(() => {
        handleModalClose()
        setShowSuccess(false)
      }, 2000)
      message.success("Thank you for your review!")
    } catch (error) {
      console.error("Error submitting review:", error)
      message.error("Failed to submit review. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const CustomArrow = ({ onClick, direction }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`absolute z-10 top-1/2 -translate-y-1/2 ${
        direction === "prev" ? "-left-4 md:left-2" : "-right-4 md:right-2"
      } bg-white/90 backdrop-blur-sm w-12 h-12 rounded-full shadow-md transition-all duration-300 
      hover:shadow-lg border border-gray-100/80 group flex items-center justify-center`}
      aria-label={direction === "prev" ? "Previous testimonial" : "Next testimonial"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
      ) : (
        <ChevronRight className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
      )}
    </motion.button>
  )

  const RatingSelector = () => (
    <div className="flex flex-col items-center gap-2">
      <span className="text-gray-700 font-medium">Your Rating</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <motion.button
            key={rating}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setCurrentRating(rating)}
            onMouseEnter={() => setHoveringStars(rating)}
            onMouseLeave={() => setHoveringStars(0)}
            className="p-1 rounded-full transition-all focus:outline-none"
            aria-label={`${rating} star${rating !== 1 ? 's' : ''}`}
          >
            <Star 
              className={`w-7 h-7 ${
                rating <= (hoveringStars || currentRating) 
                  ? "text-yellow-400 fill-yellow-400" 
                  : "text-gray-300"
              } transition-colors duration-150`} 
            />
          </motion.button>
        ))}
      </div>
      <span className="text-sm text-gray-500 mt-1">
        {hoveringStars > 0 ? getRatingLabel(hoveringStars) : getRatingLabel(currentRating)}
      </span>
    </div>
  )

  // Helper function to get rating labels
  const getRatingLabel = (rating) => {
    const labels = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Great",
      5: "Excellent"
    }
    return labels[rating] || ""
  }

  // Get a quote based on rating to display
  const getQuoteForRating = (rating) => {
    const quotes = {
      1: "Could be better",
      2: "Satisfactory experience",
      3: "Good service overall",
      4: "Really enjoyed working with them",
      5: "Outstanding experience!"
    }
    return quotes[rating] || quotes[5]
  }

  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  // Text animation variants for staggered entrance
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  }

  // Container for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 via-white to-blue-50 py-16 md:py-20">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading />
        </div>
      ) : (
        <div className="container mx-auto px-3">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-5"
          >
           
            <motion.h2
              variants={textVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 mt-[-40px]"
            >
              What Our Clients Say
            </motion.h2>
            
            <motion.p
              variants={textVariants}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              Real stories from businesses that have partnered with us
            </motion.p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={6000}
              transitionTime={500}
              renderArrowPrev={(clickHandler) => <CustomArrow onClick={clickHandler} direction="prev" />}
              renderArrowNext={(clickHandler) => <CustomArrow onClick={clickHandler} direction="next" />}
              onChange={setCurrentSlide}
              className="testimonial-carousel"
              swipeable={true}
              emulateTouch={true}
              selectedItem={currentSlide}
            >
              {testimonials &&
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate={currentSlide === index ? "visible" : "hidden"}
                    className="px-4 py-4 md:py-6"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-xl mx-auto">
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative">
                        <Quote className="absolute -top-3 -left-3 h-12 w-12 text-blue-100" strokeWidth={1} />
                        
                        <div className="flex flex-col items-center space-y-4 md:w-1/3">
                          <div className="relative group">
                            <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-md border-4 border-white">
                              <img
                                src={testimonial.img || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="mt-4 text-center">
                              <h4 className="text-xl font-bold text-gray-800">{testimonial.name}</h4>
                              <p className="text-blue-600 text-sm font-medium">{testimonial.companyName}</p>
                              
                              <div className="flex justify-center gap-0.5 mt-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={`${
                                      i < (testimonial.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="md:w-2/3 flex flex-col justify-center">
                          <motion.blockquote
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-600 text-lg leading-relaxed italic"
                          >
                            <Quote className="inline-block h-5 w-5 text-blue-200 mr-1 -mt-2" strokeWidth={1.5} />
                            {testimonial.description}
                            <Quote className="inline-block h-5 w-5 text-blue-200 ml-1 -mt-2 rotate-180" strokeWidth={1.5} />
                          </motion.blockquote>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </Carousel>

            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleModalOpen}
                className="flex items-center gap-2 px-3 py-3 bg-blue-600 hover:bg-blue-700 
                text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Share your testimonial"
              >
                <MessageSquare size={18} />
                Share Your Experience
              </motion.button>
            </div>

           
          </div>
        </div>
      )}

      <Modal
        title={null}
        open={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={480}
        centered
        className="testimonial-modal"
        closeIcon={<span className="text-gray-500 hover:text-gray-700">×</span>}
      >
        <AnimatePresence mode="wait">
         
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center pt-6 pb-4">
                <MessageSquare className="w-12 h-12 mx-auto text-blue-500 mb-3" />
                <h3 className="text-2xl font-bold text-gray-800">Share Your Experience</h3>
                <p className="text-gray-500 text-sm mt-1">Help others by sharing your feedback</p>
              </div>

              <Form form={form} name="review-form" onFinish={handleSubmit} layout="vertical" className="mt-6">
                <div className="space-y-4">
                  <Form.Item
                    label={<span className="text-gray-700">Your Name</span>}
                    name="name"
                    rules={[{ required: true, message: "Please enter your name" }]}
                  >
                    <Input
                      className="rounded-lg border-gray-200 py-2"
                      placeholder="Enter your full name"
                      prefix={<span className="text-gray-400 mr-2">👤</span>}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-gray-700">Company</span>}
                    name="companyName"
                    rules={[{ required: true, message: "Please enter your company name" }]}
                  >
                    <Input
                      className="rounded-lg border-gray-200 py-2"
                      placeholder="Enter your company name"
                      prefix={<span className="text-gray-400 mr-2">🏢</span>}
                    />
                  </Form.Item>

                  <div className="py-2">
                    <RatingSelector />
                  </div>

                  <Form.Item
                    label={<span className="text-gray-700">Your Experience</span>}
                    name="description"
                    rules={[{ required: true, message: "Please share your experience" }]}
                  >
                    <Input.TextArea
                      rows={3}
                      className="rounded-lg border-gray-200"
                      placeholder={getQuoteForRating(currentRating)}
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="text-gray-700">Your Photo</span>}
                    name="photo"
                    rules={[{ required: false, message: "Please upload your photo" }]}
                  >
                    <div className="space-y-3">
                      {previewImage ? (
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100">
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                          </div>
                          <Upload 
                            beforeUpload={() => false} 
                            onChange={handleUpload} 
                            showUploadList={false}
                          >
                            <Button 
                              type="default"
                              icon={<ImageIcon className="h-4 w-4 mr-1" />}
                              className="flex items-center"
                            >
                              Change
                            </Button>
                          </Upload>
                        </div>
                      ) : (
                        <Upload
                          beforeUpload={() => false}
                          onChange={handleUpload}
                          showUploadList={false}
                          className="w-full"
                        >
                          <motion.div
                            whileHover={{ scale: 1.01, borderColor: "#3b82f6" }}
                            className="p-4 border-2 border-dashed border-gray-200 rounded-lg
                            flex flex-col items-center justify-center gap-2 cursor-pointer
                            hover:border-blue-500 transition-colors"
                          >
                            <div className="p-2 bg-blue-50 rounded-full">
                              <UploadIcon className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="text-sm text-gray-600">Upload your photo</div>
                            <div className="text-xs text-gray-400">(Optional)</div>
                          </motion.div>
                        </Upload>
                      )}
                    </div>
                  </Form.Item>
                </div>

                <div className="flex gap-3 mt-8 pt-4 border-t border-gray-100">
                  <Button
                    onClick={handleModalClose}
                    className="flex-1 py-2 px-4 border border-gray-200 rounded-lg
                    text-gray-600 hover:text-gray-800 hover:border-gray-300 transition-colors"
                    disabled={submitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700
                    text-white rounded-lg transition-colors"
                    loading={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Review"}
                  </Button>
                </div>
              </Form>
            </motion.div>
          )
        </AnimatePresence>
      </Modal>

      <style jsx global>{`
        .testimonial-carousel .carousel.carousel-slider {
          overflow: visible;
        }
        .testimonial-carousel .carousel .control-dots {
          bottom: -40px;
        }
        .testimonial-carousel .carousel .control-dots .dot {
          width: 8px;
          height: 8px;
          background: #cbd5e1;
          box-shadow: none;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .testimonial-carousel .carousel .control-dots .dot.selected {
          background: #3b82f6;
          transform: scale(1.2);
        }
        
        /* Modal Styles */
        .testimonial-modal .ant-modal-content {
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .testimonial-modal .ant-modal-close {
          top: 16px;
          right: 16px;
        }
        .testimonial-modal .ant-modal-close-x {
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 28px;
          width: 28px;
        }
        .testimonial-modal .ant-form-item-label > label {
          font-weight: 500;
        }
        .testimonial-modal .ant-form-item-explain-error {
          font-size: 0.75rem;
          margin-top: 0.25rem;
          color: #ef4444;
        }
        .testimonial-modal .ant-input:hover, 
        .testimonial-modal .ant-input:focus,
        .testimonial-modal .ant-input-affix-wrapper:hover,
        .testimonial-modal .ant-input-affix-wrapper:focus {
          border-color: #3b82f6;
        }
        .testimonial-modal .ant-input-affix-wrapper:focus,
        .testimonial-modal .ant-input-affix-wrapper-focused {
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  )
}

export default TestimonialCarousel