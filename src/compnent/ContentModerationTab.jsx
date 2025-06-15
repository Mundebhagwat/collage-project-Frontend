import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  TableContainer,
  Skeleton,
  Box,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Badge,
  IconButton,
  Tooltip,
  Divider,
  Paper,
  Grid,
  Alert,
  Menu,
  MenuItem,
  Snackbar
} from "@mui/material";
import {
  CheckCircle,
  Warning,
  Person,
  Block,
  MoreVert,
  Flag,
  AccessTime,
  Visibility,
  Check,
  Close,
  Message,
  Delete,
  LockOpen
} from "@mui/icons-material";

import axios from "axios";

const ContentModerationTab = ({ loading = false }) => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [unblockDialogOpen, setUnblockDialogOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [actionMenu, setActionMenu] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });


   useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("authToken")
        const res = await axios.get("https://collage-project-backend-j2vf.onrender.com/api/report", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };

    fetchReports();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const handleDetailsOpen = (report) => {
    setSelectedReport(report);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleBlockUser = (report) => {
    setSelectedReport(report);
    setBlockDialogOpen(true);
    handleCloseMenu();
  };

  const handleUnblockUser = (report) => {
    setSelectedReport(report);
    setUnblockDialogOpen(true);
    handleCloseMenu();
  };

  const handleConfirmBlock = async () => {
    // // API call to block user
    // console.log(`Blocking user ${selectedReport?.reportedUser.fullName} for: ${blockReason}`);
    
    // // Update local state to reflect changes
    // setReports(reports.map(r => 
    //   r.id === selectedReport.id ? { ...r, status: 'blocked', blockReason } : r
    // ));
    
    // setBlockDialogOpen(false);
    // setBlockReason("");
    // setSnackbar({
    //   open: true,
    //   message: `${selectedReport?.reportedUser.fullName} has been blocked`,
    //   severity: "success"
    // });

    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `https://collage-project-backend-j2vf.onrender.com/api/admin/users/${selectedReport?.reportedUser._id}/block`,
        { block: true, reason: blockReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(reports.map(r =>
        r._id === selectedReport._id ? { ...r, status: "blocked", blockReason } : r
      ));
      setBlockDialogOpen(false);
      setBlockReason("");
      setSnackbar({
        open: true,
        message: `${selectedReport?.reportedUser.fullName} has been blocked`,
        severity: "success"
      });
    } catch (err) {
      console.error("Error blocking user:", err);
    }

  };

  const handleConfirmUnblock = async () => {
    // // API call to unblock user
    // console.log(`Unblocking user ${selectedReport?.reportedUser.fullName}`);
    
    // // Update local state to reflect changes
    // setReports(reports.map(r => 
    //   r.id === selectedReport.id ? { ...r, status: 'pending', blockReason: "" } : r
    // ));
    
    // setUnblockDialogOpen(false);
    // setSnackbar({
    //   open: true,
    //   message: `${selectedReport?.reportedUser.fullName} has been unblocked`,
    //   severity: "success"
    // });

    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `https://collage-project-backend-j2vf.onrender.com/api/admin/users/${selectedReport?.reportedUser._id}/block`,
        { block: false },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports(reports.map(r =>
        r._id === selectedReport._id ? { ...r, status: "pending", blockReason: "" } : r
      ));
      setUnblockDialogOpen(false);
      setSnackbar({
        open: true,
        message: `${selectedReport?.reportedUser.fullName} has been unblocked`,
        severity: "success"
      });
    } catch (err) {
      console.error("Error unblocking user:", err);
    }
  };

  const handleDismissReport = async (report) => {
    // // API call to dismiss report
    // console.log(`Dismissing reports for user ${report.reportedUser.fullName}`);
    
    // // Update local state to reflect changes
    // setReports(reports.filter(r => r.id !== report.id));
    // handleCloseMenu();
    // setSnackbar({
    //   open: true,
    //   message: `All reports for ${report.reportedUser.fullName} have been dismissed`,
    //   severity: "info"
    // });
    
    // if (detailsOpen) {
    //   setDetailsOpen(false);
    // }

     try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`https://collage-project-backend-j2vf.onrender.com/api/report/${report.reportedUser._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setReports(reports.filter(r => r._id !== report._id));
      setSnackbar({
        open: true,
        message: `All reports for ${report.reportedUser.fullName} have been dismissed`,
        severity: "info"
      });
      if (detailsOpen) {
        setDetailsOpen(false);
      }
    } catch (err) {
      console.error("Error dismissing report:", err);
    }
    handleCloseMenu();
  };

  const handleOpenMenu = (event, report) => {
    setActionMenu({ anchor: event.currentTarget, report });
  };

  const handleCloseMenu = () => {
    setActionMenu(null);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getRandomColor = (str) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#F9DB6D', '#9D65C9', '#5D9CEC',
      '#5E81AC', '#A3BE8C', '#B48EAD', '#EBCB8B', '#D08770'
    ];
    const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <Card
      variant="outlined"
      sx={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", borderRadius: 2 }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6">
            Content Moderation Queue
          </Typography>
          <Box display="flex" gap={1}>
            <Chip 
              icon={<Warning fontSize="small" />}
              label={`${reports.filter(r => r.status === 'pending').length} Reports Pending`}
              color="warning"
              variant="outlined"
              size="small"
            />
            <Chip 
              icon={<Block fontSize="small" />}
              label={`${reports.filter(r => r.status === 'blocked').length} Users Blocked`}
              color="error"
              variant="outlined"
              size="small"
            />
          </Box>
        </Box>
        
        {loading ? (
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f8fafc" }}>
                  <TableCell>Reported User</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Latest Report</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array(3).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Box>
                          <Skeleton width={120} />
                          <Skeleton width={100} />
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Skeleton width={80} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={180} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={100} />
                    </TableCell>
                    <TableCell>
                      <Skeleton width={120} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : reports.length > 0 ? (
          <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#f5f7fa" }}>
                  <TableCell>Reported User</TableCell>
                  <TableCell>Reported By</TableCell>
                  <TableCell>Latest Report</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} sx={{ 
                    '&:hover': { bgcolor: '#f9fafb' },
                    bgcolor: report.status === 'blocked' ? 'rgba(244, 67, 54, 0.08)' : 'inherit',
                  }}>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        {report.reportedUser.profilePicture ? (
                          <Avatar src={report.reportedUser.profilePicture} alt={report.reportedUser.fullName} />
                        ) : (
                          <Avatar sx={{ bgcolor: getRandomColor(report.reportedUser.fullName) }}>
                            {getInitials(report.reportedUser.fullName)}
                          </Avatar>
                        )}
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {report.reportedUser.fullName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {report.reportedUser.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        badgeContent={report.reportedBy.length} 
                        color="error" 
                        overlap="circular"
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      >
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            bgcolor: getRandomColor(report.reportedBy[0].userId.fullName) 
                          }}
                          alt={report.reportedBy[0].userId.fullName}
                        >
                          {getInitials(report.reportedBy[0].userId.fullName)}
                        </Avatar>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="caption" color="text.secondary" display="block">
                          <AccessTime fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
                          {formatDate(report.reportedBy[report.reportedBy.length - 1].reportedAt)}
                        </Typography>
                        <Typography variant="caption" component="div" sx={{ 
                          mt: 0.5, 
                          bgcolor: 'error.50', 
                          color: 'error.main',
                          py: 0.5,
                          px: 1,
                          borderRadius: 1,
                          display: 'inline-block'
                        }}>
                          <Flag fontSize="inherit" sx={{ mr: 0.5, verticalAlign: 'text-bottom' }} />
                          {report.reportedBy[report.reportedBy.length - 1].reason}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={report.status === 'blocked' ? 'Blocked' : 'Pending Review'} 
                        size="small"
                        color={report.status === 'blocked' ? 'error' : 'warning'}
                        icon={report.status === 'blocked' ? <Block fontSize="small" /> : <AccessTime fontSize="small" />}
                      />
                    </TableCell>
                    <TableCell>
                      <Box display="flex" gap={1}>
                        <Tooltip title="View Details">
                          <IconButton 
                            size="small" 
                            color="info"
                            onClick={() => handleDetailsOpen(report)}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        
                        {report.status === 'blocked' ? (
                          <Tooltip title="Unblock User">
                            <IconButton 
                              size="small" 
                              color="success"
                              onClick={() => handleUnblockUser(report)}
                            >
                              <LockOpen fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Block User">
                            <IconButton 
                              size="small" 
                              color="error"
                              onClick={() => handleBlockUser(report)}
                            >
                              <Block fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                        
                        <IconButton 
                          size="small"
                          aria-label="more options"
                          onClick={(e) => handleOpenMenu(e, report)}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box display="flex" flexDirection="column" alignItems="center" py={6}>
            <CheckCircle sx={{ fontSize: 64, color: "success.light", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              All content reviewed
            </Typography>
            <Typography variant="body2" color="text.disabled" align="center" sx={{ maxWidth: 400, mt: 1 }}>
              No pending items for review. When users report content or other users,
              they will appear here for moderation.
            </Typography>
          </Box>
        )}
      </CardContent>

      {/* Report Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedReport && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gap={1.5}>
                  {selectedReport.reportedUser.profilePicture ? (
                    <Avatar 
                      src={selectedReport.reportedUser.profilePicture} 
                      alt={selectedReport.reportedUser.fullName}
                      sx={{ width: 40, height: 40 }}
                    />
                  ) : (
                    <Avatar 
                      sx={{ 
                        bgcolor: getRandomColor(selectedReport.reportedUser.fullName),
                        width: 40, 
                        height: 40
                      }}
                    >
                      {getInitials(selectedReport.reportedUser.fullName)}
                    </Avatar>
                  )}
                  <Box>
                    <Typography variant="h6">
                      Reports for {selectedReport.reportedUser.fullName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {selectedReport.reportedBy.length} {selectedReport.reportedBy.length === 1 ? 'report' : 'reports'} filed
                    </Typography>
                  </Box>
                </Box>
                <Chip 
                  label={selectedReport.status === 'blocked' ? 'Blocked' : 'Pending Review'} 
                  color={selectedReport.status === 'blocked' ? 'error' : 'warning'}
                  icon={selectedReport.status === 'blocked' ? <Block fontSize="small" /> : <AccessTime fontSize="small" />}
                />
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      User Details
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    <Box mt={2}>
                      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
                        {selectedReport.reportedUser.profilePicture ? (
                          <Avatar 
                            src={selectedReport.reportedUser.profilePicture} 
                            alt={selectedReport.reportedUser.fullName}
                            sx={{ width: 80, height: 80, mb: 1 }}
                          />
                        ) : (
                          <Avatar 
                            sx={{ 
                              bgcolor: getRandomColor(selectedReport.reportedUser.fullName),
                              width: 80, 
                              height: 80,
                              mb: 1
                            }}
                          >
                            {getInitials(selectedReport.reportedUser.fullName)}
                          </Avatar>
                        )}
                        <Typography variant="subtitle1" fontWeight={600}>
                          {selectedReport.reportedUser.fullName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedReport.reportedUser.email}
                        </Typography>
                      </Box>
                      
                      {selectedReport.status === 'blocked' && (
                        <Paper
                          variant="outlined"
                          sx={{ 
                            p: 2, 
                            mt: 2, 
                            bgcolor: 'error.50',
                            borderLeft: '4px solid', 
                            borderLeftColor: 'error.main'
                          }}
                        >
                          <Typography variant="subtitle2" color="error" fontWeight={600}>
                            Block Reason:
                          </Typography>
                          <Typography variant="body2" mt={0.5}>
                            {selectedReport.blockReason || "No reason specified"}
                          </Typography>
                        </Paper>
                      )}
                      
                      <Alert 
                        severity={selectedReport.status === 'blocked' ? 'error' : 'warning'} 
                        variant="outlined" 
                        sx={{ mt: 2 }}
                      >
                        {selectedReport.status === 'blocked' 
                          ? 'This user is currently blocked' 
                          : 'This user has multiple reports against them'}
                      </Alert>
                      
                      <Box mt={3} display="flex" flexDirection="column" gap={1}>
                        {selectedReport.status === 'blocked' ? (
                          <Button 
                            variant="contained" 
                            color="success" 
                            startIcon={<LockOpen />}
                            onClick={() => handleUnblockUser(selectedReport)}
                            fullWidth
                          >
                            Unblock User
                          </Button>
                        ) : (
                          <Button 
                            variant="contained" 
                            color="error" 
                            startIcon={<Block />}
                            onClick={() => handleBlockUser(selectedReport)}
                            fullWidth
                          >
                            Block User
                          </Button>
                        )}
                        <Button 
                          variant="outlined"
                          startIcon={<Message />}
                          fullWidth
                        >
                          Message User
                        </Button>
                        <Button 
                          variant="outlined"
                          color="warning"
                          startIcon={<Delete />}
                          onClick={() => handleDismissReport(selectedReport)}
                          fullWidth
                        >
                          Dismiss All Reports
                        </Button>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                      Report History
                    </Typography>
                    <Divider sx={{ my: 1.5 }} />
                    
                    <Box>
                      {selectedReport.reportedBy.map((report, index) => (
                        <Paper 
                          key={index} 
                          variant="outlined" 
                          sx={{ 
                            p: 2, 
                            mt: 2, 
                            borderLeft: '4px solid', 
                            borderLeftColor: 'error.main',
                            bgcolor: 'background.default'
                          }}
                        >
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Box display="flex" alignItems="center" gap={1.5}>
                              {report.userId.profilePicture ? (
                                <Avatar 
                                  src={report.userId.profilePicture} 
                                  alt={report.userId.fullName}
                                  sx={{ width: 32, height: 32 }}
                                />
                              ) : (
                                <Avatar 
                                  sx={{ 
                                    bgcolor: getRandomColor(report.userId.fullName),
                                    width: 32, 
                                    height: 32
                                  }}
                                >
                                  {getInitials(report.userId.fullName)}
                                </Avatar>
                              )}
                              <Typography variant="subtitle2">
                                {report.userId.fullName}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(report.reportedAt)}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" sx={{ mt: 1, fontWeight: 500 }}>
                            Reason: {report.reason}
                          </Typography>
                        </Paper>
                      ))}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDetails} color="inherit">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Block User Dialog */}
      <Dialog open={blockDialogOpen} onClose={() => setBlockDialogOpen(false)}>
        <DialogTitle>Block User</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            You are about to block <strong>{selectedReport?.reportedUser.fullName}</strong>. 
            The user will be prevented from using the platform until manually unblocked by an administrator.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="blockReason"
            label="Reason for blocking"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={blockReason}
            onChange={(e) => setBlockReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBlockDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmBlock} color="error" variant="contained">
            Block User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Unblock User Dialog */}
      <Dialog open={unblockDialogOpen} onClose={() => setUnblockDialogOpen(false)}>
        <DialogTitle>Unblock User</DialogTitle>
        <DialogContent>
          <Typography variant="body2" paragraph>
            You are about to unblock <strong>{selectedReport?.reportedUser.fullName}</strong>. 
            This will restore their access to the platform and all features.
          </Typography>
          {selectedReport?.blockReason && (
            <Paper
              variant="outlined"
              sx={{ 
                p: 2, 
                mt: 1, 
                bgcolor: 'grey.50',
                borderLeft: '4px solid', 
                borderLeftColor: 'grey.400'
              }}
            >
              <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                Original Block Reason:
              </Typography>
              <Typography variant="body2" mt={0.5}>
                {selectedReport.blockReason}
              </Typography>
            </Paper>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUnblockDialogOpen(false)} color="inherit">Cancel</Button>
          <Button onClick={handleConfirmUnblock} color="success" variant="contained">
            Unblock User
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={actionMenu?.anchor}
        open={Boolean(actionMenu)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => {
          handleDetailsOpen(actionMenu.report);
          handleCloseMenu();
        }}>
          <Visibility fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        
        {actionMenu?.report?.status === 'blocked' ? (
          <MenuItem onClick={() => handleUnblockUser(actionMenu.report)}>
            <LockOpen fontSize="small" sx={{ mr: 1 }} />
            Unblock User
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleBlockUser(actionMenu.report)}>
            <Block fontSize="small" sx={{ mr: 1 }} />
            Block User
          </MenuItem>
        )}
        
        <Divider />
        <MenuItem onClick={() => handleDismissReport(actionMenu.report)}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Dismiss Reports
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Card>
  );
};

export default ContentModerationTab;

