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
import { ChevronLeft, ChevronRight, Star, Quote, UploadIcon, CheckCircle, ImageIcon } from "lucide-react"
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
        direction === "prev" ? "-left-4 md:left-4" : "-right-4 md:right-4"
      } bg-white/90 backdrop-blur-sm w-14 h-14 rounded-full shadow-lg transition-all duration-300 
            hover:shadow-xl border border-gray-100/50 group`}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-6 w-6 mx-auto text-gray-600 group-hover:text-blue-600 transition-colors" />
      ) : (
        <ChevronRight className="h-6 w-6 mx-auto text-gray-600 group-hover:text-blue-600 transition-colors" />
      )}
    </motion.button>
  )

  const RatingSelector = () => (
    <div className="flex flex-col items-center gap-2">
      <span className="text-gray-700 font-medium">Your Rating</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <motion.button
            key={rating}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setCurrentRating(rating)}
            className={`p-2 rounded-full transition-all ${
              rating <= currentRating ? "text-yellow-400 hover:text-yellow-500" : "text-gray-300 hover:text-gray-400"
            }`}
          >
            <Star className="w-8 h-8 fill-current" />
          </motion.button>
        ))}
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 py-24">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <Loading />
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-blue-600 font-semibold text-sm uppercase tracking-wider mb-4 inline-block"
            >
              Testimonials
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Discover why businesses trust us through their authentic experiences and success stories
            </motion.p>
          </div>

          <div className="max-w-7xl mx-auto">
            <Carousel
              showThumbs={false}
              showStatus={false}
              infiniteLoop
              autoPlay
              interval={6000}
              transitionTime={700}
              renderArrowPrev={(clickHandler) => <CustomArrow onClick={clickHandler} direction="prev" />}
              renderArrowNext={(clickHandler) => <CustomArrow onClick={clickHandler} direction="next" />}
              onChange={setCurrentSlide}
              className="testimonial-carousel"
            >
              {testimonials &&
                testimonials.map((testimonial, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{
                      opacity: currentSlide === index ? 1 : 0,
                      scale: currentSlide === index ? 1 : 0.95,
                    }}
                    transition={{ duration: 0.5 }}
                    className="px-4 py-8"
                  >
                    <div className="bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-xl p-8 md:p-12 transition-all duration-500 hover:shadow-2xl mx-auto max-w-4xl">
                      <div className="relative">
                        <Quote className="absolute -top-4 -left-4 h-16 w-16 text-blue-500/10" />
                        <div className="grid md:grid-cols-[auto,1fr] gap-8 md:gap-12 items-center">
                          <div className="flex flex-col items-center space-y-4">
                            <motion.div
                              whileHover={{ scale: 1.05, rotate: 3 }}
                              className="relative group cursor-pointer"
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-[2rem] rotate-6 transform transition-transform group-hover:rotate-12 opacity-10"></div>
                              <div className="relative w-48 h-48 rounded-[2rem] overflow-hidden border-8 border-white shadow-lg">
                                <img
                                  src={testimonial.photoUrl || "/placeholder.svg"}
                                  alt={testimonial.name}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                              </div>
                            </motion.div>
                            <div className="text-center">
                              <h4 className="text-xl font-bold text-gray-800 mb-1">{testimonial.name}</h4>
                              <p className="text-blue-600 font-medium">{testimonial.companyName}</p>
                              <div className="flex justify-center gap-1 mt-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-5 w-5 ${
                                      i < (testimonial.rating || 5) ? "text-yellow-400 fill-current" : "text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="relative">
                            <Quote className="absolute -top-4 left-0 h-8 w-8 text-blue-500/20 rotate-180" />
                            <motion.blockquote
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                              className="text-gray-600 text-lg md:text-xl leading-relaxed italic pl-6 md:pl-8"
                            >
                              {testimonial.description}
                            </motion.blockquote>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </Carousel>

            <div className="text-center mt-16">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleModalOpen}
                className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white 
                                bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-lg 
                                hover:shadow-xl transition-all duration-300
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="relative">
                  Share Your Story
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/40 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <Modal
        title={
          <AnimatePresence mode="wait">
            {showSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center pt-6 pb-4"
              >
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-2xl font-bold text-green-600">Thank You!</h3>
                <p className="text-gray-500 text-sm mt-2">Your review has been submitted successfully</p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center pt-6 pb-4"
              >
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Share Your Experience
                </h3>
                <p className="text-gray-500 text-sm mt-2">Your feedback helps us grow and improve</p>
              </motion.div>
            )}
          </AnimatePresence>
        }
        visible={modalVisible}
        onCancel={handleModalClose}
        footer={null}
        className="max-w-lg"
        centered
      >
        <Form form={form} name="review-form" onFinish={handleSubmit} layout="vertical" className="space-y-6 pt-4">
          <Form.Item
            label={<span className="text-gray-700 font-medium">Your Name</span>}
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2.5"
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Company</span>}
            name="companyName"
            rules={[{ required: true, message: "Please input your company name!" }]}
          >
            <Input
              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 py-2.5"
              placeholder="Enter your company name"
            />
          </Form.Item>

          <RatingSelector />

          <Form.Item
            label={<span className="text-gray-700 font-medium">Your Experience</span>}
            name="description"
            rules={[{ required: true, message: "Please share your experience!" }]}
          >
            <Input.TextArea
              rows={4}
              className="rounded-xl border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Tell us about your experience..."
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-gray-700 font-medium">Profile Photo</span>}
            name="photo"
            rules={[{ required: true, message: "Please upload your photo!" }]}
          >
            <div className="space-y-4">
              <Upload beforeUpload={() => false} onChange={handleUpload} showUploadList={false} className="w-full">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 px-6 border-2 border-dashed border-gray-200 rounded-xl
                                    text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200
                                    flex items-center justify-center gap-2 group"
                >
                  {previewImage ? (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      Change Photo
                    </>
                  ) : (
                    <>
                      <UploadIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                      Upload Your Photo
                    </>
                  )}
                </motion.button>
              </Upload>

              {previewImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg"
                >
                  <img src={previewImage || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
                </motion.div>
              )}
            </div>
          </Form.Item>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              onClick={handleModalClose}
              className="px-6 py-2 rounded-xl border border-gray-200 hover:border-gray-300 
                            text-gray-600 hover:text-gray-800 transition-colors"
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 
                            text-white rounded-xl hover:opacity-90 transition-opacity"
              loading={submitting}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </Form>
      </Modal>

      <style jsx global>{`
                .testimonial-carousel .carousel.carousel-slider {
                    overflow: visible;
                }
                .testimonial-carousel .carousel .control-dots {
                    bottom: -50px;
                }
                .testimonial-carousel .carousel .control-dots .dot {
                    width: 12px;
                    height: 12px;
                    background: #e2e8f0;
                    box-shadow: none;
                    opacity: 1;
                    transition: all 0.3s ease;
                }
                .testimonial-carousel .carousel .control-dots .dot.selected {
                    background: #2563eb;
                    transform: scale(1.2);
                }
                
                /* Enhanced Modal Styles */
                .ant-modal-content {
                    border-radius: 24px;
                    overflow: hidden;
                }
                .ant-modal-header {
                    border-bottom: none;
                }
                .ant-modal-footer {
                    border-top: none;
                }
                .ant-form-item-label > label {
                    font-weight: 500;
                }
                .ant-input-textarea {
                    transition: all 0.3s ease;
                }
                .ant-input-textarea:hover {
                    border-color: #3b82f6;
                }
                .ant-form-item-explain-error {
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                    color: #ef4444;
                }
            `}</style>
    </div>
  )
}

export default TestimonialCarousel

