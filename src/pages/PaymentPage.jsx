import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  CircularProgress,
  styled
} from '@mui/material';
import { Tag, Shield, ArrowRight, Star, Crown } from 'lucide-react';
import axios from 'axios';
import { toast } from "react-toastify";
import NavBar from '../compnent/NavBar';

// Custom styled components using Material UI's styled API
const GradientHeader = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
  padding: theme.spacing(4),
  color: 'white',
  textAlign: 'center'
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
  color: 'white',
  padding: theme.spacing(1.5),
  fontSize: '1.1rem',
  '&:hover': {
    background: 'linear-gradient(to right, #7c3aed, #2563eb)',
  }
}));

const PremiumCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  border: `2px solid #8b5cf6`,
  backgroundColor: '#f5f3ff',
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
  position: 'relative',
  overflow: 'hidden'
}));

const PremiumBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '12px',
  right: '-30px',
  transform: 'rotate(45deg)',
  backgroundColor: '#8b5cf6',
  color: 'white',
  padding: '5px 30px',
  fontSize: '0.8rem',
  fontWeight: 'bold',
  zIndex: 1
}));

const FeatureItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1.5),
  color: '#4b5563',
}));

const SecurityBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: '#EFF6FF',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid #DBEAFE'
}));

const SummaryBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#f9fafb',
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)'
}));

const PriceTag = styled(Box)(({ theme }) => ({
  display: 'inline-block',
  backgroundColor: '#8b5cf6',
  color: 'white',
  padding: theme.spacing(0.5, 2),
  borderRadius: '24px',
  fontWeight: 'bold',
  marginLeft: theme.spacing(1)
}));

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const premiumPlan = {
    name: 'Premium Plan',
    price: 1999,
    originalPrice: 2999,
    features: [
      'Contact profiles',
      'Chat with members',
      'pay and use services',
      'Premium badge on profile',
      'Profile featured in search results'
    ]
  };

  const handleProceedToPayment = async () => {
    setLoading(true);

    try {
      // Call your backend API to upgrade the user's status to premium
      const response = await axios.patch('https://collage-project-backend-j2vf.onrender.com/api/subscription/upgrade', {}, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.status === 200) {
        // Handle successful upgrade - perhaps redirect to a thank you page or dashboard
        toast.success('Congratulations! You are now a premium member.');
        // Redirect logic here if needed
      }
    } catch (error) {
      console.error('Error upgrading to premium:', error);
      toast.error('There was an issue processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: '#f3f4f6',
        p: { xs: 2, sm: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Paper elevation={8} sx={{ width: '100%', maxWidth: '800px', borderRadius: 2, overflow: 'hidden' }}>
          <GradientHeader>
            <Crown size={42} style={{ marginBottom: '12px' }} />
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Upgrade to Premium
            </Typography>
            <Typography variant="body1" sx={{ mt: 1, opacity: 0.9 }}>
              Elevate your experience and find your perfect match today
            </Typography>
          </GradientHeader>

          <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
            <Grid container spacing={4}>
              {/* Premium Plan Details */}
              <Grid item xs={12}>
                <PremiumCard>
                  <PremiumBadge>EXCLUSIVE</PremiumBadge>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Star size={24} color="#8b5cf6" fill="#8b5cf6" />
                    <Typography variant="h5" sx={{ ml: 1, fontWeight: 700, color: '#4a148c' }}>
                      {premiumPlan.name}
                    </Typography>
                  </Box>

                  <Box sx={{ mt: 1, display: 'flex', alignItems: 'baseline', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#8b5cf6' }}>
                      ₹{premiumPlan.price}
                    </Typography>
                    <Typography variant="body1" sx={{ ml: 1.5, textDecoration: 'line-through', color: '#6b7280' }}>
                      ₹{premiumPlan.originalPrice}
                    </Typography>
                    <PriceTag>
                      {Math.round((1 - premiumPlan.price / premiumPlan.originalPrice) * 100)}% OFF
                    </PriceTag>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: '#4a148c' }}>
                    Premium Features:
                  </Typography>

                  <Box sx={{ pl: 1 }}>
                    {premiumPlan.features.map((feature, idx) => (
                      <FeatureItem key={idx}>
                        <Star size={16} color="#8b5cf6" style={{ marginRight: '8px', minWidth: '16px' }} />
                        <Typography variant="body1">{feature}</Typography>
                      </FeatureItem>
                    ))}
                  </Box>
                </PremiumCard>

                <SummaryBox>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                    Order Summary
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: '#4b5563' }}>Premium Plan</Typography>
                    <Typography variant="body1">₹{premiumPlan.price}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body1" sx={{ color: '#4b5563' }}>GST (18%)</Typography>
                    <Typography variant="body1">₹{Math.round(premiumPlan.price * 0.18)}</Typography>
                  </Box>
                  <Divider sx={{ my: 1.5 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <Typography variant="h6">Total Amount</Typography>
                    <Typography variant="h6" sx={{ color: '#8b5cf6' }}>
                      ₹{premiumPlan.price + Math.round(premiumPlan.price * 0.18)}
                    </Typography>
                  </Box>
                </SummaryBox>

                <SecurityBox>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Shield size={18} color="#1e40af" />
                    <Typography variant="subtitle2" sx={{ ml: 1, color: '#1e40af', fontWeight: 600 }}>
                      Secure Payment
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ mt: 0.5, color: '#3b82f6' }}>
                    Your payment will be processed securely through our trusted payment gateway.
                  </Typography>
                </SecurityBox>

                <Box sx={{ mt: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        color="secondary"
                      />
                    }
                    label="I agree to the Terms & Conditions"
                  />
                </Box>

                <GradientButton
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ mt: 2, py: 1.5 }}
                  onClick={handleProceedToPayment}
                  endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <ArrowRight />}
                  disabled={loading || !agreed}
                >
                  {loading ? "Processing..." : "Proceed to Payment"}
                </GradientButton>

                <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', mt: 2, color: '#6b7280' }}>
                  By continuing, you will be redirected to our secure payment gateway.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </>
  );
}