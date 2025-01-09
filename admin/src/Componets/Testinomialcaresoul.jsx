import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'tailwindcss/tailwind.css';
import { Modal, Button, Form, Input, Upload } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userAtom } from '../Atoms/userAtom';
import { storeReview, getAllReviews } from '../backend/manageRewiew';
import { allReviewsAtom } from '../Atoms/allReviewsAtom';
import Loading from './Loading';

const TestimonialCarousel = () => {
    const [testimonials, setTestimonials] = useRecoilState(allReviewsAtom);
    const user = useRecoilValue(userAtom);
    const [modalVisible, setModalVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isReviewAdded, setIsReviewAdded] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            setLoading(true);
            try {
                const reviews = await getAllReviews();
                setTestimonials(reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchReviews();
    }, [setTestimonials]);

    const handleModalOpen = () => {
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    const handleSubmit = async (values) => {
        try {
            await storeReview(values, file);
            const updatedReviews = await getAllReviews();
            setTestimonials(updatedReviews);
            setIsReviewAdded(true); // Trigger the animation
            setModalVisible(false);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleUpload = ({ file }) => {
        setFile(file);
    };

    return (
        <div className="container mx-auto py-16 px-4">
            {loading ? (
                <Loading />
            ) : (
                <div className="text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">
                        What our <span className="text-blue-500">clients</span> are saying
                    </h2>
                    <div className="bg-gray-100 shadow-lg rounded-lg p-8">
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop
                            autoPlay
                            interval={5000}
                            transitionTime={600}
                            className="testimonial-carousel"
                        >
                            {testimonials &&
                                testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="bg-white shadow-md rounded-lg p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start transition-transform transform hover:scale-105 duration-300"
                                    >
                                        <div className="w-32 h-32 flex-shrink-0 mb-4 md:mb-0">
                                            <img
                                                src={testimonial.photoUrl}
                                                alt={testimonial.name}
                                                className="rounded-full w-full h-full object-cover border-4 border-blue-500"
                                            />
                                        </div>
                                        <div className="md:ml-8 text-center md:text-left">
                                            <h4 className="text-xl font-semibold text-blue-500 mb-2">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {testimonial.companyName}
                                            </p>
                                            <p className="text-gray-700">{testimonial.description}</p>
                                        </div>
                                    </div>
                                ))}
                        </Carousel>
                        <Button
                            className="mt-8 py-3 px-6 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:opacity-90"
                            type="primary"
                            onClick={handleModalOpen}
                        >
                            Give Review
                        </Button>
                    </div>
                </div>
            )}
            {isReviewAdded && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg animate__animated animate__fadeInUp">
                    Review Added Successfully!
                </div>
            )}
            <ReviewModal
                visible={modalVisible}
                onCancel={handleModalClose}
                onSubmit={handleSubmit}
                onUpload={handleUpload}
            />
        </div>
    );
};

const ReviewModal = ({ visible, onCancel, onSubmit, onUpload }) => {
    const [form] = Form.useForm();

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            form.resetFields();
        } catch (errorInfo) {
            console.error('Failed:', errorInfo);
        }
    };

    return (
        <Modal
            title="Submit Review"
            visible={visible}
            onOk={handleOk}
            onCancel={onCancel}
            footer={null}
            className="rounded-lg"
        >
            <Form form={form} name="review-form">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input className="p-3 border rounded-md w-full focus:outline-none" />
                </Form.Item>
                <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[{ required: true, message: 'Please input your company name!' }]}
                >
                    <Input className="p-3 border rounded-md w-full focus:outline-none" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <Input.TextArea className="p-3 border rounded-md w-full focus:outline-none" />
                </Form.Item>
                <Form.Item
                    label="Photo"
                    name="photo"
                    rules={[{ required: true, message: 'Please upload your photo!' }]}
                >
                    <Upload beforeUpload={() => false} onChange={onUpload}>
                        <Button className="bg-gradient-to-r from-green-400 to-teal-500 text-white">
                            Upload Photo
                        </Button>
                    </Upload>
                </Form.Item>
                <Form.Item className="text-center">
                    <Button
                        type="primary"
                        className="w-full py-3 rounded-md bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md hover:opacity-90"
                        onClick={handleOk}
                    >
                        Submit Feedback
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default TestimonialCarousel;
