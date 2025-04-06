// src/pages/VendorDashboard.jsx
import React, { useState, useEffect } from "react";
import { 
    AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, 
    Container, Grid, Card, CardContent, Button 
} from "@mui/material";
import { Dashboard, AddCircle, Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const VendorDashboard = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUserId(decodedToken.userId);
            } catch (error) {
                console.error("Error decoding token:", error);
                navigate("/Login");
            }
        } else {
            navigate("/Login");
        }
    }, [navigate]);

    useEffect(() => {
        if (userId) {
            fetchProducts();
        }
    }, [userId]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/product/getProductByUser/${userId}`); // Backend endpoint
            setProducts(response.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/Login");
    };

    return (
        <div>
            <AppBar position="sticky" sx={{ backgroundColor: "green" }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>Vendor Dashboard</Typography>
                    <Button color="inherit" onClick={handleLogout} startIcon={<Logout />}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List>
                    <ListItem button onClick={() => navigate("/Home")}>
                        <Dashboard sx={{ color: "green" }} />
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem button onClick={() => navigate("/AddProduct")}>
                        <AddCircle sx={{ color: "green" }} />
                        <ListItemText primary="Add Drone" />
                    </ListItem>
                </List>
            </Drawer>

            <main style={{ marginLeft: 240, padding: "20px" }}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography variant="h3" textAlign="center" gutterBottom fontWeight="bold" color="green">
                                LISTED PRODUCTS
                            </Typography>
                        </Grid>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} key={product._id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6">{product.Product_name}</Typography>
                                        <Typography variant="body2">Description: {product.Description}</Typography>
                                        <Typography variant="body2">Price: ${product.Price}</Typography>
                                        {product.Image_url && <img src={product.Image_url} alt={product.Product_name} style={{width: '100%', maxHeight: '200px', objectFit: 'cover'}} />}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default VendorDashboard;