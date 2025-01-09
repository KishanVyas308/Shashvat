import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';

const ImageContainer = styled(Paper)({
  maxHeight: '63vh',
  minHeight: '50vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'relative',
});

const Overlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  textAlign: 'center',
  padding: '20px',
});
const images = [
  "",
  "",
  "",
];
const slides = [
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.25_a9fdebb9.jpg?alt=media&token=3788136b-5328-41a1-bcf2-06db7f49d833',
    title: 'Components Parts',
    description: 'Our component parts category encompasses a wide range of brass parts used in diverse industries such as automotive, electronics, and machinery. ',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp%20Image%202024-06-03%20at%2014.56.26_92957453.jpg?alt=media&token=fa0ee2f1-2e96-49c8-ad18-43c7cdf1ebfa',
    title: 'sanitary Parts',
    description: 'Our sanitary brass parts are designed with precision and quality to ensure optimal performance and durability in plumbing and sanitary applications.',
  },
  {
    image: 'https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/WhatsApp_Image_2024-06-22_at_00.04.04_365b4e8b-transformed.jpeg?alt=media&token=f0f4273c-4b1d-468f-a99f-0b36583007c0',
    title: 'hardware parts',
    description: 'Our brass hardware parts are crafted to meet the highest standards of strength and reliability, making them ideal for various industrial and construction applications. ',
  },
];
const HeroSlider = ( ) => {
  const [time, setTime] = useState(300);
const navigate = useNavigate()
  useEffect(() => {
    setTimeout(() => {
      setTime(3500);
    }, 300);
  }, []);

  return (
    <div className="relative w-full" style={{ maxHeight: '70vh', minHeight: '50vh' }}>
      <Carousel
        indicators={true}
        navButtonsAlwaysVisible={false}
        autoPlay={true}
        interval={time}
        stopAutoPlayOnHover={false}
        animation="fade"
        duration={700}
        navButtonsProps={{
          style: {
            borderRadius: '50%',
            color: 'white',
          },
        }}
        indicatorContainerProps={{
          style: {
            marginTop: '10px',
            textAlign: 'center',
          },
        }}
        indicatorIconButtonProps={{
          style: {
            padding: '10px',
            color: 'gray',
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: 'blue',
          },
        }}
      >
        {slides.map((slide, index) => (
          <ImageContainer key={index}>
            <Overlay>
              <Typography variant="h3" component="h1" gutterBottom>
                {slide.title}
              </Typography>
              <Typography variant="body1" component="p" gutterBottom>
                {slide.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    navigate("/products")
                }}
                endIcon={<ArrowForwardIcon />}
                style={{ backgroundColor: 'blue', marginTop: '20px'}}
              >
                View
              </Button>
            </Overlay>
            <img
              src={slide.image}
              alt={`Slide ${index}`}
              style={{ height: '100%', minHeight: '50vh', objectFit: 'cover' }}
            />
          </ImageContainer>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSlider;
