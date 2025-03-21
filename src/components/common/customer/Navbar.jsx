import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Avatar } from "@mui/material";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/auth/KISANSETU-logo-png.png";

const navItems = ["Home", "KrishiMart", "KrishiGyan", "KrishiSamachar"];

const Navbar = () => {
  const [selected, setSelected] = useState("Home");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); // Remove userId from localStorage
    navigate("/login"); // Redirect to login page
    handleMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#2E7D32", padding: "10px 0" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left - Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Logo" style={{ width: "50px", height: "50px", marginRight: "10px" }} />
            <Typography variant="h6" fontWeight="bold" color="white">
              Kisan Setu
            </Typography>
          </Box>

          {/* Middle - Navigation Links */}
          <Box sx={{ display: "flex", gap: "20px" }}>
            {navItems.map((item) => (
              <Link
                key={item}
                to={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, '')}`}
                onClick={() => setSelected(item)}
                style={{
                  textDecoration: "none",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  backgroundColor: selected === item ? "white" : "transparent",
                  color: selected === item ? "#2E7D32" : "white",
                  fontWeight: "bold",
                  transition: "0.3s",
                }}
              >
                {item}
              </Link>
            ))}
          </Box>

          {/* Right - Icons (Wishlist, Cart, User Profile) */}
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <IconButton component={Link} to="/wishlist">
              <Favorite sx={{ color: "white" }} />
            </IconButton>
            <IconButton component={Link} to="/addtocart">
              <ShoppingCart sx={{ color: "white" }} />
            </IconButton>

            {/* User Profile Button */}
            <IconButton onClick={handleProfileMenuOpen}>
              <Avatar sx={{ bgcolor: "white", color: "#2E7D32" }}>U</Avatar>
            </IconButton>

            {/* Profile Dropdown Menu */}
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
      <Outlet />
    </>
  );
};

export default Navbar;
