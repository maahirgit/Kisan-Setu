import { useState } from "react";
import { Card, CardContent, CardActions, Typography, Button, Box, Divider } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import AppleImage from  "../../../assets/auth/Home sreen image banner.jpg";
import BananaImage from "../../../assets/auth/Home sreen image banner.jpg";
import OrangeImage from  "../../../assets/auth/Home sreen image banner.jpg";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Apple", price: 50, weight: "1kg", description: "Fresh and juicy apples, perfect for a healthy snack.", image: AppleImage },
    { id: 2, name: "Banana", price: 30, weight: "1 dozen", description: "Sweet and ripe bananas, great for smoothies and desserts.", image: BananaImage },
    { id: 3, name: "Orange", price: 40, weight: "1kg", description: "Citrusy and refreshing oranges, packed with Vitamin C.", image: OrangeImage }
  ]);

  const removeItem = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <Box display="flex" justifyContent="center" padding={3} bgcolor="#f5f5f5" minHeight="100vh">
      <Box width="60%" padding={3} bgcolor="white" borderRadius={2} boxShadow={3}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="#2E7D32">
          Your Wishlist
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Save your favorite items for later.
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {wishlist.length > 0 ? (
          wishlist.map(item => (
            <Card key={item.id} sx={{ marginBottom: 2, display: "flex", alignItems: "center", padding: 2, boxShadow: 2 }}>
              <img src={item.image} alt={item.name} style={{ width: 80, height: 80, marginRight: 16, borderRadius: 8 }} />
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                <Typography variant="body2" color="primary">Price: ₹{item.price}</Typography>
                <Typography variant="body2">Weight: {item.weight}</Typography>
                <Typography variant="body2" color="textSecondary">{item.description}</Typography>
              </CardContent>
              <CardActions>
                <Button variant="contained" color="error" onClick={() => removeItem(item.id)}>
                  <DeleteIcon />
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography>Your wishlist is empty.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Wishlist;
