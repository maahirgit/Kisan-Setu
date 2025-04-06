import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User not logged in");
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const response = await axios.get(`/cart/getCart/${userId}`);
        setCart(response.data.data);
      } catch (err) {
        setError(err.message || "Failed to fetch cart data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const removeItem = async (productId) => {
    try {
      await axios.delete(`/cart/deleteCartItem/${productId}`);
      setCart(cart.filter(item => item.Product_id._id !== productId));
      alert("Item removed from cart");
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from cart.");
    }
  };

  const totalAmount = cart.reduce((total, item) => total + item.Product_id.Price * item.Quantity, 0);

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not logged in");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;

      for (const item of cart) {
        const orderData = {
          Product_id: item.Product_id._id,
          User_id: userId,
          Quantity: item.Quantity,
          Price_per_peice: item.Product_id.Price,
          Total_price: item.Product_id.Price * item.Quantity,
        };
        console.log("Order Data:", orderData);
        const response = await axios.post("/order/createOrder", orderData);
        console.log("Order placed successfully:", response.data);
      }

      alert("Orders placed successfully!");
      navigate("/orderSuccess");
    } catch (err) {
      console.error("Error placing order:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return <Typography>Loading cart...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box display="flex" justifyContent="space-between" padding={3} bgcolor="#f5f5f5" minHeight="100vh">
      {/* Cart Items */}
      <Box width="60%" padding={2} bgcolor="white" borderRadius={2} boxShadow={3}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="#2E7D32">
          Your Shopping Cart
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Review the items in your cart before proceeding to checkout.
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {cart.length > 0 ? (
          cart.map(item => (
            <Card key={item.Product_id._id} sx={{ marginBottom: 2, display: "flex", alignItems: "center", padding: 2, boxShadow: 2 }}>
              <img src={item.Product_id.Image_url} alt={item.Product_id.Product_name} style={{ width: 80, height: 80, marginRight: 16, borderRadius: 8 }} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">{item.Product_id.Product_name}</Typography>
                <Typography variant="body2">Quantity: {item.Quantity}</Typography>
                <Typography variant="body2" color="primary">Price: ₹{item.Product_id.Price * item.Quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="error" onClick={() => removeItem(item.Product_id._id)}>
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>Your cart is empty.</Typography>
        )}
      </Box>

      {/* Order Summary */}
      <Box
        width="35%"
        padding={3}
        bgcolor="#2E7D32"
        borderRadius={3}
        boxShadow={4}
        textAlign="center"
        color="white"
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Order Summary
        </Typography>
        <Typography variant="body1" gutterBottom>
          A quick overview of your purchase details.
        </Typography>
        <Divider sx={{ marginBottom: 2, bgcolor: "white" }} />
        {cart.map(item => (
          <Typography key={item.Product_id._id} variant="body1" gutterBottom>
            {item.Product_id.Product_name} x {item.Quantity} - ₹{item.Product_id.Price * item.Quantity}
          </Typography>
        ))}
        <Divider sx={{ marginY: 2, bgcolor: "white" }} />
        <Typography variant="h5" fontWeight="bold">
          Total: ₹{totalAmount}
        </Typography>
        <Button
          variant="contained"
          sx={{
            marginTop: 3,
            backgroundColor: "white",
            color: "#2E7D32",
            fontWeight: "bold",
            padding: 1,
            borderRadius: 2,
          }}
          fullWidth
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;