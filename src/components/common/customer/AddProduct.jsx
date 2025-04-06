import React, { useState, useEffect } from "react";
import { 
    Box, Typography, TextField, Button, MenuItem, IconButton, Card, CardContent, 
    CardMedia, Grid, Paper 
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddProduct = () => {
    const [images, setImages] = useState([]);
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("");
    const [status, setStatus] = useState(true);
    const [userId, setUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImages([file]);
        }
    };

    const handleSubmit = async () => {
        if (!productName || !description || !price || !quantity || !unit) {
            alert("Please fill in all fields.");
            return;
        }

        if (images.length === 0) {
            alert("Please upload an image.");
            return;
        }

        const formData = new FormData();

        formData.append("Product_name", productName);
        formData.append("Description", description);
        formData.append("Price", price);
        formData.append("Quantity", quantity);
        formData.append("Unit", unit);
        formData.append("Status", status);
        formData.append("Images", images[0]);
        formData.append("User_id", userId);

        try {
            const response = await axios.post("/product/createProduct", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (response.status !== 201) {
                throw new Error("Failed to upload product details");
            }

            console.log("Product added successfully:", response.data);

            setProductName("");
            setDescription("");
            setPrice("");
            setQuantity("");
            setUnit("");
            setStatus(true);
            setImages([]);

            alert("Product added successfully!");
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Error adding product: " + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
            <Card sx={{ width: 500, padding: 3, borderRadius: 3, boxShadow: 5 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2} color="green">
                        Upload Product Details
                    </Typography>

                    <Paper 
                        variant="outlined" 
                        sx={{ 
                            p: 2, 
                            textAlign: "center", 
                            bgcolor: "#f7f7f7", 
                            borderRadius: 2, 
                            mb: 2 
                        }}
                    >
                        <input 
                            type="file" 
                            accept="image/*" 
                            id="upload-button" 
                            style={{ display: "none" }} 
                            onChange={handleImageUpload} 
                        />
                        <label htmlFor="upload-button">
                            <Button 
                                variant="contained" 
                                component="span" 
                                startIcon={<CloudUploadIcon />} 
                                sx={{ textTransform: "none", bgcolor: "green", color: "white", "&:hover":{bgcolor: "darkgreen"} }}
                            >
                                Upload Image
                            </Button>
                        </label>
                    </Paper>

                    {images.length > 0 && (
                        <Box display="flex" justifyContent="center" mb={2}>
                            <CardMedia 
                                component="img" 
                                image={URL.createObjectURL(images[0])} 
                                alt="Product" 
                                sx={{ width: 150, height: 150, borderRadius: 2 }} 
                            />
                            <IconButton 
                                onClick={() => setImages([])} 
                                sx={{ bgcolor: "red", color: "white", ml: 1, "&:hover": { bgcolor: "#d32f2f" } }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    )}

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Product Name" 
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)} 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Description" 
                                multiline 
                                rows={3} 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Price" 
                                type="number" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Quantity" 
                                type="number" 
                                value={quantity} 
                                onChange={(e) => setQuantity(e.target.value)} 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                label="Unit" 
                                value={unit} 
                                onChange={(e) => setUnit(e.target.value)} 
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField 
                                fullWidth 
                                select 
                                label="Status" 
                                value={status} 
                                onChange={(e) => setStatus(e.target.value === "true")}
                            >
                                <MenuItem value={true}>Available</MenuItem>
                                <MenuItem value={false}>Not Available</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <Button 
                        fullWidth 
                        variant="contained" 
                        onClick={handleSubmit} 
                        sx={{ 
                            mt: 3, 
                            bgcolor: "green", 
                            color: "white", 
                            textTransform: "none", 
                            fontSize: "16px",
                            "&:hover": { bgcolor: "darkgreen" } 
                        }}
                    >
                        Submit
                    </Button>
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => navigate("/VendorDashboard")}
                        sx={{
                            mt: 2,
                            textTransform: "none",
                            fontSize: "16px",
                            borderColor: "green",
                            color: "green",
                            "&:hover":{borderColor: "darkgreen", color: "darkgreen"}
                        }}
                    >
                        Back to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AddProduct;