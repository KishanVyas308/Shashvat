import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Modal, Button, Form, Input, Upload, Rate } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../Atoms/userAtom";
import { storeReview, getAllReviews } from "../backend/manageRewiew";

import { allReviewsAtom } from "../Atoms/allReviewsAtom";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useRecoilState(allReviewsAtom);
  const user = useRecoilValue(userAtom);
  const [modalVisible, setModalVisible] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      if (!testimonials) {
        try {
          const reviews = await getAllReviews();
          setTestimonials(reviews);
        } catch (error) {
          console.error("Error fetching reviews:", error);
        }
      }
    }
    fetchReviews();
  }, [testimonials, setTestimonials]);

  const renderCustomArrowPrev = (clickHandler, hasPrev) =>
    hasPrev && (
      <button className="arrow-button prev left-0" onClick={clickHandler}>
        <FaArrowLeft />
      </button>
    );

  const renderCustomArrowNext = (clickHandler, hasNext) =>
    hasNext && (
      <button className="arrow-button next right-0" onClick={clickHandler}>
        <FaArrowRight />
      </button>
    );

  const handleModalOpen = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleSubmit = async (values) => {
    try {
      await storeReview(values, file); // Assuming storeReview handles API call
      const updatedReviews = await getAllReviews(); // Refresh reviews from backend
      setTestimonials(updatedReviews);
      setModalVisible(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const handleUpload = ({ file }) => {
    setFile(file);
  };

  return (
    <div className="container mx-auto bg-white p-5 md:p-10 rounded-lg shadow-lg mt-5 mb-5">
      <h1 className="text-primary text-2xl font-bold text-center mb-5">
        Our Customers
      </h1>
      <Carousel
        showArrows={true}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={4000}
        showStatus={false}
        renderArrowPrev={renderCustomArrowPrev}
        renderArrowNext={renderCustomArrowNext}
      >
        {testimonials &&
          testimonials.map((testimonial, index) => (
            <div key={index} className="p-5">
              <div className="card bg-gray-100 p-5 rounded-lg shadow-md flex flex-col">
                
                <div className="mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`fas ${
                        i < Math.floor(testimonial.rating)
                          ? "fa-star text-yellow-500"
                          : i < testimonial.rating
                          ? "fa-star-half-alt text-yellow-500"
                          : "fa-star text-gray-300"
                      }`}
                    ></span>
                  ))}
                </div>
                <div className="font-bold pb-2 pt-1 text-lg">
                  {testimonial.title}
                </div>
                <div className="testimonial text-gray-700">
                  {testimonial.description}
                </div>
                <div className="flex flex-row profile pt-4 mt-auto items-center justify-center">
                  <img
                    src={testimonial.photoUrl}
                    alt={testimonial.name}
                    className="rounded-xl h-24 w-24 md:h-32 md:w-32 lg:h-48 lg:w-48"
                    style={{ width: "12em", height: "12em" }}
                  />
                  <div className="flex flex-col pl-4">
                    <div className="font-bold">{testimonial.name}</div>
                    <p className="text-gray-500">
                      from {testimonial.companyName}
                    </p>
                  </div>
                </div>
              </div>
              <br />
            </div>
          ))}
      </Carousel>
      <div className="flex justify-center">
        <Button type="primary" className="z-20" onClick={handleModalOpen}>
          Give Review
        </Button>
      </div>
      <ReviewModal
        visible={modalVisible}
        onCancel={handleModalClose}
        onSubmit={handleSubmit}
        onUpload={handleUpload}
      />
    </div>
  );
};

const { TextArea } = Input;

const ReviewModal = ({ visible, onCancel, onSubmit, onUpload }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSubmit(values);
      form.resetFields();
    } catch (errorInfo) {
      console.error("Failed:", errorInfo);
    }
  };

  return (
    <Modal
      title="Submit Review"
      visible={visible}
      onOk={handleOk}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} name="review-form">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[{ required: true, message: "Please input your company name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input your description!" }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          label="Photo"
          name="photo"
          rules={[{ required: true, message: "Please upload your photo!" }]}
        >
          <Upload beforeUpload={() => false} onChange={onUpload}>
            <Button>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Star Rating"
          name="rating"
          rules={[{ required: true, message: "Please rate the product!" }]}
        >
          <Rate />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Testimonial;
