import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography, List, ListItem } from "@mui/material";

const KrishiGyan = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:3001/article/getArticle");
        setArticles(response.data.data); // Assuming your API response format is { message: '...', data: [...] }
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchArticles();
  }, []);

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
            height: { xs: "auto", md: "380px" },
          }}
        >
          <CardContent sx={{ flex: 1, padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{ marginBottom: "20px", textAlign: "left", color: "#333" }}
            >
              {article.Title}
            </Typography>
            <Typography variant="body1" sx={{ color: "#555" }}>
              {article.Content}
            </Typography>
          </CardContent>

          {article.Image_url && (
            <CardMedia
              component="img"
              sx={{ width: { xs: "100%", md: "40%" }, height: "100%", objectFit: "cover" }}
              image={article.Image_url}
              alt={article.Title}
            />
          )}
        </Card>
      ))}
    </Box>
  );
};

export default KrishiGyan;
