import React, { useState } from "react";
import axios from "axios";
import { Grid, Typography, Button, TextField, Checkbox, FormControlLabel, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import FarmerIllustration from "../../../assets/auth/farm-lifestyle-digital-art.jpg";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/loginUser", {
        Email: email,
        Password: password
      });

      if (response.data.message === "User Login Successful") {
        alert("Login Successful!");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Login failed:", err.response ? err.response.data : err.message);
      setError("Invalid email or password");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side - Image */}
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        <img src={FarmerIllustration} alt="Farmer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Grid>

      {/* Right Side - Login Form */}
      <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 4 }}>
        <Typography variant="h4" color="green" fontWeight="bold" gutterBottom>
          Login to your account
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          "Join the bridge to better farming, Welcome to KisanSetu !!"
        </Typography>

        {/* Social Login Buttons */}
        <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ width: "80%", my: 1 }}>
          Google
        </Button>
        <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ width: "80%", my: 1 }}>
          Facebook
        </Button>

        <Typography variant="body2" sx={{ my: 2 }}>
          — or continue with email —
        </Typography>

        {/* Input Fields */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ my: 1, width: "80%" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ my: 1, width: "80%" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me & Forgot Password */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", my: 1 }}>
          <FormControlLabel control={<Checkbox />} label="Remember me" />
          <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
            Forgot Password?
          </Typography>
        </Box>

        {/* Login Button */}
        <Button variant="contained" color="success" sx={{ width: "80%", my: 2 }} onClick={handleLogin}>
          LOGIN
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        {/* Signup Link */}
        <Typography variant="body2">
          Don't have an account? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate("/Signup")}>Create an account</Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
