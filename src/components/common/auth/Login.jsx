// frontend/components/LoginPage.js

import React, { useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';
import { Grid, Typography, Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import FarmerIllustration from "../../../assets/auth/farm-lifestyle-digital-art.jpg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [userType, setUserType] = useState("67f2a19c544857e8dec81c69"); // Default to customer

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("user/loginUser", { ...data, RoleId: userType });

            if (response.status === 200) {
                localStorage.setItem("token", response.data.token);
                console.log("Token stored in localStorage:", localStorage.getItem("token"));

                toast.success("Login Successful", {
                    className: "toast-success",
                    autoClose: 2000,
                    hideProgressBar: false,
                });

                setTimeout(() => {
                    if (response.data.roleId === "67f2a1ea544857e8dec81c6b") {
                        navigate('/vendordashboard'); // Redirect to vendor dashboard
                    } else {
                        navigate('/'); // Default redirect to home
                    }
                }, 2500);
            }
        } catch (err) {
            console.log("Login failed", err);
            if (err.response) {
                console.log("Response data", err.response.data);
                console.log("Response status", err.response.status);

                if (err.response.status === 404) {
                    toast.error("User not found. Please register first", {
                        className: "toast-error",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                } else if (err.response.status === 401) {
                    toast.error("Incorrect password or Role ID mismatch.", {
                        className: "toast-error",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                } else {
                    toast.error("Login failed. Please try again later.", {
                        className: "toast-error",
                        autoClose: 3000,
                        hideProgressBar: false,
                    });
                }
            } else {
                toast.error("Network error. Please check your connection.", {
                    className: "toast-error",
                    autoClose: 3000,
                    hideProgressBar: false,
                });
            }
        }
    };

    const handleAdminLogin = (data) => {
        if (data.Email === "Admin@gmail.com" && data.Password === "Admin123") {
            console.log("Admin Login Successful");
            navigate('/Admin'); // Redirect to admin dashboard
        } else {
            console.error("Admin Login Failed: Invalid Credentials");
            toast.error("Invalid Admin Credentials", {
                className: "toast-error",
                autoClose: 3000,
                hideProgressBar: false,
            });
        }
    };

    const onAdminSubmit = (data) => {
        handleAdminLogin(data);
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
                        Login to your account
                    </Typography>
                    <Typography variant="body2" color="textSecondary" gutterBottom>
                        "Join the bridge to better farming, Welcome to KisanSetu !!"
                    </Typography>

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

                        <FormControl component="fieldset" sx={{ my: 2 }}>
                            <FormLabel component="legend">Login as:</FormLabel>
                            <RadioGroup row value={userType} onChange={(e) => setUserType(e.target.value)}>
                                <FormControlLabel
                                    value="67f2a19c544857e8dec81c69"
                                    control={<Radio />}
                                    label="Customer"
                                />
                                <FormControlLabel
                                    value="67f2a1ea544857e8dec81c6b"
                                    control={<Radio />}
                                    label="Vendor"
                                />
                            </RadioGroup>
                        </FormControl>

                        <Button type="submit" variant="contained" sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#2E8B57' }, width: "100%", my: 1 }}>
                            LOGIN
                        </Button>
                    </form>

                    <form onSubmit={handleSubmit(onAdminSubmit)} style={{ width: "80%" }}>
                        <Button type="submit" variant="contained" sx={{ backgroundColor: 'green', color: 'white', '&:hover': { backgroundColor: '#2E8B57' }, width: "100%", my: 1 }}>
                            Login as Admin
                        </Button>
                    </form>

                    <Typography variant="body2">
                        Don't have an account? <Typography component="span" color="primary" sx={{ cursor: "pointer" }} onClick={() => navigate("/Signup")}>Create an account</Typography>
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
};

export default LoginPage;