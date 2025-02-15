import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid, Container } from "@mui/material";
import wheatImg from "../../../assets/auth/nilotpal-kalita-pJHaHQJ0PPk-unsplash.jpg"; // Importing images
import riceImg from "../../../assets/auth/jakob-rosen-0302c9LYXcE-unsplash.jpg";
import cornImg from "../../../assets/auth/markus-spiske-iOL-0GJY-DM-unsplash.jpg";

const products = [
  {
    id: 1,
    name: "Wheat",
    pricePerKg: "100rs/kg",
    unitPrice: "1000rs",
    quantity: "250kg",
    image: wheatImg,
  },
  {
    id: 2,
    name: "Rice",
    pricePerKg: "80rs/kg",
    unitPrice: "800rs",
    quantity: "300kg",
    image: riceImg,
  },
  {
    id: 3,
    name: "Corn",
    pricePerKg: "60rs/kg",
    unitPrice: "600rs",
    quantity: "200kg",
    image: cornImg,
  },
];

const KrishiMart = () => {
  return (
    <Container sx={{ textAlign: "center", padding: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: "bold" }}>
        KrishiMart - Fresh Farm Produce
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Card sx={{ maxWidth: 300, margin: "auto", boxShadow: 3, borderRadius: 2 }}>
              <CardMedia component="img" height="160" image={product.image} alt={product.name} />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Price per Kg:</strong> {product.pricePerKg}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Unit Price:</strong> {product.unitPrice}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Quantity Available:</strong> {product.quantity}
                </Typography>
                <Button variant="contained" color="success" fullWidth sx={{ marginTop: 1 }}>
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
