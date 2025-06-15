import React from "react";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";

const StatCard = ({ icon, title, value, color, increase }) => (
  <Card
    sx={{
      height: "100%",
      background: `linear-gradient(135deg, ${color}15, ${color}05)`,
      border: `1px solid ${color}30`,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
      },
    }}
  >
    <CardContent>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold" my={1}>
            {value}
          </Typography>
          <Typography
            variant="caption"
            color={increase >= 0 ? "success.main" : "error.main"}
          >
            {increase >= 0 ? "+" : ""}
            {increase}% from last month
          </Typography>
        </Box>
        <Avatar
          sx={{
            bgcolor: `${color}20`,
            color: color,
            width: 56,
            height: 56,
            boxShadow: `0 0 0 8px ${color}10`,
          }}
        >
          {icon}
        </Avatar>
      </Box>
    </CardContent>
  </Card>
);

export default StatCard;
