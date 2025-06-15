import React, { useState } from "react";
import ReportIcon from "@mui/icons-material/Report";
import { 
  Button, Dialog, DialogTitle, DialogContent, DialogActions, 
  TextField, Typography, Box, Slide, IconButton, useTheme, useMediaQuery
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReportProfileButton = ({ userId, userName }) => {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
    setError("");
    setSuccess(false);
  };

  const handleClose = () => {
    setOpen(false);
    setReason("");
    // Reset states after dialog closes
    setTimeout(() => {
      setError("");
      setSuccess(false);
    }, 300);
  };

  const handleSubmit = async () => {
    if (!reason.trim()) {
      setError("Please provide a reason for reporting this profile");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      await axios.post(
        `https://collage-project-backend-j2vf.onrender.com/api/report/${userId}`,
        {
          reason: reason.trim()
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setSuccess(true);
      setReason("");
      setError("");
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Error reporting profile:", error);
      setError(
        error.response?.data?.message || 
        "Failed to report profile. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<ReportIcon />}
        onClick={handleClickOpen}
        sx={{
          fontWeight: "bold",
          borderRadius: "50px",
          backgroundColor: "#ff3d57",
          color: "white",
          "&:hover": { 
            backgroundColor: "#e01f3d",
          },
          ml: isMobile ? 0 : 1,
          mt: isMobile ? 1 : 0
        }}
      >
        Report
      </Button>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={loading ? null : handleClose}
        aria-describedby="report-profile-dialog"
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          background: "linear-gradient(135deg, #ff3d57, #ff7676)",
          color: "white",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ErrorOutlineIcon sx={{ mr: 1 }} />
            Report Profile: {userName}
          </Box>
          {!loading && (
            <IconButton 
              edge="end" 
              color="inherit" 
              onClick={handleClose} 
              aria-label="close"
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
        
        <DialogContent sx={{ pt: 3, pb: 2, mt: 1 }}>
          {success ? (
            <Box 
              sx={{ 
                textAlign: "center", 
                py: 2,
                animation: "fadeIn 0.5s ease-in-out" 
              }}
            >
              <Box 
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  backgroundColor: "#4CAF50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px auto",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Report Submitted
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Thank you for your feedback. Our admin team will review this report.
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Please provide a detailed reason for reporting this profile. This will help our admin team take appropriate action.
              </Typography>
              
              <TextField
                autoFocus
                margin="dense"
                id="reason"
                label="Reason for reporting"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={loading}
                placeholder="Please describe why you are reporting this profile..."
                error={!!error}
                helperText={error}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#ff3d57",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#ff3d57",
                  },
                }}
              />
              
              <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                Note: Misuse of the reporting system may result in account restrictions.
              </Typography>
            </>
          )}
        </DialogContent>
        
        {!success && (
          <DialogActions sx={{ px: 3, pb: 3, justifyContent: "space-between" }}>
            <Button 
              onClick={handleClose} 
              variant="outlined"
              disabled={loading}
              sx={{
                borderColor: "rgba(0,0,0,0.23)",
                color: "text.primary",
                "&:hover": {
                  borderColor: "rgba(0,0,0,0.5)",
                  backgroundColor: "rgba(0,0,0,0.04)"
                }
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: "#ff3d57",
                color: "white",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#e01f3d" },
                minWidth: "120px"
              }}
            >
              {loading ? "Submitting..." : "Submit Report"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default ReportProfileButton;