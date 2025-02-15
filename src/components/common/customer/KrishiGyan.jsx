import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, List, ListItem } from "@mui/material";

// Import local images
import RedSoilImage from "../../../assets/auth/freepik__the-style-is-candid-image-photography-with-natural__1362.jpg";
import ATVImage from "../../../assets/auth/Agriculture-Adult-Atvs-Utvs-300cc-Cargo-Farm-ATV-with-Trailer.jpg";
import FarmingImage from "../../../assets/auth/Tractor-spraying-pesticides-at-soy-bean-field.jpg";

const articles = [
  {
    title: "Red Soil and Its Characteristics",
    image: RedSoilImage,
    content: [
      { keyword: "Color & Composition:", text: "Rich in iron, giving it a reddish appearance." },
      { keyword: "Formation:", text: "Derived from weathered metamorphic and crystalline rocks." },
      { keyword: "Regions Found:", text: "Common in Andhra Pradesh, Telangana, Karnataka, and Maharashtra." },
      { keyword: "Nutrient Content:", text: "Lacks nitrogen and phosphorus, requiring fertilizers for better fertility." },
      { keyword: "Best Crops:", text: "Ideal for cotton, wheat, pulses, and millets." },
      { keyword: "Moisture Retention:", text: "Low water-holding capacity; needs proper irrigation." },
    ],
  },
  {
    title: "The Role of ATVs & UTVs in Agriculture",
    image: ATVImage,
    content: [
      { keyword: "Usage:", text: "Used for transportation, crop inspection, and field maintenance." },
      { keyword: "Popular Models:", text: "John Deere Gator, Kawasaki Mule, Polaris Ranger." },
      { keyword: "Terrain Advantage:", text: "Can navigate rough farm landscapes better than traditional tractors." },
      { keyword: "Efficiency:", text: "Reduces workload and increases productivity for large-scale farming." },
      { keyword: "Multipurpose:", text: "Used for fertilizing fields, managing livestock, and carrying heavy loads." },
    ],
  },
  {
    title: "Monoculture Farming: Benefits and Drawbacks",
    image: FarmingImage,
    content: [
      { keyword: "Definition:", text: "Growing a single crop in the same field over multiple seasons." },
      { keyword: "Advantages:", text: "Higher yield, easier management, and efficient farming operations." },
      { keyword: "Disadvantages:", text: "Leads to soil depletion, increased pest problems, and higher chemical use." },
      { keyword: "Alternative:", text: "Crop rotation and intercropping help maintain soil health and biodiversity." },
      { keyword: "Sustainability:", text: "Mixed cropping techniques ensure long-term agricultural success." },
    ],
  },
];

const KrishiGyan = () => {
  return (
    <Box sx={{ backgroundColor: "#f2f2f2", minHeight: "100vh", padding: "40px" }}>
      {articles.map((article, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "stretch",
            backgroundColor: "white",
            borderRadius: "15px",
            marginBottom: "30px",
            overflow: "hidden",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            height: { xs: "auto", md: "380px" }, // Uniform height
          }}
        >
          {/* Text Section */}
          <CardContent sx={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography 
              variant="h4" 
              fontWeight="bold" 
              sx={{ marginBottom: "20px", marginTop: "-10px", textAlign: "left", color: "#333" }}
            >
              {article.title}
            </Typography>
            <List sx={{ paddingLeft: "20px" }}>
              {article.content.map((point, i) => (
                <ListItem key={i} sx={{ display: "list-item", paddingLeft: "0" }}>
                  <Typography variant="body1" sx={{ color: "#555" }}>
                    <strong>{point.keyword}</strong> {point.text}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </CardContent>

          {/* Image Section */}
          <CardMedia
            component="img"
            sx={{ width: { xs: "100%", md: "40%" }, height: "100%", objectFit: "cover" }}
            image={article.image}
            alt={article.title}
          />
        </Card>
      ))}
    </Box>
  );
};

export default KrishiGyan;
