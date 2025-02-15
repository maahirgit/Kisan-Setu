import React from "react";
import { Grid, Typography, Box, Avatar } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../../assets/auth/Home sreen image banner.jpg";
import image2 from "../../../assets/auth/What-is-Subsistence-Farming-The-Scopes-Associated-Benefits-Types-930x620.jpg";
import image3 from "../../../assets/auth/himanshu-choudhary-Q1Ck_WFzwHA-unsplash.jpg";
import objectiveImage from "../../../assets/auth/himanshu-choudhary-Q1Ck_WFzwHA-unsplash.jpg";
import icon1 from "../../../assets/auth/Home sreen image banner.jpg";
import icon2 from "../../../assets/auth/What-is-Subsistence-Farming-The-Scopes-Associated-Benefits-Types-930x620.jpg";
import icon3 from "../../../assets/auth/himanshu-choudhary-Q1Ck_WFzwHA-unsplash.jpg";
import icon4 from "../../../assets/auth/Home sreen image banner.jpg";
import icon5 from "../../../assets/auth/What-is-Subsistence-Farming-The-Scopes-Associated-Benefits-Types-930x620.jpg";
import icon6 from "../../../assets/auth/himanshu-choudhary-Q1Ck_WFzwHA-unsplash.jpg";
import teamImage from "../../../assets/auth/What-is-Subsistence-Farming-The-Scopes-Associated-Benefits-Types-930x620.jpg";

const images = [image1, image2, image3];
const objectives = [
  { image: icon1, text: "Providing farmers with cutting-edge agricultural knowledge." },
  { image: icon2, text: "Enhancing sustainability through innovative solutions." },
  { image: icon3, text: "Empowering rural communities with modern technology." },
  { image: icon4, text: "Providing farmers with cutting-edge agricultural knowledge." },
  { image: icon5, text: "Enhancing sustainability through innovative solutions." },
  { image: icon6, text: "Empowering rural communities with modern technology." },
];

const HomePage = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box>
      {/* Image Slider */}
      <Slider {...settings}>
        {images.map((img, index) => (
          <Box key={index} sx={{ textAlign: "center" }}>
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%", height: "550px", objectFit: "cover" }} />
          </Box>
        ))}
      </Slider>

      {/* Objectives Section with Alternating Layout */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="green" sx={{ textAlign: "center", mb: 2 }}>OUR OBJECTIVES</Typography>
        {objectives.map((obj, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 3, flexDirection: index % 2 === 0 ? "row" : "row-reverse" }}>
            <Avatar src={obj.image} sx={{ width: 80, height: 80, margin: 2 }} />
            <Box sx={{ backgroundColor: "green", color: "white", p: 2, borderRadius: "8px", maxWidth: "500px" }}>
              <Typography variant="body1">{obj.text}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Mission Section */}
      <Box sx={{ p: 4, backgroundColor: "green", textAlign: "center", color: "white", borderRadius: "8px" }}>
        <Typography variant="h4" fontWeight="bold">OUR MISSION</Typography>
        <Typography variant="body1" sx={{ mt: 2, textAlign: "left", maxWidth: "800px", margin: "0 auto" }}>
          <strong>Kisan Setu</strong> is committed to transforming agriculture by integrating advanced technology and sustainable practices. Our mission includes:
          <br /><br />
          <strong>1. Digital Agriculture:</strong> Providing farmers with real-time data and AI-driven insights to optimize crop yields.
          <br /><br />
          <strong>2. Market Connectivity:</strong> Bridging the gap between farmers and consumers by offering direct market access.
          <br /><br />
          <strong>3. Resource Optimization:</strong> Enabling efficient water usage, soil health analysis, and climate-smart farming techniques.
          <br /><br />
          <strong>4. Education & Training:</strong> Conducting workshops and online training sessions to enhance agricultural knowledge.
          <br /><br />
          <strong>5. Financial Support:</strong> Assisting farmers with loans, subsidies, and insurance for financial stability.
          <br /><br />
          <strong>6. Sustainable Practices:</strong> Promoting eco-friendly methods and organic farming for long-term agricultural growth.
          <br /><br />
          <strong>7. Community Development:</strong> Strengthening rural communities by fostering collaboration and innovation.
        </Typography>
      </Box>

      {/* Team Section */}
      <Box sx={{ p: 4, display: "flex", alignItems: "center", flexDirection: "row" }}>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img src={teamImage} alt="Team" style={{ width: "100%", borderRadius: "8px" }} />
        </Box>
        <Box sx={{ flex: 1, backgroundColor: "green", color: "white", p: 4, borderRadius: "8px", ml: 4 }}>
          <Typography variant="h4" fontWeight="bold">OUR TEAM AIM</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Our team at <strong>Kisan Setu</strong> is driven by a shared vision of revolutionizing agriculture through technology and innovation.
            <br /><br />
            - <strong>Collaboration & Expertise:</strong> We bring together experts in agriculture, technology, and business to create impactful solutions.
            <br /><br />
            - <strong>Empowering Farmers:</strong> We focus on providing accessible and practical tools that enhance efficiency and productivity.
            <br /><br />
            - <strong>Sustainability First:</strong> Our initiatives emphasize eco-friendly and sustainable farming practices to protect the environment.
            <br /><br />
            - <strong>Continuous Improvement:</strong> We constantly evolve our strategies based on feedback and emerging agricultural trends.
            <br /><br />
            - <strong>Community Engagement:</strong> We foster a strong connection with farming communities, ensuring our solutions are tailored to their needs.
          </Typography>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 4, backgroundColor: "#2E7D32", textAlign: "center", color: "white", mt: 4 }}>
        <Typography variant="h5" fontWeight="bold">Kisan Setu</Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>Bridging Agriculture with Technology</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ mx: 2, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Home</Typography>
          <Typography variant="body2" sx={{ mx: 2, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>About</Typography>
          <Typography variant="body2" sx={{ mx: 2, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Services</Typography>
          <Typography variant="body2" sx={{ mx: 2, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>Contact</Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>Empowering Farmers | Sustainable Growth | Market Connectivity</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>© {new Date().getFullYear()} Kisan Setu. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
