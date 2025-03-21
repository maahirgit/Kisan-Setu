import React, { useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { Grid, Typography, Button, TextField, Checkbox, FormControlLabel, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import FarmerIllustration from "../../../assets/auth/farm-lifestyle-digital-art.jpg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("user/loginUser", data);

      if (response.status === 200) {
        toast.success("Login Successful", {
          className: "toast-success",
          autoClose: 2000,
          hideProgressBar: false
        });

        setTimeout(() => {
          navigate('/');
        }, 2500);
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          toast.error("User not found. Please register first", {
            className: "toast-error",
            autoClose: 3000,
            hideProgressBar: false
          });
        } else if (err.response.status === 401) {
          toast.error("Incorrect password. Please try again.", {
            className: "toast-error",
            autoClose: 3000,
            hideProgressBar: false
          });
        } else {
          toast.error("Login failed. Please try again later.", {
            className: "toast-error",
            autoClose: 3000,
            hideProgressBar: false
          });
        }
      } else {
        toast.error("Network error. Please check your connection.", {
          className: "toast-error",
          autoClose: 3000,
          hideProgressBar: false
        });
      }
      console.log("Login failed", err);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
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

         {/*  {/* Social Login Buttons */}
          {/* <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ width: "80%", my: 1 }}>
            Google
          </Button>
          <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ width: "80%", my: 1 }}>
            Facebook
          </Button>

          <Typography variant="body2" sx={{ my: 2 }}>
            — or continue with email —
          </Typography>  */}

          {/* Input Fields */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "80%" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              {...register("Email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              {...register("Password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            {/* Remember Me & Forgot Password */}
            {/* <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", my: 1 }}>
              <FormControlLabel 
                control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />} 
                label="Remember me" 
              />
              <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                Forgot Password?
              </Typography>
            </Box> */}

            {/* Login Button */}
            <Button type="submit" variant="contained" color="success" sx={{ width: "100%", my: 2 }}>
              LOGIN
            </Button>
          </form>
          
          {/* Signup Link */}
          <Typography variant="body2">
            Don't have an account? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate("/Signup")}>Create an account</Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;
