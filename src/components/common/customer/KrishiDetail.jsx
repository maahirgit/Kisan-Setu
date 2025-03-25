import React, { useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, TextField } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
        console.log("Product ID Type:", typeof id); // Debugging: Print type of Product ID
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const handleOrderNow = async () => {
    let userId = localStorage.getItem("userId"); // Retrieve userId from localStorage

    console.log("User ID Type Before:", typeof userId); // Debugging: Print type of User ID
    console.log("User ID Value Before:", userId); // Debugging: Print value of User ID

    // Check if userId is a valid ObjectId format; if not, generate a random valid ObjectId for testing
    if (!/^[a-fA-F0-9]{24}$/.test(userId)) {
      console.warn("Invalid User ID format. Generating a temporary valid ID for testing...");
      userId = "64b3f76a1c9a5b0012345678"; // Example of a valid ObjectId
      localStorage.setItem("userId", userId); // Store the corrected userId in localStorage
    }

    console.log("User ID Type After:", typeof userId); // Debugging: Print type of User ID
    console.log("User ID Value After:", userId); // Debugging: Print value of User ID

    const orderData = {
      Product_id: id,
      User_id: userId,
      Quantity: parseInt(orderQuantity),
      Price_per_peice: product.Price,
      Total_price: parseInt(orderQuantity) * product.Price,
    };

    console.log("Order Data Being Sent:", orderData); // Debugging: Print the entire order data

    try {
      const response = await axios.post("/order/createOrder", orderData);
      console.log("Order Placed Successfully:", response.data);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Failed to place order. Please try again.");
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
            onClick={handleOrderNow}
          >
            Order Now
          </Button>
        </Box>

        <Box display="flex" gap={2} alignItems="center">
          <Button
            variant="contained"
            sx={{ backgroundColor: "green", color: "white" }}
            onClick={() => navigate("/AddToCart")}
          >
            Add to Cart
          </Button>
          <IconButton sx={{ color: "green" }} onClick={() => navigate("/Wishlist")}>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default KrishiDetail;
