import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Container,
  CardMedia,
  Divider,
  IconButton,
} from "@mui/material";

import { userAtom } from "../Atoms/userAtom";
import { productAtom } from "../Atoms/productsAtom";
import { ArrowForward } from "@mui/icons-material";

const ProductType = ({ type, products }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        style={{ marginBottom: "1em", fontWeight: "bold" }}
      >
        {type}
      </Typography>
      <Grid container spacing={3}>
        {products &&
          products.length > 0 &&
          products
            .filter((product) => product.category === type)
            .map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                 <div
      className="hover:ring-[3px] transition-all rounded-[18px]"
      style={{
        padding: "10px",
      }}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    >
      <Card
        
        onClick={(e) => {
          e.preventDefault();
          navigate(`/productdetail/${product.id}`);
        }}
        style={{
          cursor: 'pointer',
          position: "relative",
          overflow: "hidden",
          border: "2px solid golden",
          borderRadius: '10px'
        }}
      >
        
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={product.imageUrl}
            alt={product.name}
            className="w-full h-60 object-cover"
          />
          <Divider />
          <CardContent>
            <Box display="flex" alignItems="center" pl='10px' justifyContent="space-between">
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="text-lg font-semibold"
              >
                {product.name}
              </Typography>
              {hoveredIndex === index && (
                <IconButton
                  sx={{
                    bgcolor: '#264795',
                    color: 'white',
                    opacity: hoveredIndex === index ? 1 : 0,
                  }}
                  className="transition-all"
                >
                  <ArrowForward />
                </IconButton>
              )}
            </Box>
          </CardContent>
        </CardActionArea>
        {hoveredIndex === index && (
          <Box
            className="absolute inset-0 border-golden"
            style={{
              top: "-4px",
              left: "-4px",
              right: "-4px",
              bottom: "-4px",
            }}
          ></Box>
        )}
        <Box className="absolute inset-0 overflow-hidden">
          <Box className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Typography
              variant="h6"
              className="text-white font-semibold"
            >
              View Product
            </Typography>
          </Box>
        </Box>
      </Card>
    </div>
              </Grid>
            ))}
      </Grid>
    </Box>
  );
};

const ProductsPage = () => {
  const products = useRecoilValue(productAtom);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <Container className="container mx-auto p-4">
      <Box my="20px">
        <ProductType type={"Sanitary part"} products={products} />
      </Box>
      <Divider />
      <Box my="20px">
        <ProductType type={"HardWare Parts"} products={products} />
      </Box>
      <Divider />
      <Box my="20px">
        <ProductType type={"Components Parts"} products={products} />
      </Box>
    </Container>
  );
};

export default ProductsPage;
