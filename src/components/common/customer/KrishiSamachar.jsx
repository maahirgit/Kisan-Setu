import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import AgricultureImage from  "../../../assets/auth/Home sreen image banner.jpg";

const KrishiSamachar = () => {
  const news = [
    "Government announces new subsidy for organic farming.",
    "Heavy rainfall expected in northern states, farmers advised to take precautions.",
    "New technology introduced to improve soil fertility.",
    "Market prices for wheat and rice see a slight increase.",
    "Pesticide ban implemented on harmful chemicals affecting crops."
  ];

  return (
    <Box display="flex" flexDirection="column" alignItems="center" padding={3} bgcolor="#f5f5f5" minHeight="100vh">
      <Box width="80%" padding={3} bgcolor="white" borderRadius={2} boxShadow={3}>
        <img src={AgricultureImage} alt="Agriculture" style={{ width: "100%", borderRadius: 8 }} />
        <Typography variant="h4" gutterBottom fontWeight="bold" color="#2E7D32" marginTop={2}>
          Krishi Samachar
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Stay updated with the latest agricultural news and updates.
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        {news.map((item, index) => (
          <Card key={index} sx={{ marginBottom: 2, padding: 2, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="body1">• {item}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default KrishiSamachar;
