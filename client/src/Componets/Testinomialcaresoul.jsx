import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'tailwindcss/tailwind.css';
import { Modal, Button, Form, Input, Upload, Rate } from 'antd';
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

    useEffect(() => {
        async function fetchReviews() {
            if (!testimonials) {
                try {
                    const reviews = await getAllReviews();
                    setTestimonials(reviews);
                } catch (error) {
                    console.error('Error fetching reviews:', error);
                }
            }
        }
        fetchReviews();
    }, [testimonials, setTestimonials]);

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
            setModalVisible(false);
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    const handleUpload = ({ file }) => {
        setFile(file);
    };

    return (
        <div className="container mx-auto py-10 ">
            <div className="flex justify-center">
                <div className="w-full ">
                    <div className="bg-white shadow-lg rounded-lg p-8 text-center relative">
                        <h5 className="font-bold mb-6 text-3xl">
                            What our <span className='text-blue-600'>clients</span> are saying <span className='text-blue-600'>about us</span>.
                        </h5>
                        <Carousel
                            showThumbs={false}
                            showStatus={false}
                            infiniteLoop
                            autoPlay
                            interval={5000}
                            transitionTime={600}
                            renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
                                hasPrev && (
                                    <button
                                        type="button"
                                        onClick={clickHandler}
                                        title={labelPrev}
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-100 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none shadow-lg"
                                        style={{ zIndex: 2, marginLeft: '10px' }}
                                    >
                                        &larr;
                                    </button>
                                )
                            }
                            renderArrowNext={(clickHandler, hasNext, labelNext) =>
                                hasNext && (
                                    <button
                                        type="button"
                                        onClick={clickHandler}
                                        title={labelNext}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-opacity-50 hover:bg-opacity-100 bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center focus:outline-none shadow-lg"
                                        style={{ zIndex: 2, marginRight: '10px' }}
                                    >
                                        &rarr;
                                    </button>
                                )
                            }
                            className="testimonial-carousel"
                        >
                            {testimonials && testimonials.map((testimonial, index) => (
                                <div key={index} className="relative text-gray-800 bg-[#eef9ff] rounded-lg p-8 flex flex-col md:flex-row items-center shadow-md hover:shadow-xl transition-shadow duration-300 mx-4" style={{ height: '400px' }}>
                                    <div className="flex-shrink-0 bg-blue-200 text-black p-4 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 flex flex-col items-center md:items-start">
                                        <img src={testimonial.photoUrl} alt={testimonial.name} className="w-24 h-24  mb-4" />
                                        <h6 className="mt-4 font-semibold">{testimonial.name}</h6>
                                        <small className="block mt-1 text-gray-800">{testimonial.companyName}</small>
                                    </div>
                                    <div className="mt-6 md:mt-0 md:ml-12 text-center md:text-left">
                                        <p className="text-xl font-light leading-relaxed">"{testimonial.description}"</p>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                        <Button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline transition-colors duration-300"
                            onClick={handleModalOpen}
                            style={{  marginTop: '3em' }}
                        >
                            Give Review
                        </Button>
                    </div>
                </div>
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
    const [loading, setLoading] = useState(false);

    const handleOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            await onSubmit(values);
            form.resetFields();
            setLoading(false);
        } catch (errorInfo) {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Submit Review"
            visible={visible}
            onCancel={onCancel}
            destroyOnClose
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Submit
                </Button>,
            ]}
        >
            <Form form={form} name="review-form">
                {loading && <Loading />}
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[{ required: true, message: 'Please input your company name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input your description!' }]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    label="Photo"
                    name="photo"
                    rules={[{ required: true, message: 'Please upload your photo!' }]}
                >
                    <Upload beforeUpload={() => false} onChange={onUpload}>
                        <Button>Upload</Button>
                    </Upload>
                </Form.Item>
               
            </Form>
        </Modal>
    );
};

export default TestimonialCarousel;
