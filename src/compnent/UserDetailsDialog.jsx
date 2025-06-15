import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Avatar,
    Typography,
    Chip,
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Paper,
    FormControlLabel,
    Switch
} from "@mui/material";
import { VerifiedUser } from "@mui/icons-material";

const UserDetailsDialog = ({
    dialogOpen,
    selectedUser,
    handleBlockUnblock,
    handleVerifyUser,
    setDialogOpen,
    getRoleColor,
    getStatusBadge
}) => {
    if (!selectedUser) return null;

    return (
        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    borderRadius: 2,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                }
            }}
        >
            <DialogTitle sx={{ pb: 1 }}>
                User Profile Details
            </DialogTitle>
            <Typography variant="body2" color="text.secondary" sx={{ px: 3 }}>
                Comprehensive info about the selected user
            </Typography>

            <Divider />
            <DialogContent>
                <Box sx={{ mb: 3 }}>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            src={selectedUser.profilePicture}
                            sx={{
                                width: 80,
                                height: 80,
                                border:
                                    selectedUser.role === "Admin"
                                        ? "3px solid #7c3aed"
                                        : selectedUser.role === "Premium"
                                            ? "3px solid #0891b2"
                                            : "none"
                            }}
                        >
                            {selectedUser.fullName?.[0]}
                        </Avatar>
                        <Box>
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="h6" fontWeight={600}>
                                    {selectedUser.fullName}
                                </Typography>
                                {selectedUser.isVerified && (
                                    <VerifiedUser
                                        fontSize="small"
                                        color="success"
                                        sx={{ verticalAlign: "middle" }}
                                    />
                                )}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                                {selectedUser.email}
                            </Typography>
                            <Box display="flex" gap={1} mt={1}>
                                <Chip
                                    label={selectedUser.role}
                                    size="small"
                                    sx={{
                                        bgcolor: `${getRoleColor(selectedUser.role)}15`,
                                        color: getRoleColor(selectedUser.role),
                                        fontWeight: 500
                                    }}
                                />
                                {getStatusBadge(selectedUser.isVerified, selectedUser.blocked)}
                            </Box>
                        </Box>
                    </Box>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Phone"
                            value={selectedUser.phone || "Not provided"}
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Gender"
                            value={selectedUser.gender || "Not provided"}
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Occupation"
                            value={selectedUser.occupation || "Not provided"}
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Qualification"
                            value={selectedUser.qualification || "Not provided"}
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Annual Income"
                            value={
                                selectedUser.annualIncome
                                    ? `₹${selectedUser.annualIncome}`
                                    : "Not provided"
                            }
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Date Joined"
                            value="Apr 05, 2025"
                            fullWidth
                            size="small"
                            variant="outlined"
                            disabled
                        />
                    </Grid>
                </Grid>

                <Box mt={3}>
                    <Typography variant="subtitle2" gutterBottom>
                        Account Controls
                    </Typography>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={!selectedUser.blocked}
                                    onChange={() =>
                                        handleBlockUnblock(selectedUser._id, !selectedUser.blocked)
                                    }
                                    color="primary"
                                />
                            }
                            label="Account Active"
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={selectedUser.isVerified}
                                    onChange={() => handleVerifyUser(selectedUser._id)}
                                    color="success"
                                    disabled={selectedUser.isVerified}
                                />
                            }
                            label="Profile Verified"
                        />
                    </Box>
                </Box>

                <Box mt={3}>
                    <Typography variant="subtitle2" gutterBottom>
                        Partner Preferences
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2, bgcolor: "#f8fafc" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Age Range
                                </Typography>
                                <Typography variant="body2">25-32 years</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Religion
                                </Typography>
                                <Typography variant="body2">Hindu</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Education
                                </Typography>
                                <Typography variant="body2">
                                    Bachelor's degree or higher
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="caption" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body2">Mumbai, Maharashtra</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Box>
            </DialogContent>
            <DialogActions sx={{ px: 3, py: 2 }}>
                <Button
                    onClick={() => setDialogOpen(false)}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                >
                    Close
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                        borderRadius: 2,
                        backgroundImage: "linear-gradient(135deg, #1e40af, #3b82f6)"
                    }}
                >
                    Edit Profile
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserDetailsDialog;
