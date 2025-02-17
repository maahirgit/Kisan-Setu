import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Button, TextField, Checkbox, FormControlLabel, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import FarmerIllustration from "../../../assets/auth/farm-lifestyle-digital-art.jpg";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3001/user/createUser", {
        Fname: firstName,
        Lname: lastName,
        Email: email,
        Password: password
      });

      if (response.data.message === "User Registered Successfully") {
        alert("Sign-Up Successful!");
      } else {
        setError("Error signing up, please try again");
      }
    } catch (err) {
      console.error("Sign-Up failed:", err.response ? err.response.data : err.message);
      setError("Error signing up, please try again");
    }
  };

  return (
    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side - Image */}
      <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
        <img src={FarmerIllustration} alt="Farmer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </Grid>

      {/* Right Side - Sign-Up Form */}
      <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 4 }}>
        <Typography variant="h4" color="green" fontWeight="bold" gutterBottom>
          Create an account
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          "Join the bridge to better farming, Welcome to KisanSetu !!"
        </Typography>

        {/* Social Sign-Up Buttons */}
        <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ width: "80%", my: 1 }}>
          Sign up with Google
        </Button>
        <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ width: "80%", my: 1 }}>
          Sign up with Facebook
        </Button>

        <Typography variant="body2" sx={{ my: 2 }}>
          — or sign up with email —
        </Typography>

        {/* Input Fields */}
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          sx={{ my: 1, width: "80%" }}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          sx={{ my: 1, width: "80%" }}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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

        {/* Terms & Conditions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", my: 1 }}>
          <FormControlLabel control={<Checkbox />} label="I agree to the Terms & Conditions" />
        </Box>

        {/* Sign-Up Button */}
        <Button variant="contained" color="success" sx={{ width: "80%", my: 2 }} onClick={handleSignUp}>
          SIGN UP
        </Button>

        {error && <Typography color="error">{error}</Typography>}

        {/* Login Link */}
        <Typography variant="body2">
          Already have an account? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate("/Login")}>
            Login
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
