// AdminPage.js
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../../../assets/auth/KISANSETU-logo-png.png";
import axios from "axios";

const navItems = [
  { label: "View Users", path: "users" },
  { label: "View Orders", path: "orders" },
];

const AdminPage = () => {
  const location = useLocation();
  const [selected, setSelected] = useState(() => {
    const matchingItem = navItems.find((item) => location.pathname === `/admin/${item.path}`);
    return matchingItem ? matchingItem.label : "View Users";
  });
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
    handleMenuClose();
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#2E7D32", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
            <Typography variant="h6" fontWeight="bold" color="white">
              Kisan Setu Admin
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: "20px" }}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={`/admin/${item.path}`}
                onClick={() => setSelected(item.label)}
                style={{
                  textDecoration: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  backgroundColor: selected === item.label ? "white" : "transparent",
                  color: selected === item.label ? "#2E7D32" : "white",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
              >
                {item.label}
              </Link>
            ))}
          </Box>

          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: "white", color: "#2E7D32" }}>A</Avatar>
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {location.pathname === "/admin/users" && <UsersPage />}
      {location.pathname === "/admin/orders" && <OrdersPage />}
    </>
  );
};

// UsersPage.js
const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");
      try {
        const response = await axios.get("/user/getUser");
        console.log("Full Response:", response);
        console.log("Users Data:", response.data);

        if (Array.isArray(response.data.data)) {
          setUsers(response.data.data);
          console.log(users);
        } else {
          console.error("API did not return an array:", response.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        console.log("Error object:", error);
      }
    };

    fetchUsers();
  }, []);

  console.log("Current Users array:", users);

  if (users.length === 0) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>Users</Typography>
        <Typography>No users found.</Typography>
      </Box>
    );
  }

  console.log(users.length);

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Users</Typography>
      <Grid container spacing={2}>
        {users.map((user) => {
          console.log("User in map:", user);
          return (
            <Grid item xs={12} sm={6} md={4} key={user._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{user.Fname} {user.Lname}</Typography>
                  <Typography>Email: {user.Email}</Typography>
                  <Typography>ID: {user._id}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

// OrdersPage.js
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/order/getOrder"); // Or '/order/getOrder' if using a proxy
        setOrders(response.data.data); // Assuming your backend returns { message: ..., data: [] }
        console.log("Orders fetched:", response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>Orders</Typography>
        <Typography>No orders found.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>Orders</Typography>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid item xs={12} sm={6} md={4} key={order._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Order ID: {order._id}</Typography>
                <Typography>User ID: {order.User_id}</Typography>
                <Typography>Product ID: {order.Product_id}</Typography>
                <Typography>Quantity: {order.Quantity}</Typography>
                <Typography>Price: ${order.Price_per_peice}</Typography>
                <Typography>Total: ${order.Total_price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminPage;