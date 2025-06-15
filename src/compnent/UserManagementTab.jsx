// // UserManagementTab.jsx
// import React, { useState } from "react";
// import {
//   Card, CardContent, Box, Typography, Button, TextField, Tabs, Tab,
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   Skeleton, Chip, Avatar, Badge, IconButton, Dialog, DialogTitle,
//   DialogContent, DialogActions, Grid, Paper, Divider
// } from "@mui/material";
// import {
//   Search, FilterList, Refresh, AdminPanelSettings, Info, VerifiedUser,
//   LockOpen, Block, PeopleAlt, CheckCircle, CreditCard, School, Work,
//   Cake, Phone as PhoneIcon, Email as EmailIcon, LocationOn, Assignment
// } from "@mui/icons-material";

// const UserManagementTab = ({
//   loading,
//   filteredUsers = [],
//   roleFilter,
//   verificationFilter,
//   statusFilter,
//   searchQuery,
//   setSearchQuery,
//   setRoleFilter,
//   setVerificationFilter,
//   setStatusFilter,
//   setFilterOpen,
//   filterOpen,
//   fetchUsers,
//   openDialog,
//   handleVerifyUser,
//   handleBlockUnblock,
//   getRoleColor,
//   getStatusBadge
// }) => {
//   // New state for profile verification dialog
//   const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Function to open the verification dialog
//   const openVerifyDialog = (user) => {
//     setSelectedUser(user);
//     setVerifyDialogOpen(true);
//   };

//   // Function to close the verification dialog
//   const closeVerifyDialog = () => {
//     setVerifyDialogOpen(false);
//     setSelectedUser(null);
//   };

//   // Function to handle admin verification
//   const handleAdminVerification = () => {
//     // Call the API to update the user's adminApproved status
//     handleVerifyUser(selectedUser._id);
//     closeVerifyDialog();
//   };

//   // Function to get the admin verification badge
//   const getAdminVerificationBadge = (adminApproved) => {
//     if (adminApproved) {
//       return (
//         <Chip
//           icon={<CheckCircle fontSize="small" />}
//           label="Admin Verified"
//           size="small"
//           sx={{
//             bgcolor: '#057a55',
//             color: 'white',
//             fontWeight: 500,
//             borderRadius: 1,
//             textTransform: 'capitalize',
//             '& .MuiChip-icon': { color: 'white' }
//           }}
//         />
//       );
//     }
//     return (
//       <Chip
//         label="Not Verified"
//         size="small"
//         sx={{
//           bgcolor: '#9ca3af30',
//           color: '#6b7280',
//           fontWeight: 500,
//           borderRadius: 1,
//           textTransform: 'capitalize'
//         }}
//       />
//     );
//   };

//   return (
//     <>
//       <Card variant="outlined" sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: 2 }}>
//         <CardContent sx={{ p: 0 }}>
//           <Box bgcolor="#f8fafc" p={3} display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
//             <Box flex={1}>
//               <TextField
//                 fullWidth
//                 placeholder="Search by name or email"
//                 variant="outlined"
//                 size="small"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 InputProps={{
//                   startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
//                   sx: {
//                     borderRadius: 2,
//                     bgcolor: 'white',
//                     '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }
//                   }
//                 }}
//               />
//             </Box>

//             <Box display="flex" gap={1} flexWrap="wrap">
//               <Button onClick={() => setFilterOpen(!filterOpen)} variant="outlined" color="primary" startIcon={<FilterList />} size="small" sx={{ borderRadius: 2 }}>Filters</Button>
//               <Button onClick={fetchUsers} variant="outlined" color="primary" startIcon={<Refresh />} size="small" sx={{ borderRadius: 2 }}>Refresh</Button>
//               <Button variant="contained" color="primary" startIcon={<AdminPanelSettings />} size="small" sx={{ borderRadius: 2, backgroundImage: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}>Add User</Button>
//             </Box>
//           </Box>

//           {filterOpen && (
//             <Box p={2} bgcolor="#f1f5f9" borderTop="1px solid #e2e8f0" borderBottom="1px solid #e2e8f0" display="flex" flexWrap="wrap" gap={2}>
//               {[{
//                 label: 'Role',
//                 value: roleFilter,
//                 setter: setRoleFilter,
//                 options: ['All', 'User', 'Premium', 'Admin']
//               }, {
//                 label: 'Verification',
//                 value: verificationFilter,
//                 setter: setVerificationFilter,
//                 options: ['All', 'Verified', 'Unverified']
//               }, {
//                 label: 'Status',
//                 value: statusFilter,
//                 setter: setStatusFilter,
//                 options: ['All', 'Active', 'Blocked']
//               }].map(({ label, value, setter, options }) => (
//                 <Box key={label}>
//                   <Typography variant="caption" fontWeight="medium" display="block" mb={1}>{label}</Typography>
//                   <Tabs
//                     value={value}
//                     onChange={(e, newValue) => setter(newValue)}
//                     textColor="primary"
//                     indicatorColor="primary"
//                     variant="scrollable"
//                     scrollButtons="auto"
//                     sx={{ minHeight: '36px', '& .MuiTab-root': { minHeight: '36px', py: 0, fontSize: '0.85rem' } }}
//                   >
//                     {options.map(opt => <Tab key={opt} value={opt} label={opt} />)}
//                   </Tabs>
//                 </Box>
//               ))}
//             </Box>
//           )}

//           <TableContainer>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ bgcolor: '#f8fafc' }}>
//                   <TableCell>Profile</TableCell>
//                   <TableCell>Name</TableCell>
//                   <TableCell>Email</TableCell>
//                   <TableCell>Phone</TableCell>
//                   <TableCell>Role</TableCell>
//                   <TableCell>Status</TableCell>
//                   <TableCell>Admin Verification</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {loading ? (
//                   Array(5).fill(0).map((_, i) => (
//                     <TableRow key={i}>
//                       <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
//                       <TableCell><Skeleton width={120} /></TableCell>
//                       <TableCell><Skeleton width={180} /></TableCell>
//                       <TableCell><Skeleton width={100} /></TableCell>
//                       <TableCell><Skeleton width={80} /></TableCell>
//                       <TableCell><Skeleton width={100} /></TableCell>
//                       <TableCell><Skeleton width={100} /></TableCell>
//                       <TableCell><Skeleton width={140} /></TableCell>
//                     </TableRow>
//                   ))
//                 ) : (
//                   filteredUsers.length > 0 ? filteredUsers.map(user => (
//                     <TableRow key={user._id} hover>
//                       <TableCell>
//                         <Badge
//                           overlap="circular"
//                           anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                           badgeContent={user.role === "Premium" && <Box component="span" sx={{ width: 15, height: 15, borderRadius: '50%', bgcolor: '#0891b2', border: '2px solid white', display: 'block' }} />}
//                         >
//                           <Avatar src={user.profilePicture} sx={{ width: 40, height: 40, border: user.role === "Admin" ? '2px solid #7c3aed' : 'none' }}>{user.fullName?.[0]}</Avatar>
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="body2" fontWeight="medium">{user.fullName}</Typography>
//                         <Typography variant="caption" color="text.secondary">ID: {user._id?.substring(0, 8)}</Typography>
//                       </TableCell>
//                       <TableCell>{user.email}</TableCell>
//                       <TableCell>{user.phone}</TableCell>
//                       <TableCell>
//                         <Chip
//                           label={user.role}
//                           size="small"
//                           sx={{ bgcolor: `${getRoleColor(user.role)}15`, color: getRoleColor(user.role), fontWeight: 500, borderRadius: 1 }}
//                         />
//                       </TableCell>
//                       <TableCell>{getStatusBadge(user.isVerified, user.blocked)}</TableCell>
//                       <TableCell>{getAdminVerificationBadge(user.adminApproved)}</TableCell>
//                       <TableCell>
//                         <Box display="flex" gap={1}>
//                           <IconButton 
//                             size="small" 
//                             onClick={() => openDialog(user)} 
//                             sx={{ color: '#0284c7', bgcolor: '#e0f2fe', '&:hover': { bgcolor: '#bae6fd' } }}
//                             title="View Info"
//                           >
//                             <Info fontSize="small" />
//                           </IconButton>
                          
//                           {!user.adminApproved && !user.blocked && (
//                             <IconButton 
//                               size="small" 
//                               onClick={() => openVerifyDialog(user)} 
//                               sx={{ color: '#059669', bgcolor: '#d1fae5', '&:hover': { bgcolor: '#a7f3d0' } }}
//                               title="Verify Profile"
//                             >
//                               <VerifiedUser fontSize="small" />
//                             </IconButton>
//                           )}
                          
//                           <IconButton 
//                             size="small" 
//                             onClick={() => handleBlockUnblock(user._id, !user.blocked)} 
//                             sx={{ color: user.blocked ? '#059669' : '#dc2626', bgcolor: user.blocked ? '#d1fae5' : '#fee2e2', '&:hover': { bgcolor: user.blocked ? '#a7f3d0' : '#fecaca' } }}
//                             title={user.blocked ? "Unblock User" : "Block User"}
//                           >
//                             {user.blocked ? <LockOpen fontSize="small" /> : <Block fontSize="small" />}
//                           </IconButton>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   )) : (
//                     <TableRow>
//                       <TableCell colSpan={8} align="center" sx={{ py: 4 }}>
//                         <Box display="flex" flexDirection="column" alignItems="center">
//                           <PeopleAlt sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//                           <Typography variant="h6" color="text.secondary">No users found</Typography>
//                           <Typography variant="body2" color="text.disabled">Try adjusting your search or filters</Typography>
//                         </Box>
//                       </TableCell>
//                     </TableRow>
//                   )
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       {/* Profile Verification Dialog */}
//       <Dialog 
//         open={verifyDialogOpen} 
//         onClose={closeVerifyDialog} 
//         maxWidth="md" 
//         fullWidth
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
//             overflow: 'hidden'
//           }
//         }}
//       >
//         <DialogTitle sx={{ 
//           bgcolor: '#1e40af',
//           color: 'white', 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 1,
//           p: 2
//         }}>
//           <VerifiedUser /> Profile Verification
//         </DialogTitle>
        
//         <DialogContent sx={{ p: 0 }}>
//           {selectedUser && (
//             <>
//               <Box sx={{ bgcolor: '#f0f9ff', p: 2, borderBottom: '1px solid #e2e8f0' }}>
//                 <Box display="flex" alignItems="center" gap={2}>
//                   <Avatar 
//                     src={selectedUser.profilePicture} 
//                     sx={{ 
//                       width: 64, 
//                       height: 64,
//                       border: '2px solid white',
//                       boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                     }}
//                   >
//                     {selectedUser.fullName?.[0]}
//                   </Avatar>
//                   <Box>
//                     <Typography variant="h6" fontWeight="bold">{selectedUser.fullName}</Typography>
//                     <Box display="flex" alignItems="center" gap={0.5}>
//                       <EmailIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.secondary">{selectedUser.email}</Typography>
//                     </Box>
//                     <Box display="flex" alignItems="center" gap={0.5}>
//                       <PhoneIcon fontSize="small" color="action" />
//                       <Typography variant="body2" color="text.secondary">{selectedUser.phone}</Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
              
//               <Box p={3}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Assignment color="primary" fontSize="small" /> Verification Requirements
//                 </Typography>
                
//                 <Grid container spacing={3} sx={{ mt: 1 }}>
//                   <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
//                       <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
//                         Personal Information
//                       </Typography>
                      
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Full Name</Typography>
//                           <Typography variant="body2" fontWeight="medium">{selectedUser.fullName}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Gender</Typography>
//                           <Typography variant="body2">{selectedUser.gender}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
//                           <Typography variant="body2">{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Religion / Caste</Typography>
//                           <Typography variant="body2">{selectedUser.religion} / {selectedUser.caste}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Gothra</Typography>
//                           <Typography variant="body2">{selectedUser.gothra || 'Not specified'}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Rashi</Typography>
//                           <Typography variant="body2">{selectedUser.rashi || 'Not specified'}</Typography>
//                         </Grid>
//                       </Grid>
//                     </Paper>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
//                       <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
//                         Basic Details
//                       </Typography>
                      
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Blood Group</Typography>
//                           <Typography variant="body2">{selectedUser.bloodGroup || 'Not specified'}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Height</Typography>
//                           <Typography variant="body2">{selectedUser.height ? `${selectedUser.height} cm` : 'Not specified'}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Weight</Typography>
//                           <Typography variant="body2">{selectedUser.weight ? `${selectedUser.weight} kg` : 'Not specified'}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Mother Tongue</Typography>
//                           <Typography variant="body2">{selectedUser.motherTongue || 'Not specified'}</Typography>
//                         </Grid>
//                       </Grid>
//                     </Paper>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
//                       <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Work fontSize="small" /> Career & Education
//                       </Typography>
                      
//                       <Grid container spacing={2}>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Qualification</Typography>
//                           <Typography variant="body2">{selectedUser.qualification || 'Not specified'}</Typography>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <Typography variant="caption" color="text.secondary">Occupation</Typography>
//                           <Typography variant="body2">{selectedUser.occupation}</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Typography variant="caption" color="text.secondary">Annual Income</Typography>
//                           <Typography variant="body2" fontWeight="medium">₹ {selectedUser.annualIncome?.toLocaleString() || 'Not specified'}</Typography>
//                         </Grid>
//                       </Grid>
//                     </Paper>
//                   </Grid>
                  
//                   <Grid item xs={12} md={6}>
//                     <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
//                       <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <LocationOn fontSize="small" /> Address Information
//                       </Typography>
                      
//                       <Grid container spacing={2}>
//                         <Grid item xs={12}>
//                           <Typography variant="caption" color="text.secondary">Current Address</Typography>
//                           <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{selectedUser.currentAddress}</Typography>
//                         </Grid>
//                         <Grid item xs={12}>
//                           <Typography variant="caption" color="text.secondary">Permanent Address</Typography>
//                           <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{selectedUser.permanentAddress}</Typography>
//                         </Grid>
//                       </Grid>
//                     </Paper>
//                   </Grid>
                  
//                   <Grid item xs={12}>
//                     <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#fffbeb' }}>
//                       <Typography variant="subtitle2" fontWeight="bold" color="#d97706" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <CreditCard fontSize="small" /> ID Verification
//                       </Typography>
                      
//                       <Box mt={2} mb={1} p={2} sx={{ 
//                         border: '1px dashed #d97706', 
//                         borderRadius: 2,
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                       }}>
//                         {selectedUser.aadharCardPhoto ? (
//                           <Box sx={{ 
//                             width: '100%', 
//                             maxHeight: '240px', 
//                             overflow: 'hidden',
//                             borderRadius: 1,
//                             textAlign: 'center',
//                             position: 'relative'
//                           }}>
//                             <img 
//                               src={selectedUser.aadharCardPhoto} 
//                               alt="Aadhar Card" 
//                               style={{ 
//                                 maxWidth: '100%',
//                                 maxHeight: '240px',
//                                 objectFit: 'contain'
//                               }} 
//                             />
//                           </Box>
//                         ) : (
//                           <Box sx={{ textAlign: 'center', py: 4 }}>
//                             <Typography color="text.secondary">No Aadhar Card uploaded</Typography>
//                           </Box>
//                         )}
//                       </Box>
                      
//                       <Typography variant="caption" color="text.secondary">
//                         Please verify that the Aadhar Card information matches with the profile details above.
//                       </Typography>
//                     </Paper>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </>
//           )}
//         </DialogContent>
        
//         <DialogActions sx={{ p: 2, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
//           <Button 
//             onClick={closeVerifyDialog} 
//             variant="outlined" 
//             color="inherit"
//             sx={{ borderRadius: 2 }}
//           >
//             Cancel
//           </Button>
//           <Button 
//             onClick={handleAdminVerification}
//             variant="contained" 
//             color="primary"
//             sx={{ 
//               borderRadius: 2, 
//               bgcolor: '#059669',
//               '&:hover': { bgcolor: '#047857' }
//             }}
//             startIcon={<CheckCircle />}
//             disabled={!selectedUser?.aadharCardPhoto}
//           >
//             Verify Profile
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default UserManagementTab;



// UserManagementTab.jsx
import React, { useState } from "react";
import {
  Card, CardContent, Box, Typography, Button, TextField, Tabs, Tab,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Skeleton, Chip, Avatar, Badge, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Paper, Divider
} from "@mui/material";
import {
  Search, FilterList, Refresh, AdminPanelSettings, Info, VerifiedUser,
  LockOpen, Block, PeopleAlt, CheckCircle, CreditCard, School, Work,
  Cake, Phone as PhoneIcon, Email as EmailIcon, LocationOn, Assignment,
  Star, StarBorder
} from "@mui/icons-material";

const UserManagementTab = ({
  loading,
  filteredUsers = [],
  roleFilter,
  verificationFilter,
  statusFilter,
  searchQuery,
  setSearchQuery,
  setRoleFilter,
  setVerificationFilter,
  setStatusFilter,
  setFilterOpen,
  filterOpen,
  fetchUsers,
  openDialog,
  handleVerifyUser,
  handleBlockUnblock,
  getRoleColor,
  getStatusBadge
}) => {
  // New state for profile verification dialog
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Function to open the verification dialog
  const openVerifyDialog = (user) => {
    setSelectedUser(user);
    setVerifyDialogOpen(true);
  };

  // Function to close the verification dialog
  const closeVerifyDialog = () => {
    setVerifyDialogOpen(false);
    setSelectedUser(null);
  };

  // Function to handle admin verification
  const handleAdminVerification = () => {
    // Call the API to update the user's adminApproved status
    handleVerifyUser(selectedUser._id);
    closeVerifyDialog();
  };

  // Function to get the admin verification badge
  const getAdminVerificationBadge = (adminApproved) => {
    if (adminApproved) {
      return (
        <Chip
          icon={<CheckCircle fontSize="small" />}
          label="Admin Verified"
          size="small"
          sx={{
            bgcolor: '#057a55',
            color: 'white',
            fontWeight: 500,
            borderRadius: 1,
            textTransform: 'capitalize',
            '& .MuiChip-icon': { color: 'white' }
          }}
        />
      );
    }
    return (
      <Chip
        label="Not Verified"
        size="small"
        sx={{
          bgcolor: '#9ca3af30',
          color: '#6b7280',
          fontWeight: 500,
          borderRadius: 1,
          textTransform: 'capitalize'
        }}
      />
    );
  };

  // Function to get membership badge with enhanced styling
  const getMembershipBadge = (membership) => {
    if (membership === 'premium') {
      return (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5 
        }}>
          <Chip
            icon={<Star sx={{ color: '#FFD700 !important' }} />}
            label="Premium"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #5B21B6, #8B5CF6)',
              color: 'white',
              fontWeight: 600,
              borderRadius: 1,
              boxShadow: '0 2px 4px rgba(91, 33, 182, 0.25)',
              textTransform: 'capitalize',
              '& .MuiChip-icon': { color: '#FFD700' }
            }}
          />
        </Box>
      );
    }
    return (
      <Chip
        icon={<StarBorder />}
        label="Free"
        size="small"
        sx={{
          bgcolor: '#F3F4F6',
          color: '#6B7280',
          fontWeight: 500,
          borderRadius: 1,
          textTransform: 'capitalize',
          border: '1px solid #E5E7EB'
        }}
      />
    );
  };

  return (
    <>
      <Card variant="outlined" sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: 2 }}>
        <CardContent sx={{ p: 0 }}>
          <Box bgcolor="#f8fafc" p={3} display="flex" justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
            <Box flex={1}>
              <TextField
                fullWidth
                placeholder="Search by name or email"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
                  sx: {
                    borderRadius: 2,
                    bgcolor: 'white',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }
                  }
                }}
              />
            </Box>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Button onClick={() => setFilterOpen(!filterOpen)} variant="outlined" color="primary" startIcon={<FilterList />} size="small" sx={{ borderRadius: 2 }}>Filters</Button>
              <Button onClick={fetchUsers} variant="outlined" color="primary" startIcon={<Refresh />} size="small" sx={{ borderRadius: 2 }}>Refresh</Button>
              <Button variant="contained" color="primary" startIcon={<AdminPanelSettings />} size="small" sx={{ borderRadius: 2, backgroundImage: 'linear-gradient(135deg, #1e40af, #3b82f6)' }}>Add User</Button>
            </Box>
          </Box>

          {filterOpen && (
            <Box p={2} bgcolor="#f1f5f9" borderTop="1px solid #e2e8f0" borderBottom="1px solid #e2e8f0" display="flex" flexWrap="wrap" gap={2}>
              {[{
                label: 'Role',
                value: roleFilter,
                setter: setRoleFilter,
                options: ['All', 'User', 'Premium', 'Admin']
              }, {
                label: 'Verification',
                value: verificationFilter,
                setter: setVerificationFilter,
                options: ['All', 'Verified', 'Unverified']
              }, {
                label: 'Status',
                value: statusFilter,
                setter: setStatusFilter,
                options: ['All', 'Active', 'Blocked']
              }].map(({ label, value, setter, options }) => (
                <Box key={label}>
                  <Typography variant="caption" fontWeight="medium" display="block" mb={1}>{label}</Typography>
                  <Tabs
                    value={value}
                    onChange={(e, newValue) => setter(newValue)}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{ minHeight: '36px', '& .MuiTab-root': { minHeight: '36px', py: 0, fontSize: '0.85rem' } }}
                  >
                    {options.map(opt => <Tab key={opt} value={opt} label={opt} />)}
                  </Tabs>
                </Box>
              ))}
            </Box>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8fafc' }}>
                  <TableCell>Profile</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Membership</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Admin Verification</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
                      <TableCell><Skeleton width={120} /></TableCell>
                      <TableCell><Skeleton width={180} /></TableCell>
                      <TableCell><Skeleton width={100} /></TableCell>
                      <TableCell><Skeleton width={80} /></TableCell>
                      <TableCell><Skeleton width={100} /></TableCell>
                      <TableCell><Skeleton width={100} /></TableCell>
                      <TableCell><Skeleton width={100} /></TableCell>
                      <TableCell><Skeleton width={140} /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  filteredUsers.length > 0 ? filteredUsers.map(user => (
                    <TableRow key={user._id} hover>
                      <TableCell>
                        <Badge
                          overlap="circular"
                          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                          badgeContent={user.membership === "premium" && 
                            <Box 
                              component="span" 
                              sx={{ 
                                width: 16, 
                                height: 16, 
                                borderRadius: '50%', 
                                background: 'linear-gradient(135deg, #8B5CF6, #5B21B6)',
                                border: '2px solid white', 
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Star sx={{ fontSize: 10, color: '#FFD700' }} />
                            </Box>
                          }
                        >
                          <Avatar 
                            src={user.profilePicture} 
                            sx={{ 
                              width: 40, 
                              height: 40, 
                              border: user.role === "Admin" ? '2px solid #7c3aed' : 
                                     user.membership === "premium" ? '2px solid #8B5CF6' : 'none',
                              boxShadow: user.membership === "premium" ? '0 0 0 2px rgba(139, 92, 246, 0.2)' : 'none'
                            }}
                          >
                            {user.fullName?.[0]}
                          </Avatar>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">{user.fullName}</Typography>
                        <Typography variant="caption" color="text.secondary">ID: {user._id?.substring(0, 8)}</Typography>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.role}
                          size="small"
                          sx={{ bgcolor: `${getRoleColor(user.role)}15`, color: getRoleColor(user.role), fontWeight: 500, borderRadius: 1 }}
                        />
                      </TableCell>
                      <TableCell>{getMembershipBadge(user.membership)}</TableCell>
                      <TableCell>{getStatusBadge(user.isVerified, user.blocked)}</TableCell>
                      <TableCell>{getAdminVerificationBadge(user.adminApproved)}</TableCell>
                      <TableCell>
                        <Box display="flex" gap={1}>
                          <IconButton 
                            size="small" 
                            onClick={() => openDialog(user)} 
                            sx={{ color: '#0284c7', bgcolor: '#e0f2fe', '&:hover': { bgcolor: '#bae6fd' } }}
                            title="View Info"
                          >
                            <Info fontSize="small" />
                          </IconButton>
                          
                          {!user.adminApproved && !user.blocked && (
                            <IconButton 
                              size="small" 
                              onClick={() => openVerifyDialog(user)} 
                              sx={{ color: '#059669', bgcolor: '#d1fae5', '&:hover': { bgcolor: '#a7f3d0' } }}
                              title="Verify Profile"
                            >
                              <VerifiedUser fontSize="small" />
                            </IconButton>
                          )}
                          
                          <IconButton 
                            size="small" 
                            onClick={() => handleBlockUnblock(user._id, !user.blocked)} 
                            sx={{ color: user.blocked ? '#059669' : '#dc2626', bgcolor: user.blocked ? '#d1fae5' : '#fee2e2', '&:hover': { bgcolor: user.blocked ? '#a7f3d0' : '#fecaca' } }}
                            title={user.blocked ? "Unblock User" : "Block User"}
                          >
                            {user.blocked ? <LockOpen fontSize="small" /> : <Block fontSize="small" />}
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={9} align="center" sx={{ py: 4 }}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                          <PeopleAlt sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                          <Typography variant="h6" color="text.secondary">No users found</Typography>
                          <Typography variant="body2" color="text.disabled">Try adjusting your search or filters</Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Profile Verification Dialog */}
      <Dialog 
        open={verifyDialogOpen} 
        onClose={closeVerifyDialog} 
        maxWidth="md" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle sx={{ 
          bgcolor: '#1e40af',
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          p: 2
        }}>
          <VerifiedUser /> Profile Verification
        </DialogTitle>
        
        <DialogContent sx={{ p: 0 }}>
          {selectedUser && (
            <>
              <Box sx={{ bgcolor: '#f0f9ff', p: 2, borderBottom: '1px solid #e2e8f0' }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={selectedUser.membership === "premium" && 
                      <Box 
                        component="span" 
                        sx={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          background: 'linear-gradient(135deg, #8B5CF6, #5B21B6)',
                          border: '2px solid white', 
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Star sx={{ fontSize: 12, color: '#FFD700' }} />
                      </Box>
                    }
                  >
                    <Avatar 
                      src={selectedUser.profilePicture} 
                      sx={{ 
                        width: 64, 
                        height: 64,
                        border: selectedUser.membership === "premium" ? '2px solid #8B5CF6' : '2px solid white',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      {selectedUser.fullName?.[0]}
                    </Avatar>
                  </Badge>
                  <Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6" fontWeight="bold">{selectedUser.fullName}</Typography>
                      {selectedUser.membership === "premium" && (
                        <Chip
                          icon={<Star sx={{ color: '#FFD700 !important' }} />}
                          label="Premium"
                          size="small"
                          sx={{
                            background: 'linear-gradient(135deg, #5B21B6, #8B5CF6)',
                            color: 'white',
                            fontWeight: 600,
                            height: '20px',
                            '& .MuiChip-label': {
                              paddingLeft: '4px',
                              paddingRight: '6px',
                              fontSize: '0.65rem'
                            },
                            '& .MuiChip-icon': { 
                              color: '#FFD700',
                              fontSize: '0.75rem',
                              marginLeft: '4px'
                            }
                          }}
                        />
                      )}
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <EmailIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{selectedUser.email}</Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={0.5}>
                      <PhoneIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">{selectedUser.phone}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              
              <Box p={3}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Assignment color="primary" fontSize="small" /> Verification Requirements
                </Typography>
                
                <Grid container spacing={3} sx={{ mt: 1 }}>
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                        Personal Information
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Full Name</Typography>
                          <Typography variant="body2" fontWeight="medium">{selectedUser.fullName}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Gender</Typography>
                          <Typography variant="body2">{selectedUser.gender}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Date of Birth</Typography>
                          <Typography variant="body2">{new Date(selectedUser.dateOfBirth).toLocaleDateString()}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Religion / Caste</Typography>
                          <Typography variant="body2">{selectedUser.religion} / {selectedUser.caste}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Gothra</Typography>
                          <Typography variant="body2">{selectedUser.gothra || 'Not specified'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Rashi</Typography>
                          <Typography variant="body2">{selectedUser.rashi || 'Not specified'}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom>
                        Basic Details
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Blood Group</Typography>
                          <Typography variant="body2">{selectedUser.bloodGroup || 'Not specified'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Height</Typography>
                          <Typography variant="body2">{selectedUser.height ? `${selectedUser.height} cm` : 'Not specified'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Weight</Typography>
                          <Typography variant="body2">{selectedUser.weight ? `${selectedUser.weight} kg` : 'Not specified'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Mother Tongue</Typography>
                          <Typography variant="body2">{selectedUser.motherTongue || 'Not specified'}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Work fontSize="small" /> Career & Education
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Qualification</Typography>
                          <Typography variant="body2">{selectedUser.qualification || 'Not specified'}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="caption" color="text.secondary">Occupation</Typography>
                          <Typography variant="body2">{selectedUser.occupation}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="caption" color="text.secondary">Annual Income</Typography>
                          <Typography variant="body2" fontWeight="medium">₹ {selectedUser.annualIncome?.toLocaleString() || 'Not specified'}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, height: '100%' }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="primary" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn fontSize="small" /> Address Information
                      </Typography>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Typography variant="caption" color="text.secondary">Current Address</Typography>
                          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{selectedUser.currentAddress}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography variant="caption" color="text.secondary">Permanent Address</Typography>
                          <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>{selectedUser.permanentAddress}</Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Paper elevation={0} sx={{ p: 2, border: '1px solid #e2e8f0', borderRadius: 2, bgcolor: '#fffbeb' }}>
                      <Typography variant="subtitle2" fontWeight="bold" color="#d97706" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CreditCard fontSize="small" /> ID Verification
                      </Typography>
                      
                      <Box mt={2} mb={1} p={2} sx={{ 
                        border: '1px dashed #d97706', 
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {selectedUser.aadharCardPhoto ? (
                          <Box sx={{ 
                            width: '100%', 
                            maxHeight: '240px', 
                            overflow: 'hidden',
                            borderRadius: 1,
                            textAlign: 'center',
                            position: 'relative'
                          }}>
                            <img 
                              src={selectedUser.aadharCardPhoto} 
                              alt="Aadhar Card" 
                              style={{ 
                                maxWidth: '100%',
                                maxHeight: '240px',
                                objectFit: 'contain'
                              }} 
                            />
                          </Box>
                        ) : (
                          <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography color="text.secondary">No Aadhar Card uploaded</Typography>
                          </Box>
                        )}
                      </Box>
                      
                      <Typography variant="caption" color="text.secondary">
                        Please verify that the Aadhar Card information matches with the profile details above.
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Box>
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2, bgcolor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
          <Button 
            onClick={closeVerifyDialog} 
            variant="outlined" 
            color="inherit"
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAdminVerification}
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 2, 
              bgcolor: '#059669',
              '&:hover': { bgcolor: '#047857' }
            }}
            startIcon={<CheckCircle />}
            disabled={!selectedUser?.aadharCardPhoto}
          >
            Verify Profile
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserManagementTab;