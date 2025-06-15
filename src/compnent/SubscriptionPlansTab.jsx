import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from "@mui/material";

const SubscriptionPlansTab = () => {
  return (
    <Card variant="outlined" sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom mb={3}>
          Subscription Plans Management
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                <TableCell>Plan Name</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Features</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">Basic</Typography>
                </TableCell>
                <TableCell>1 Month</TableCell>
                <TableCell>₹999</TableCell>
                <TableCell>
                  <Typography variant="body2">5 direct messages per day</Typography>
                  <Typography variant="body2">Basic search filters</Typography>
                </TableCell>
                <TableCell>
                  <Chip label="Active" size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">Premium</Typography>
                </TableCell>
                <TableCell>3 Months</TableCell>
                <TableCell>₹2499</TableCell>
                <TableCell>
                  <Typography variant="body2">Unlimited messages</Typography>
                  <Typography variant="body2">Advanced search filters</Typography>
                  <Typography variant="body2">Profile highlights</Typography>
                </TableCell>
                <TableCell>
                  <Chip label="Active" size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
              <TableRow hover>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">Gold</Typography>
                </TableCell>
                <TableCell>6 Months</TableCell>
                <TableCell>₹4999</TableCell>
                <TableCell>
                  <Typography variant="body2">All Premium features</Typography>
                  <Typography variant="body2">Priority in search results</Typography>
                  <Typography variant="body2">Profile verification badge</Typography>
                </TableCell>
                <TableCell>
                  <Chip label="Active" size="small" color="success" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Button size="small" variant="outlined">Edit</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlansTab;
