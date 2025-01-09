import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faUsers, faBuilding, faStore, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Box, Grid, Typography, Paper, Container, Link } from '@mui/material';
import { styled } from '@mui/system';
import watermark from '../img/image.png'; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const data = [
  { icon: faGlobe, title: 'Nature of Business', description: 'Manufacturers, Wholesaler, Trader' },
  { icon: faUsers, title: 'Number of Employees', description: '12' },
  { icon: faBuilding, title: 'Year of Establishment', description: '1989' },
  { icon: faStore, title: 'Market Covered', description: 'India' },
];

const StyledPaper = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  padding: theme.spacing ? theme.spacing(2) : '16px', // Fallback to '16px' if theme.spacing is undefined
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows ? theme.shadows[5] : '0px 5px 15px rgba(0,0,0,0.3)', // Fallback shadow if theme.shadows is undefined
  },
  height: '100%', // Ensure the height is consistent
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px 8px 0px',
  backgroundColor: theme.palette.primary,
  color: theme.palette.primary,
  borderRadius: theme.shape.borderRadius,
  textDecoration: 'none',
  marginTop: theme.spacing(2),
  transition: 'background-color 0.3s, transform 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.primary,
    transform: 'translateX(5px)',
  },
  '& .icon': {
    marginLeft: theme.spacing(1),
  },
}));

const Info = () => {
  const navigate = useNavigate();
  return (
    <Box position="relative" bgcolor="#eef9ff" py={6} overflow="hidden">
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100%" // Cover the entire container
        height="100%" // Cover the entire container
        sx={{
          backgroundImage: `url(${watermark})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          opacity: 0.2,
          pointerEvents: 'none',
          zIndex: -1, // Ensure the watermark stays behind the content
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="video"
              src="https://firebasestorage.googleapis.com/v0/b/shasvat-f94dd.appspot.com/o/videos%2Fshasvat-video-homepage.mp4?alt=media&token=2c654d01-8aaa-4856-b9cd-007d474d47e7"
              alt="Company"
              autoPlay
              loop
              muted
              width="100%"
              borderRadius={2}
              boxShadow={3}
            />
            <StyledLink onClick={() => navigate("/products")} className="md:block hidden">
              View All Products
              <FontAwesomeIcon icon={faArrowRight} className="icon" />
            </StyledLink>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" component="h2" fontWeight="bold" color="text.primary" gutterBottom>
              Welcome to <span className="text-blue-600"> Shashvat </span>
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Located in Jamnagar (Gujarat), Shashvat Brass Industries is one of the top manufacturers and suppliers of brass products in India.
              The company started its operation in the year 1998 and now, it is working on a large scale supplying its products to every corner of the nation.
              We are in this industry for more than 2 decades and have mastered every single aspect of our business. We are capable of understanding
              the exact requirements of our customers and fulfilling them in the best way possible. At Shashvat Brass Industries, we offer world-class brass products.
            </Typography>
            <Typography variant="h4" component="h3" fontWeight="bold" gutterBottom>
              <span className="text-blue-600"> Glimpse </span> of Our Company
            </Typography>
            <Grid container spacing={2}>
              {data.map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <StyledPaper>
                    <Box
                      width={48}
                      height={48}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      borderRadius="50%"
                      bgcolor="background.paper"
                      boxShadow={2}
                      mr={2}
                    >
                      <FontAwesomeIcon icon={item.icon} className="text-2xl text-gray-700" />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight="medium" color="text.primary">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </StyledPaper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Info;
