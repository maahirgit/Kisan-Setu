import React, { useState } from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useNavigate } from "react-router-dom";

const KrishiDetail = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <Box display="flex" sx={{ height: "100vh", margin: "0 50px" }}>
      {/* Left Panel (Small Product Images) */}
      <Box
        sx={{
          width: "10%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        <Typography variant="h6" color="green">Krishi Setu Product Images</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          <label htmlFor="image-upload">
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
            <Button variant="contained" component="span" sx={{ backgroundColor: "green", color: "white" }}>
              Upload Images
            </Button>
          </label>
          {images.map((image, index) => (
            <Box
              key={index}
              component="img"
              src={image}
              alt={`Product Angle ${index + 1}`}
              sx={{
                width: "100%",
                height: "80px",
                objectFit: "cover",
                borderRadius: 4,
                cursor: "pointer",
                border: "2px solid green",
              }}
              onClick={() => handleImageClick(image)}
            />
          ))}
        </Box>
      </Box>

      {/* Gap between the first and second columns */}
      <Box sx={{ width: "5%" }}></Box>

      {/* Second Column (Main Image of Product) */}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "2px solid green",
          borderRadius: 4,
          padding: 2,
        }}
      >
        {selectedImage ? (
          <Box
            component="img"
            src={selectedImage}
            alt="Selected Product"
            sx={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: 4,
            }}
          />
        ) : (
          <Typography variant="h6" color="green">Select an Image</Typography>
        )}
      </Box>

      {/* Gap between second and third columns */}
      <Box sx={{ width: "5%" }}></Box>

      {/* Third Column (Product Details) */}
      <Box
        sx={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          padding: "20px",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: 4,
          border: "2px solid green",
          padding: 3,
        }}
      >
        <Typography variant="h5" color="green">Krishi Setu Product Details</Typography>
        <Typography variant="body1">
          <strong>Name:</strong> Organic Fertilizer
        </Typography>
        <Typography variant="body1">
          <strong>Price:</strong> ₹999
        </Typography>
        <Typography variant="body1">
          <strong>Description:</strong> Premium quality organic fertilizer to enhance crop yield and soil health.
        </Typography>
        <Typography variant="body1">
          <strong>Start Date:</strong> February 1, 2025
        </Typography>
        <Typography variant="body1">
          <strong>End Date:</strong> December 31, 2025
        </Typography>

        {/* Add to Cart & Wishlist Buttons */}
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
