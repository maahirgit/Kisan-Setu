import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KrishiMart = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/product/getProduct");
        console.log(response.data);  
        setProducts(response.data.data || []);  
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    console.log("Navigating to product detail page with ID:", productId);  // Log the product ID
    navigate(`/KrishiMart/KrishiDetail/${productId}`);
  };

  return (
    <Container sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        KrishiMart - Fresh Farm Produce
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 300, margin: "auto", boxShadow: 3, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="160"
                image={product.Image_url}
                alt={product.Product_name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.Product_name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price per Kg:</strong> {product.Price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Quantity Available:</strong> {product.Quantity} 
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  onClick={() => handleProductClick(product._id)}  // Call the function with product ID
                >
                  Click to Know More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default KrishiMart;
