import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Favorite, ShoppingCart } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import logo from "../../../assets/auth/KISANSETU-logo-png.png";

const navItems = ["Home", "KrishiMart", "KrishiGyan", "KrishiSamachar"];

const Navbar = () => {
  const [selected, setSelected] = useState("Home");

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

          {/* Right - Wishlist & Cart Icons */}
          <Box sx={{ display: "flex", gap: "10px" }}>
            <IconButton component={Link} to="/wishlist">
              <Favorite sx={{ color: "white" }} />
            </IconButton>
            <IconButton component={Link} to="/addtocart">
              <ShoppingCart sx={{ color: "white" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Navbar;
