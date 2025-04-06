import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const KrishiDetail = () => {
  const [product, setProduct] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/product/getProductById/${id}`);
        console.log("Fetched Product Data:", response.data);
        setProduct(response.data.data);
        console.log("Product ID Type:", typeof id);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleAddToCart = async () => {
    let userId;
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.userId;
        console.log("Decoded User ID:", userId);
      } catch (error) {
        console.error("Error decoding token:", error);
        alert("Invalid token or user not logged in.");
        return;
      }
    } else {
      console.warn("Token not found. User ID cannot be extracted.");
      alert("Please login to add to cart.");
      return;
    }

    const cartData = {
      Product_id: id,
      User_id: userId,
      Quantity: parseInt(orderQuantity),
    };

    console.log("Cart Data Being Sent:", cartData);

    try {
      const response = await axios.post("/cart/createCart", cartData);
      console.log("Product Added to Cart:", response.data);
      alert("Product added to cart!");
      navigate("/AddToCart");
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Failed to add to cart. Please try again.");
    }
  };

  return (
    <Box display="flex" sx={{ height: "100vh", margin: "0 50px" }}>
      <Box sx={{ width: "10%", display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography variant="h6" color="green">Product Images</Typography>
        <Box>
          <Box
            component="img"
            src={product.Image_url}
            alt={product.Product_name}
            sx={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: 4, cursor: "pointer", border: "2px solid green" }}
          />
        </Box>
      </Box>

      <Box sx={{ width: "5%" }}></Box>

      <Box sx={{ width: "40%", display: "flex", justifyContent: "center", alignItems: "center", border: "2px solid green", borderRadius: 4, padding: 2 }}>
        <Box
          component="img"
          src={product.Image_url}
          alt="Selected Product"
          sx={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: 4 }}
        />
      </Box>

      <Box sx={{ width: "5%" }}></Box>

      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: 3,
          backgroundColor: "white",
          borderRadius: 4,
          border: "2px solid green"
        }}
      >
        <Typography variant="h5" color="green">Product Details</Typography>
        <Typography variant="body1"><strong>Name:</strong> {product.Product_name}</Typography>
        <Typography variant="body1"><strong>Price:</strong> ₹{product.Price}</Typography>
        <Typography variant="body1"><strong>Description:</strong> {product.Description}</Typography>

        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            type="number"
            label="Order Quantity"
            variant="outlined"
            size="small"
            value={orderQuantity}
            onChange={(e) => setOrderQuantity(e.target.value)}
            inputProps={{ min: 1, max: product.Quantity }}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white" }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        </Box>

      </Box>
    </Box>
  );
};

export default KrishiDetail;