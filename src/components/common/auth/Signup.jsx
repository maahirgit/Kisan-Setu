import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import { Grid, Typography, Button, TextField, Checkbox, FormControlLabel, Box } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import FarmerIllustration from "../../../assets/auth/farm-lifestyle-digital-art.jpg";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const SignUpPage = () => {
  const {register, handleSubmit,formState : {errors}} = useForm()
  const navigate = useNavigate();

  const handleSignUp = async (data) => {
    try {
      const response = await axios.post("user/createUser",data);

      if(response.status === 200){
        toast.success("Signup Successful",{
          className : "toast-success",
          autoClose : 2000,
          hideProgressBar : false
        });

        setTimeout(() => {
          navigate('/Login');
        },2500)
     
      }
      else{
        toast.success("Signup Unsuccessful",{
          className : "toast-success",
          autoClose : 2000,
          hideProgressBar : false
        });
      }
    } catch (err) {
      console.error("Sign-Up failed:")
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
      there="colored"
    />
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
        {/* <Button variant="outlined" startIcon={<GoogleIcon />} sx={{ width: "80%", my: 1 }}>
          Sign up with Google
        </Button>
        <Button variant="outlined" startIcon={<FacebookIcon />} sx={{ width: "80%", my: 1 }}>
          Sign up with Facebook
        </Button>

        <Typography variant="body2" sx={{ my: 2 }}>
          — or sign up with email —
        </Typography> */}

        {/* Input Fields */}
        <form onSubmit={handleSubmit(handleSignUp)} style={{width : "80%"}}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          sx={{ my: 1 }}
          {...register("Fname", {required : "First name is required."})}
          error = {!!errors.Fname}
          helperText={errors.Fname?.message}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          sx={{ my: 1}}
          {...register("Lname",{required : "Last name is required."})}
          error = {!!errors.Lname}
          helperText={errors.Lname?.message}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          sx={{ my: 1}}
          {...register("Email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          sx={{ my: 1}}
          {...register("Password", { required: "Password is required" })}
          error={!!errors.Password}
          helperText={errors.Password?.message}
        />

        {/* Terms & Conditions */}
      {/*   <Box sx={{ display: "flex", justifyContent: "space-between", width: "80%", my: 1 }}>
          <FormControlLabel control={<Checkbox />} label="I agree to the Terms & Conditions" />
        </Box> */}

        {/* Sign-Up Button */}
        <Button type="submit" variant="contained" color="success" sx={{ width: "100%", my: 2 }}>
          SIGN UP
        </Button>
        </form>
        
        {/* Login Link */}
        <Typography variant="body2">
          Already have an account? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate("/Login")}>
            Login
          </Typography>
        </Typography>
      </Grid>
    </Grid>
    </>
  );
};

export default SignUpPage;
