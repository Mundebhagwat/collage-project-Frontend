import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Button, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Divider,
  IconButton
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import ChatIcon from '@mui/icons-material/Chat';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

// Mock data - in a real app this would come from your API
const mockBlockData = {
  reason: "Multiple reports of inappropriate behavior from other users",
  contactEmail: "support@yourapp.com",
  contactPhone: "+1 (800) 123-4567",
  blockedUntil: "2025-05-15T00:00:00",
  userId: "USR48291",
  appealId: "APL75391"
};

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63', // Pink color typical for matrimonial apps
      light: '#f48fb1',
      dark: '#c2185b',
    },
    secondary: {
      main: '#3f51b5',
      light: '#7986cb',
      dark: '#303f9f',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    error: {
      main: '#e53935',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.95rem',
          padding: '10px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

const BlockPage = ({ blockData = mockBlockData }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [appealText, setAppealText] = useState('');
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Calculate time remaining if block is temporary
  const calculateTimeRemaining = () => {
    const blockedUntil = new Date(blockData.blockedUntil);
    const now = new Date();
    
    if (blockedUntil <= now) {
      return "Your account should be unblocked now. Please refresh or contact support.";
    }
    
    const diffTime = Math.abs(blockedUntil - now);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return `Your account will be automatically unblocked in ${diffDays} days.`;
  };
  
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  
  const handleAppealSubmit = () => {
    // In a real app, this would send the appeal to your backend
    alert('Appeal submitted successfully! Appeal ID: ' + blockData.appealId);
    setDialogOpen(false);
    setAppealText('');
  };
  
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(45deg, rgba(233, 30, 99, 0.05) 0%, rgba(63, 81, 181, 0.05) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={3}
            sx={{
              py: 6,
              px: isMobile ? 3 : 6,
              borderRadius: 3,
              position: 'relative',
              overflow: 'hidden',
              borderTop: '6px solid',
              borderColor: 'error.main',
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.04,
                backgroundImage: `repeating-linear-gradient(45deg, #e91e63, #e91e63 10px, transparent 10px, transparent 20px)`,
                zIndex: 0,
              }}
            />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* Header */}
              <Box 
                display="flex" 
                flexDirection={isMobile ? "column" : "row"}
                alignItems="center" 
                mb={4}
              >
                <Box 
                  display="flex" 
                  justifyContent="center" 
                  alignItems="center"
                  sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 70,
                    height: 70,
                    mr: isMobile ? 0 : 3,
                    mb: isMobile ? 2 : 0,
                    flexShrink: 0,
                  }}
                >
                  <LockIcon sx={{ fontSize: 40 }} />
                </Box>
                <Box textAlign={isMobile ? "center" : "left"}>
                  <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="error.main">
                    Account Blocked
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    User ID: {blockData.userId}
                  </Typography>
                </Box>
              </Box>
              
              {/* Main content */}
              <Box mb={4}>
                <Paper 
                  variant="outlined" 
                  sx={{ 
                    p: 3, 
                    borderColor: 'error.light',
                    bgcolor: 'error.lighter',
                    borderRadius: 2,
                    mb: 4,
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    alignItems: isMobile ? 'flex-start' : 'center',
                    gap: 2,
                  }}
                >
                  <ErrorOutlineIcon color="error" sx={{ fontSize: 28, flexShrink: 0 }} />
                  <Typography variant="body1">
                    <strong>Reason for block:</strong> {blockData.reason}
                  </Typography>
                </Paper>
                
                <Typography variant="body1" paragraph>
                  We're sorry, but your account has been temporarily suspended from our matrimonial platform. This action was taken to maintain a safe and respectful community for all our users.
                </Typography>
                
                <Typography variant="body1" paragraph>
                  {calculateTimeRemaining()}
                </Typography>
                
                <Typography variant="body1" paragraph>
                  If you believe this is a mistake or would like to appeal this decision, please use the appeal button below or contact our support team using the provided contact information.
                </Typography>
              </Box>
              
              {/* Contact information */}
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  mb: 4,
                }}
              >
                <Paper 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <EmailIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                    <Typography variant="body2">{blockData.contactEmail}</Typography>
                  </Box>
                </Paper>
                
                <Paper 
                  sx={{ 
                    p: 2, 
                    borderRadius: 2, 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <PhoneIcon color="primary" />
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                    <Typography variant="body2">{blockData.contactPhone}</Typography>
                  </Box>
                </Paper>
              </Box>
              
              <Divider sx={{ my: 4 }} />
              
              {/* Action buttons */}
              <Box 
                sx={{
                  display: 'flex',
                  flexDirection: isMobile ? 'column' : 'row',
                  gap: 2,
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ChatIcon />}
                  fullWidth={isMobile}
                  onClick={handleDialogOpen}
                >
                  Appeal This Decision
                </Button>
                
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth={isMobile}
                  href="/help"
                >
                  Visit Help Center
                </Button>
              </Box>
            </Box>
          </Paper>
          
          <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center" 
            sx={{ display: 'block', mt: 2 }}
          >
            © {new Date().getFullYear()} Your Matrimonial App. All rights reserved.
          </Typography>
        </Container>
      </Box>
      
      {/* Appeal Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Appeal Account Block</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            Please explain why you believe this block should be removed. Our team will review your appeal within 24-48 hours.
          </DialogContentText>
          <TextField
            autoFocus
            label="Your explanation"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={appealText}
            onChange={(e) => setAppealText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Typography variant="caption" color="text.secondary">
            Appeal ID: {blockData.appealId}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="inherit">Cancel</Button>
          <Button 
            onClick={handleAppealSubmit} 
            color="primary" 
            variant="contained"
            disabled={!appealText.trim()}
          >
            Submit Appeal
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default BlockPage;