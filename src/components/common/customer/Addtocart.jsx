import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AppleImage from  "../../../assets/auth/Home sreen image banner.jpg";
import BananaImage from "../../../assets/auth/Home sreen image banner.jpg";
import OrangeImage from  "../../../assets/auth/Home sreen image banner.jpg";

const ShoppingCart = () => {
  const [cart, setCart] = useState([
    { id: 1, name: "Apple", quantity: 2, price: 50, image: AppleImage },
    { id: 2, name: "Banana", quantity: 3, price: 30, image: BananaImage },
    { id: 3, name: "Orange", quantity: 1, price: 40, image: OrangeImage }
  ]);

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const totalAmount = cart.reduce((total, item) => total + item.quantity * item.price, 0);

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
            <Card key={item.id} sx={{ marginBottom: 2, display: "flex", alignItems: "center", padding: 2, boxShadow: 2 }}>
              <img src={item.image} alt={item.name} style={{ width: 80, height: 80, marginRight: 16, borderRadius: 8 }} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                <Typography variant="body2">Quantity: {item.quantity}</Typography>
                <Typography variant="body2" color="primary">Price: ₹{item.price * item.quantity}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="error" onClick={() => removeItem(item.id)}>
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
          <Typography key={item.id} variant="body1" gutterBottom>
            {item.name} x {item.quantity} - ₹{item.price * item.quantity}
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
            borderRadius: 2 
          }}
          fullWidth
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ShoppingCart;