// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Card, CardContent, Box, Typography, Button, TextField, Tabs, Tab,
//   Paper, Avatar, Chip, Table, TableBody, TableCell, TableContainer,
//   TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions,
//   Skeleton, Badge, Grid, IconButton, Divider, Switch, FormControlLabel
// } from "@mui/material";
// import {
//   Shield, PersonOff, AdminPanelSettings, Search, Refresh, PeopleAlt,
//   LockOpen, Block, Info, VerifiedUser, FilterList, Dashboard,
//   Message, CreditCard, CheckCircle, Warning, Settings, Analytics
// } from "@mui/icons-material";
// import { motion } from "framer-motion";

// // Dashboard Analytics Card Component
// const StatCard = ({ icon, title, value, color, increase }) => (
//   <Card sx={{
//     height: '100%',
//     background: `linear-gradient(135deg, ${color}15, ${color}05)`,
//     border: `1px solid ${color}30`,
//     boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
//     transition: 'transform 0.3s, box-shadow 0.3s',
//     '&:hover': {
//       transform: 'translateY(-5px)',
//       boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
//     }
//   }}>
//     <CardContent>
//       <Box display="flex" alignItems="center" justifyContent="space-between">
//         <Box>
//           <Typography variant="body2" color="text.secondary">{title}</Typography>
//           <Typography variant="h4" fontWeight="bold" my={1}>{value}</Typography>
//           <Typography variant="caption" color={increase >= 0 ? "success.main" : "error.main"}>
//             {increase >= 0 ? '+' : ''}{increase}% from last month
//           </Typography>
//         </Box>
//         <Avatar
//           sx={{
//             bgcolor: `${color}20`,
//             color: color,
//             width: 56,
//             height: 56,
//             boxShadow: `0 0 0 8px ${color}10`
//           }}
//         >
//           {icon}
//         </Avatar>
//       </Box>
//     </CardContent>
//   </Card>
// );

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [roleFilter, setRoleFilter] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState(0);
//   const [filterOpen, setFilterOpen] = useState(false);
//   const [verificationFilter, setVerificationFilter] = useState("All");
//   const [statusFilter, setStatusFilter] = useState("All");

//   // Mock summary data for demonstration
//   const summaryData = {
//     totalUsers: 1256,
//     premiumUsers: 348,
//     pendingVerifications: 78,
//     newUsersToday: 24,
//     totalMatches: 532,
//     activeChats: 156
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     setLoading(true);
//     try {
//       // For demo purposes - replace with actual API endpoint
//       const token = localStorage.getItem("authToken");
//       const res = await axios.get("http://localhost:5000/api/admin/users", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setUsers(res.data);
//       setTimeout(() => setLoading(false), 600);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       setLoading(false);
//     }
//   };

//   const handleBlockUnblock = async (userId, shouldBlock) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.patch(`http://localhost:5000/api/admin/users/${userId}/block`,
//         { block: shouldBlock },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       fetchUsers();
//     } catch (error) {
//       console.error("Error updating block status:", error);
//     }
//   };

//   const handleVerifyUser = async (userId) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.patch(`http://localhost:5000/api/admin/users/${userId}/verify`,
//         { verified: true },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       fetchUsers();
//     } catch (error) {
//       console.error("Error verifying user:", error);
//     }
//   };

//   const openDialog = (user) => {
//     setSelectedUser(user);
//     setDialogOpen(true);
//   };

//   const filteredUsers = users
//     .filter(user => roleFilter === "All" || user.role === roleFilter)
//     .filter(user => verificationFilter === "All" ||
//       (verificationFilter === "Verified" && user.isVerified) ||
//       (verificationFilter === "Unverified" && !user.isVerified))
//     .filter(user => statusFilter === "All" ||
//       (statusFilter === "Blocked" && user.blocked) ||
//       (statusFilter === "Active" && !user.blocked))
//     .filter(user =>
//       searchQuery === "" ||
//       user.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       user.email?.toLowerCase().includes(searchQuery.toLowerCase())
//     );

//   const getRoleColor = (role) => {
//     switch (role) {
//       case "Admin": return "#7c3aed";
//       case "Premium": return "#0891b2";
//       case "User": return "#0284c7";
//       default: return "#64748b";
//     }
//   };

//   const getStatusBadge = (isVerified, blocked) => {
//     if (blocked) {
//       return <Chip
//         icon={<PersonOff />}
//         label="Blocked"
//         size="small"
//         color="error"
//         variant="outlined"
//       />;
//     }

//     if (isVerified) {
//       return <Chip
//         icon={<CheckCircle />}
//         label="Verified"
//         size="small"
//         color="success"
//         variant="outlined"
//       />;
//     }

//     return <Chip
//       icon={<Warning />}
//       label="Pending"
//       size="small"
//       color="warning"
//       variant="outlined"
//     />;
//   };

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case 0: // Users Management
//         return (
//           <Card variant="outlined" sx={{
//             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
//             borderRadius: 2,
//             overflow: 'hidden'
//           }}>
//             <CardContent sx={{ p: 0 }}>
//               <Box
//                 bgcolor="#f8fafc"
//                 p={3}
//                 display="flex"
//                 justifyContent="space-between"
//                 alignItems={{ xs: 'flex-start', sm: 'center' }}
//                 flexDirection={{ xs: 'column', sm: 'row' }}
//                 gap={2}
//               >
//                 <Box flex={1}>
//                   <TextField
//                     fullWidth
//                     placeholder="Search by name or email"
//                     variant="outlined"
//                     size="small"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     InputProps={{
//                       startAdornment: <Search sx={{ color: 'text.secondary', mr: 1 }} />,
//                       sx: {
//                         borderRadius: 2,
//                         bgcolor: 'white',
//                         '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }
//                       }
//                     }}
//                   />
//                 </Box>

//                 <Box display="flex" gap={1} flexWrap="wrap">
//                   <Button
//                     onClick={() => setFilterOpen(!filterOpen)}
//                     variant="outlined"
//                     color="primary"
//                     startIcon={<FilterList />}
//                     size="small"
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Filters
//                   </Button>
//                   <Button
//                     onClick={fetchUsers}
//                     variant="outlined"
//                     color="primary"
//                     startIcon={<Refresh />}
//                     size="small"
//                     sx={{ borderRadius: 2 }}
//                   >
//                     Refresh
//                   </Button>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     startIcon={<AdminPanelSettings />}
//                     size="small"
//                     sx={{
//                       borderRadius: 2,
//                       backgroundImage: 'linear-gradient(135deg, #1e40af, #3b82f6)'
//                     }}
//                   >
//                     Add User
//                   </Button>
//                 </Box>
//               </Box>

//               {filterOpen && (
//                 <Box
//                   p={2}
//                   bgcolor="#f1f5f9"
//                   borderTop="1px solid #e2e8f0"
//                   borderBottom="1px solid #e2e8f0"
//                   display="flex"
//                   flexWrap="wrap"
//                   gap={2}
//                 >
//                   <Box>
//                     <Typography variant="caption" fontWeight="medium" display="block" mb={1}>
//                       Role
//                     </Typography>
//                     <Tabs
//                       value={roleFilter}
//                       onChange={(e, newValue) => setRoleFilter(newValue)}
//                       textColor="primary"
//                       indicatorColor="primary"
//                       variant="scrollable"
//                       scrollButtons="auto"
//                       sx={{
//                         minHeight: '36px',
//                         '& .MuiTab-root': {
//                           minHeight: '36px',
//                           py: 0,
//                           fontSize: '0.85rem'
//                         }
//                       }}
//                     >
//                       <Tab value="All" label="All" />
//                       <Tab value="User" label="Regular" />
//                       <Tab value="Premium" label="Premium" />
//                       <Tab value="Admin" label="Admins" />
//                     </Tabs>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" fontWeight="medium" display="block" mb={1}>
//                       Verification
//                     </Typography>
//                     <Tabs
//                       value={verificationFilter}
//                       onChange={(e, newValue) => setVerificationFilter(newValue)}
//                       textColor="primary"
//                       indicatorColor="primary"
//                       variant="scrollable"
//                       scrollButtons="auto"
//                       sx={{
//                         minHeight: '36px',
//                         '& .MuiTab-root': {
//                           minHeight: '36px',
//                           py: 0,
//                           fontSize: '0.85rem'
//                         }
//                       }}
//                     >
//                       <Tab value="All" label="All" />
//                       <Tab value="Verified" label="Verified" />
//                       <Tab value="Unverified" label="Pending" />
//                     </Tabs>
//                   </Box>

//                   <Box>
//                     <Typography variant="caption" fontWeight="medium" display="block" mb={1}>
//                       Status
//                     </Typography>
//                     <Tabs
//                       value={statusFilter}
//                       onChange={(e, newValue) => setStatusFilter(newValue)}
//                       textColor="primary"
//                       indicatorColor="primary"
//                       variant="scrollable"
//                       scrollButtons="auto"
//                       sx={{
//                         minHeight: '36px',
//                         '& .MuiTab-root': {
//                           minHeight: '36px',
//                           py: 0,
//                           fontSize: '0.85rem'
//                         }
//                       }}
//                     >
//                       <Tab value="All" label="All" />
//                       <Tab value="Active" label="Active" />
//                       <Tab value="Blocked" label="Blocked" />
//                     </Tabs>
//                   </Box>
//                 </Box>
//               )}

//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: '#f8fafc' }}>
//                       <TableCell>Profile</TableCell>
//                       <TableCell>Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Phone</TableCell>
//                       <TableCell>Role</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {loading ? (
//                       Array(5).fill(0).map((_, i) => (
//                         <TableRow key={i}>
//                           <TableCell><Skeleton variant="circular" width={40} height={40} /></TableCell>
//                           <TableCell><Skeleton width={120} /></TableCell>
//                           <TableCell><Skeleton width={180} /></TableCell>
//                           <TableCell><Skeleton width={100} /></TableCell>
//                           <TableCell><Skeleton width={80} /></TableCell>
//                           <TableCell><Skeleton width={100} /></TableCell>
//                           <TableCell><Skeleton width={140} /></TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       filteredUsers.length > 0 ? filteredUsers.map(user => (
//                         <TableRow key={user._id} hover>
//                           <TableCell>
//                             <Badge
//                               overlap="circular"
//                               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                               badgeContent={
//                                 user.role === "Premium" &&
//                                 <Box
//                                   component="span"
//                                   sx={{
//                                     width: 15,
//                                     height: 15,
//                                     borderRadius: '50%',
//                                     bgcolor: '#0891b2',
//                                     border: '2px solid white',
//                                     display: 'block'
//                                   }}
//                                 />
//                               }
//                             >
//                               <Avatar
//                                 src={user.profilePicture}
//                                 sx={{
//                                   width: 40,
//                                   height: 40,
//                                   border: user.role === "Admin" ? '2px solid #7c3aed' : 'none'
//                                 }}
//                               >
//                                 {user.fullName?.[0]}
//                               </Avatar>
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <Typography variant="body2" fontWeight="medium">{user.fullName}</Typography>
//                             <Typography variant="caption" color="text.secondary">ID: {user._id?.substring(0, 8)}</Typography>
//                           </TableCell>
//                           <TableCell>{user.email}</TableCell>
//                           <TableCell>{user.phone}</TableCell>
//                           <TableCell>
//                             <Chip
//                               label={user.role}
//                               size="small"
//                               sx={{
//                                 bgcolor: `${getRoleColor(user.role)}15`,
//                                 color: getRoleColor(user.role),
//                                 fontWeight: 500,
//                                 borderRadius: 1
//                               }}
//                             />
//                           </TableCell>
//                           <TableCell>{getStatusBadge(user.isVerified, user.blocked)}</TableCell>
//                           <TableCell>
//                             <Box display="flex" gap={1}>
//                               <IconButton
//                                 size="small"
//                                 onClick={() => openDialog(user)}
//                                 sx={{
//                                   color: '#0284c7',
//                                   bgcolor: '#e0f2fe',
//                                   '&:hover': { bgcolor: '#bae6fd' }
//                                 }}
//                               >
//                                 <Info fontSize="small" />
//                               </IconButton>

//                               {!user.isVerified && !user.blocked && (
//                                 <IconButton
//                                   size="small"
//                                   onClick={() => handleVerifyUser(user._id)}
//                                   sx={{
//                                     color: '#059669',
//                                     bgcolor: '#d1fae5',
//                                     '&:hover': { bgcolor: '#a7f3d0' }
//                                   }}
//                                 >
//                                   <VerifiedUser fontSize="small" />
//                                 </IconButton>
//                               )}

//                               <IconButton
//                                 size="small"
//                                 onClick={() => handleBlockUnblock(user._id, !user.blocked)}
//                                 sx={{
//                                   color: user.blocked ? '#059669' : '#dc2626',
//                                   bgcolor: user.blocked ? '#d1fae5' : '#fee2e2',
//                                   '&:hover': {
//                                     bgcolor: user.blocked ? '#a7f3d0' : '#fecaca'
//                                   }
//                                 }}
//                               >
//                                 {user.blocked ? <LockOpen fontSize="small" /> : <Block fontSize="small" />}
//                               </IconButton>
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       )) : (
//                         <TableRow>
//                           <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
//                             <Box display="flex" flexDirection="column" alignItems="center">
//                               <PeopleAlt sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
//                               <Typography variant="h6" color="text.secondary">No users found</Typography>
//                               <Typography variant="body2" color="text.disabled">
//                                 Try adjusting your search or filters
//                               </Typography>
//                             </Box>
//                           </TableCell>
//                         </TableRow>
//                       )
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         );

//       case 1: // Content Moderation
//         return (
//           <Card variant="outlined" sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom mb={3}>
//                 Content Moderation Queue
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: '#f8fafc' }}>
//                       <TableCell>User</TableCell>
//                       <TableCell>Item Type</TableCell>
//                       <TableCell>Submitted</TableCell>
//                       <TableCell>Preview</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {loading ? (
//                       Array(3).fill(0).map((_, i) => (
//                         <TableRow key={i}>
//                           <TableCell><Skeleton width={120} /></TableCell>
//                           <TableCell><Skeleton width={80} /></TableCell>
//                           <TableCell><Skeleton width={100} /></TableCell>
//                           <TableCell><Skeleton width={60} height={60} variant="rectangular" /></TableCell>
//                           <TableCell><Skeleton width={140} /></TableCell>
//                         </TableRow>
//                       ))
//                     ) : (
//                       <TableRow>
//                         <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
//                           <Box display="flex" flexDirection="column" alignItems="center">
//                             <CheckCircle sx={{ fontSize: 48, color: 'success.light', mb: 2 }} />
//                             <Typography variant="h6" color="text.secondary">All content reviewed</Typography>
//                             <Typography variant="body2" color="text.disabled">
//                               No pending items for review
//                             </Typography>
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     )}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         );

//       case 2: // Analytics
//         return (
//           <Box>
//             <Box mb={3}>
//               <Typography variant="h6" gutterBottom>Analytics Overview</Typography>
//               <Typography variant="body2" color="text.secondary" mb={3}>
//                 Performance metrics for the matrimonial platform
//               </Typography>

//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <StatCard
//                     icon={<PeopleAlt />}
//                     title="Total Users"
//                     value={summaryData.totalUsers}
//                     color="#0284c7"
//                     increase={12.5}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <StatCard
//                     icon={<Shield />}
//                     title="Premium Users"
//                     value={summaryData.premiumUsers}
//                     color="#0891b2"
//                     increase={8.3}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <StatCard
//                     icon={<Warning />}
//                     title="Pending Verifications"
//                     value={summaryData.pendingVerifications}
//                     color="#d97706"
//                     increase={-5.2}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <StatCard
//                     icon={<Dashboard />}
//                     title="New Users Today"
//                     value={summaryData.newUsersToday}
//                     color="#0f766e"
//                     increase={4.7}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <StatCard
//                     icon={<Analytics />}
//                     title="Total Matches"
//                     value={summaryData.totalMatches}
//                     color="#7c3aed"
//                     increase={15.8}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                   <StatCard
//                     icon={<Message />}
//                     title="Active Conversations"
//                     value={summaryData.activeChats}
//                     color="#be123c"
//                     increase={9.1}
//                   />
//                 </Grid>
//               </Grid>
//             </Box>

//             <Card variant="outlined" sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: 2 }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   User Activity Report
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" mb={3}>
//                   The chart data is a placeholder. Implement actual analytics visualization here.
//                 </Typography>
//                 <Box
//                   sx={{
//                     height: 300,
//                     width: '100%',
//                     bgcolor: '#f8fafc',
//                     borderRadius: 2,
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center'
//                   }}
//                 >
//                   <Typography color="text.secondary">
//                     Analytics Chart Placeholder
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>
//         );

//       case 3: // Subscription Management
//         return (
//           <Card variant="outlined" sx={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6" gutterBottom mb={3}>
//                 Subscription Plans Management
//               </Typography>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow sx={{ bgcolor: '#f8fafc' }}>
//                       <TableCell>Plan Name</TableCell>
//                       <TableCell>Duration</TableCell>
//                       <TableCell>Price</TableCell>
//                       <TableCell>Features</TableCell>
//                       <TableCell>Status</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     <TableRow hover>
//                       <TableCell>
//                         <Typography variant="body2" fontWeight="medium">Basic</Typography>
//                       </TableCell>
//                       <TableCell>1 Month</TableCell>
//                       <TableCell>₹999</TableCell>
//                       <TableCell>
//                         <Typography variant="body2">5 direct messages per day</Typography>
//                         <Typography variant="body2">Basic search filters</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Chip label="Active" size="small" color="success" variant="outlined" />
//                       </TableCell>
//                       <TableCell>
//                         <Button size="small" variant="outlined">Edit</Button>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow hover>
//                       <TableCell>
//                         <Typography variant="body2" fontWeight="medium">Premium</Typography>
//                       </TableCell>
//                       <TableCell>3 Months</TableCell>
//                       <TableCell>₹2499</TableCell>
//                       <TableCell>
//                         <Typography variant="body2">Unlimited messages</Typography>
//                         <Typography variant="body2">Advanced search filters</Typography>
//                         <Typography variant="body2">Profile highlights</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Chip label="Active" size="small" color="success" variant="outlined" />
//                       </TableCell>
//                       <TableCell>
//                         <Button size="small" variant="outlined">Edit</Button>
//                       </TableCell>
//                     </TableRow>
//                     <TableRow hover>
//                       <TableCell>
//                         <Typography variant="body2" fontWeight="medium">Gold</Typography>
//                       </TableCell>
//                       <TableCell>6 Months</TableCell>
//                       <TableCell>₹4999</TableCell>
//                       <TableCell>
//                         <Typography variant="body2">All Premium features</Typography>
//                         <Typography variant="body2">Priority in search results</Typography>
//                         <Typography variant="body2">Profile verification badge</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Chip label="Active" size="small" color="success" variant="outlined" />
//                       </TableCell>
//                       <TableCell>
//                         <Button size="small" variant="outlined">Edit</Button>
//                       </TableCell>
//                     </TableRow>
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         );

//       default:
//         return null;
//     }
//   };

//   // User Details Dialog
//   const UserDetailsDialog = () => {
//     if (!selectedUser) return null;

//     return (
//       <Dialog
//         open={dialogOpen}
//         onClose={() => setDialogOpen(false)}
//         fullWidth
//         maxWidth="sm"
//         PaperProps={{
//           sx: {
//             borderRadius: 2,
//             boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
//           }
//         }}
//       >
//         {/* <DialogTitle sx={{ pb: 1 }}>
//           <Typography variant="h6">User Profile Details</Typography>
//           <Typography variant="body2" color="text.secondary">
//             Comprehensive information about the selected user
//           </Typography>
//         </DialogTitle> */}
//         <DialogTitle sx={{ pb: 1 }}>
//           User Profile Details
//         </DialogTitle>
//         <Typography variant="body2" color="text.secondary" sx={{ px: 3 }}>
//           Comprehensive info about the selected user
//         </Typography>

//         <Divider />
//         <DialogContent>
//           <Box sx={{ mb: 3 }}>
//             <Box display="flex" alignItems="center" gap={2}>
//               <Avatar
//                 src={selectedUser.profilePicture}
//                 sx={{
//                   width: 80,
//                   height: 80,
//                   border: selectedUser.role === "Admin" ? '3px solid #7c3aed' :
//                     selectedUser.role === "Premium" ? '3px solid #0891b2' : 'none'
//                 }}
//               >
//                 {selectedUser.fullName?.[0]}
//               </Avatar>
//               <Box>
//                 <Box display="flex" alignItems="center" gap={1}>
//                   <Typography variant="h6" fontWeight={600}>
//                     {selectedUser.fullName}
//                   </Typography>
//                   {selectedUser.isVerified && (
//                     <VerifiedUser
//                       fontSize="small"
//                       color="success"
//                       sx={{ verticalAlign: 'middle' }}
//                     />
//                   )}
//                 </Box>
//                 <Typography variant="body2" color="text.secondary">{selectedUser.email}</Typography>
//                 <Box display="flex" gap={1} mt={1}>
//                   <Chip
//                     label={selectedUser.role}
//                     size="small"
//                     sx={{
//                       bgcolor: `${getRoleColor(selectedUser.role)}15`,
//                       color: getRoleColor(selectedUser.role),
//                       fontWeight: 500
//                     }}
//                   />
//                   {getStatusBadge(selectedUser.isVerified, selectedUser.blocked)}
//                 </Box>
//               </Box>
//             </Box>
//           </Box>

//           <Grid container spacing={2}>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Phone" value={selectedUser.phone || 'Not provided'} fullWidth
//                 size="small" variant="outlined" disabled />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Gender" value={selectedUser.gender || 'Not provided'} fullWidth
//                 size="small" variant="outlined" disabled />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Occupation" value={selectedUser.occupation || 'Not provided'} fullWidth
//                 size="small" variant="outlined" disabled />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Qualification" value={selectedUser.qualification || 'Not provided'} fullWidth
//                 size="small" variant="outlined" disabled />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Annual Income" value={selectedUser.annualIncome ? `₹${selectedUser.annualIncome}` : 'Not provided'}
//                 fullWidth size="small" variant="outlined" disabled />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField label="Date Joined" value="Apr 05, 2025"
//                 fullWidth size="small" variant="outlined" disabled />
//             </Grid>
//           </Grid>

//           <Box mt={3}>
//             <Typography variant="subtitle2" gutterBottom>Account Controls</Typography>
//             <Box display="flex" flexDirection="column" gap={2}>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={!selectedUser.blocked}
//                     onChange={() => handleBlockUnblock(selectedUser._id, !selectedUser.blocked)}
//                     color="primary"
//                   />
//                 }
//                 label="Account Active"
//               />
//               <FormControlLabel
//                 control={
//                   <Switch
//                     checked={selectedUser.isVerified}
//                     onChange={() => handleVerifyUser(selectedUser._id)}
//                     color="success"
//                     disabled={selectedUser.isVerified}
//                   />
//                 }
//                 label="Profile Verified"
//               />
//             </Box>
//           </Box>

//           <Box mt={3}>
//             <Typography variant="subtitle2" gutterBottom>Partner Preferences</Typography>
//             <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f8fafc' }}>
//               <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                   <Typography variant="caption" color="text.secondary">Age Range</Typography>
//                   <Typography variant="body2">25-32 years</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="caption" color="text.secondary">Religion</Typography>
//                   <Typography variant="body2">Hindu</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="caption" color="text.secondary">Education</Typography>
//                   <Typography variant="body2">Bachelor's degree or higher</Typography>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Typography variant="caption" color="text.secondary">Location</Typography>
//                   <Typography variant="body2">Mumbai, Maharashtra</Typography>
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ px: 3, py: 2 }}>
//           <Button
//             onClick={() => setDialogOpen(false)}
//             variant="outlined"
//             sx={{ borderRadius: 2 }}
//           >
//             Close
//           </Button>
//           <Button
//             color="primary"
//             variant="contained"
//             sx={{
//               borderRadius: 2,
//               backgroundImage: 'linear-gradient(135deg, #1e40af, #3b82f6)'
//             }}
//           >
//             Edit Profile
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.4 }}
//       style={{
//         background: "linear-gradient(145deg, #f8fafc, #e0f2fe)",
//         minHeight: "100vh",
//         padding: "2rem"
//       }}
//     >
//       <Box maxWidth="xl" mx="auto">
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
//           <Box>
//             <Typography
//               variant="h4"
//               fontWeight={700}
//               sx={{
//                 background: "linear-gradient(to right, #1e3a8a, #7c3aed)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 mb: 0.5
//               }}
//             >
//               Admin Dashboard
//             </Typography>
//             <Typography variant="body1" color="#64748b">
//               Manage users, moderate content, and monitor platform activity
//             </Typography>
//           </Box>

//           <Box display="flex" gap={2}>
//             <Button
//               variant="outlined"
//               startIcon={<Settings />}
//               sx={{ borderRadius: 2 }}
//             >
//               Settings
//             </Button>
//           </Box>
//         </Box>

//         {/* Main navigation */}
//         <Box mb={4}>
//           <Paper
//             elevation={0}
//             sx={{
//               borderRadius: 2,
//               overflow: 'hidden',
//               border: '1px solid rgba(0,0,0,0.08)',
//               backgroundColor: 'white'
//             }}
//           >
//             <Tabs
//               value={activeTab}
//               onChange={(e, newValue) => setActiveTab(newValue)}
//               variant="scrollable"
//               scrollButtons="auto"
//               aria-label="admin dashboard tabs"
//               sx={{
//                 px: 2,
//                 '& .MuiTab-root': {
//                   minHeight: 64,
//                   textTransform: 'none',
//                   fontSize: '0.95rem',
//                   fontWeight: 500
//                 }
//               }}
//             >
//               <Tab
//                 icon={<PeopleAlt />}
//                 iconPosition="start"
//                 label="User Management"
//               />
//               <Tab
//                 icon={<Shield />}
//                 iconPosition="start"
//                 label="Content Moderation"
//               />
//               <Tab
//                 icon={<Analytics />}
//                 iconPosition="start"
//                 label="Analytics"
//               />
//               <Tab
//                 icon={<CreditCard />}
//                 iconPosition="start"
//                 label="Subscription Plans"
//               />
//             </Tabs>
//           </Paper>
//         </Box>

//         {/* Tab content */}
//         {renderTabContent()}

//         {/* User Details Dialog */}
//         <UserDetailsDialog />
//       </Box>
//     </motion.div>
//   );
// };

// export default AdminDashboard;



// divided admin dashboard 



// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Tabs, Tab, Paper, Chip  } from "@mui/material";
import { motion } from "framer-motion";
 import {
  Shield, PersonOff, PeopleAlt,CreditCard, CheckCircle, Warning, Settings, Analytics
} from "@mui/icons-material";
import UserManagement from "../compnent/UserManagementTab";
import ContentModeration from "../compnent/ContentModerationTab";
import AnalyticsOverview from "../compnent/AnalyticsTab";
import SubscriptionPlans from "../compnent/SubscriptionPlansTab";
import UserDetailsDialog from "../compnent/UserDetailsDialog";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roleFilter, setRoleFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);
  const [verificationFilter, setVerificationFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const summaryData = {
    totalUsers: 1256,
    premiumUsers: 348,
    pendingVerifications: 78,
    newUsersToday: 24,
    totalMatches: 532,
    activeChats: 156,
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get("https://collage-project-backend-j2vf.onrender.com/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setTimeout(() => setLoading(false), 600);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleBlockUnblock = async (userId, shouldBlock) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `https://collage-project-backend-j2vf.onrender.com/api/admin/users/${userId}/block`,
        { block: shouldBlock },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error updating block status:", error);
    }
  };

  const handleVerifyUser = async (userId) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        `https://collage-project-backend-j2vf.onrender.com/api/admin/users/${userId}/verify`,
        { verified: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };

  const openDialog = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Admin":
        return "#7c3aed";
      case "Premium":
        return "#0891b2";
      case "User":
        return "#0284c7";
      default:
        return "#64748b";
    }
  };

  const getStatusBadge = (isVerified, blocked) => {
    if (blocked) {
      return (
        <Chip
          icon={<PersonOff />}
          label="Blocked"
          size="small"
          color="error"
          variant="outlined"
        />
      );
    }
    if (isVerified) {
      return (
        <Chip
          icon={<CheckCircle />}
          label="Verified"
          size="small"
          color="success"
          variant="outlined"
        />
      );
    }
    return (
      <Chip
        icon={<Warning />}
        label="Pending"
        size="small"
        color="warning"
        variant="outlined"
      />
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <UserManagement
           filteredUsers={users} 
            loading={loading}
            roleFilter={roleFilter}
            verificationFilter={verificationFilter}
            statusFilter={statusFilter}
            searchQuery={searchQuery}
            filterOpen={filterOpen}
            setSearchQuery={setSearchQuery}
            setFilterOpen={setFilterOpen}
            setRoleFilter={setRoleFilter}
            setVerificationFilter={setVerificationFilter}
            setStatusFilter={setStatusFilter}
            fetchUsers={fetchUsers}
            openDialog={openDialog}
            handleBlockUnblock={handleBlockUnblock}
            handleVerifyUser={handleVerifyUser}
            getRoleColor={getRoleColor}
            getStatusBadge={getStatusBadge}
          />
        );
      case 1:
        return <ContentModeration loading={loading} />;
      case 2:
        return <AnalyticsOverview summaryData={summaryData} />;
      case 3:
        return <SubscriptionPlans />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        background: "linear-gradient(145deg, #f8fafc, #e0f2fe)",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <Box maxWidth="xl" mx="auto">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: "linear-gradient(to right, #1e3a8a, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 0.5,
              }}
            >
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="#64748b">
              Manage users, moderate content, and monitor platform activity
            </Typography>
          </Box>

          <Box display="flex" gap={2}>
            <Button variant="outlined" startIcon={<Settings />} sx={{ borderRadius: 2 }}>
              Settings
            </Button>
          </Box>
        </Box>

        {/* Main navigation */}
        <Box mb={4}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.08)",
              backgroundColor: "white",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="admin dashboard tabs"
              sx={{
                px: 2,
                "& .MuiTab-root": {
                  minHeight: 64,
                  textTransform: "none",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                },
              }}
            >
              <Tab icon={<PeopleAlt />} iconPosition="start" label="User Management" />
              <Tab icon={<Shield />} iconPosition="start" label="Content Moderation" />
              <Tab icon={<Analytics />} iconPosition="start" label="Analytics" />
              <Tab icon={<CreditCard />} iconPosition="start" label="Subscription Plans" />
            </Tabs>
          </Paper>
        </Box>

        {renderTabContent()}

        <UserDetailsDialog
          dialogOpen={dialogOpen}
          selectedUser={selectedUser}
          handleBlockUnblock={handleBlockUnblock}
          handleVerifyUser={handleVerifyUser}
          setDialogOpen={setDialogOpen}
          getRoleColor={getRoleColor}
          getStatusBadge={getStatusBadge}
        />
      </Box>
    </motion.div>
  );
};

export default AdminDashboard;

