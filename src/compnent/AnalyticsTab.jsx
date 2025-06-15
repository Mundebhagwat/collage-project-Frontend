import React from "react";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import {
  PeopleAlt,
  Shield,
  Warning,
  Dashboard,
  Analytics,
  Message
} from "@mui/icons-material";
import StatCard from "./StatCard";

const AnalyticsTab = ({ summaryData }) => {
  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>Analytics Overview</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Performance metrics for the matrimonial platform
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<PeopleAlt />}
              title="Total Users"
              value={summaryData.totalUsers}
              color="#0284c7"
              increase={12.5}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Shield />}
              title="Premium Users"
              value={summaryData.premiumUsers}
              color="#0891b2"
              increase={8.3}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Warning />}
              title="Pending Verifications"
              value={summaryData.pendingVerifications}
              color="#d97706"
              increase={-5.2}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Dashboard />}
              title="New Users Today"
              value={summaryData.newUsersToday}
              color="#0f766e"
              increase={4.7}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Analytics />}
              title="Total Matches"
              value={summaryData.totalMatches}
              color="#7c3aed"
              increase={15.8}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <StatCard
              icon={<Message />}
              title="Active Conversations"
              value={summaryData.activeChats}
              color="#be123c"
              increase={9.1}
            />
          </Grid>
        </Grid>
      </Box>

      <Card
        variant="outlined"
        sx={{
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Activity Report
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            The chart data is a placeholder. Implement actual analytics visualization here.
          </Typography>
          <Box
            sx={{
              height: 300,
              width: "100%",
              bgcolor: "#f8fafc",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography color="text.secondary">
              Analytics Chart Placeholder
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsTab;




