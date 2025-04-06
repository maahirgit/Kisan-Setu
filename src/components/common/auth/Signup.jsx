import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Box,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from "@mui/material";
import FarmerIllustration from "../../../assets/auth/farm-lifestyle-digital-art.jpg";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const SignUpPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [userType, setUserType] = useState("customer");

  const handleSignUp = async (data) => {
    try {
      let roleId;
      if (userType === "customer") {
        roleId = "67f2a19c544857e8dec81c69";
      } else if (userType === "vendor") {
        roleId = "67f2a1ea544857e8dec81c6b";
      }

      const response = await axios.post("user/createUser", {
        ...data,
        RoleId: roleId, // Assign roleId based on userType
      });

      if (response.status === 200) {
        toast.success("Signup Successful", {
          className: "toast-success",
          autoClose: 2000,
          hideProgressBar: false,
        });

        setTimeout(() => {
          navigate("/Login");
        }, 2500);
      } else {
        toast.error("Signup Unsuccessful", {
          className: "toast-error",
          autoClose: 2000,
          hideProgressBar: false,
        });
      }
    } catch (err) {
      console.error("Sign-Up failed:", err);
      toast.error("Signup failed. Please try again.", {
        className: "toast-error",
        autoClose: 2000,
        hideProgressBar: false,
      });
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
        <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden" }}>
          <img src={FarmerIllustration} alt="Farmer" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 4 }}>
          <Typography variant="h4" color="green" fontWeight="bold" gutterBottom>
            Create an account
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            "Join the bridge to better farming, Welcome to KisanSetu !!"
          </Typography>

          <form onSubmit={handleSubmit(handleSignUp)} style={{ width: "80%" }}>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              {...register("Fname", { required: "First name is required." })}
              error={!!errors.Fname}
              helperText={errors.Fname?.message}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              {...register("Lname", { required: "Last name is required." })}
              error={!!errors.Lname}
              helperText={errors.Lname?.message}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              sx={{ my: 1 }}
              {...register("Email", { required: "Email is required" })}
              error={!!errors.Email}
              helperText={errors.Email?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              sx={{ my: 1 }}
              {...register("Password", { required: "Password is required" })}
              error={!!errors.Password}
              helperText={errors.Password?.message}
            />

            <FormControl component="fieldset" sx={{ my: 2 }}>
              <FormLabel component="legend">I am a:</FormLabel>
              <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="vendor" control={<Radio />} label="Vendor" />
              </RadioGroup>
            </FormControl>

            <Button type="submit" variant="contained" color="success" sx={{ width: "100%", my: 2 }}>
              SIGN UP
            </Button>
          </form>

          <Typography variant="body2">
            Already have an account?{" "}
            <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate("/Login")}>
              Login
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpPage;