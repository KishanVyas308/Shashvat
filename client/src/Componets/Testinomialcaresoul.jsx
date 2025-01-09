import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ChevronLeft, ChevronRight, Camera, X, Loader2 } from 'lucide-react';
import { userAtom } from '../Atoms/userAtom';
import { allReviewsAtom } from '../Atoms/allReviewsAtom';
import { storeReview, getAllReviews } from '../backend/manageRewiew';

const TestimonialCarousel = () => {
  const [testimonials, setTestimonials] = useRecoilState(allReviewsAtom);
  const user = useRecoilValue(userAtom);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    description: '',
    photo: null
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const reviews = await getAllReviews();
      setTestimonials(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      handleNext();
    }
    if (touchStart - touchEnd < -75) {
      handlePrev();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        photo: file
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await storeReview(formData);
      await fetchTestimonials();
      setIsModalOpen(false);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setFormData({
        name: '',
        companyName: '',
        description: '',
        photo: null
      });
      setPreviewUrl('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !testimonials.length) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        What Our <span className="text-blue-500">Clients</span> Say
      </h2>

      <div 
        className="relative overflow-hidden bg-white rounded-2xl shadow-xl"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="p-8">
          {testimonials.length > 0 && (
            <div className="flex flex-col md:flex-row items-center gap-8 transition-opacity duration-300">
              <div className="w-32 h-32 flex-shrink-0">
                <img
                  src={testimonials[currentIndex].photoUrl}
                  alt={testimonials[currentIndex].name}
                  className="w-full h-full object-cover rounded-full border-4 border-blue-500 shadow-lg"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-gray-600 italic text-lg mb-4">"{testimonials[currentIndex].description}"</p>
                <h4 className="text-xl font-semibold text-blue-500">{testimonials[currentIndex].name}</h4>
                <p className="text-gray-500">{testimonials[currentIndex].companyName}</p>
              </div>
            </div>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-blue-500" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-blue-500" />
            </button>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105"
        >
          Share Your Experience
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">Share Your Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Experience
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Photo
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                    <Camera className="w-5 h-5" />
                    <span>Choose Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                      required
                    />
                  </label>
                  {previewUrl && (
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Review'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          Review submitted successfully!
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;