// import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, Divider } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify"; // Make sure to import toast
// import EnhancedNotificationBadge from "./EnhancedNotificationBadge"; 
// import { useNotifications } from "../context/NotificationContext"; // Import the hook

// const NavBar = () => {
//     const [anchorEl, setAnchorEl] = useState(null);
//     const navigate = useNavigate();
    
//     // Get notifications from context
//     const { notifications } = useNotifications();
//     const unreadCount = notifications.filter(n => !n.read).length;

//     const handleMenuOpen = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const navigateToNotificationsPage = () => {
//         navigate("/notifications");
//     };
    
//     const handleLogout = () => {
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("authTokenExpiry");
//         toast.success("Logged out successfully");
//         navigate("/");
//     };

//     // Rest of your NavBar component remains the same
//     return (
//         <AppBar 
//             position="sticky" 
//             sx={{ 
//                 bgcolor: "#333",
//                 backgroundImage: 'linear-gradient(to right, #333333, #444444)',
//                 boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
//             }}
//         >
//             <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 {/* Left side - Brand and mobile menu */}
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <IconButton 
//                         edge="start" 
//                         color="inherit" 
//                         aria-label="menu" 
//                         onClick={handleMenuOpen} 
//                         sx={{ 
//                             display: { xs: "block", md: "none" },
//                             mr: 1
//                         }}
//                     >
//                         <MenuIcon />
//                     </IconButton>
//                     <Typography 
//                         variant="h6" 
//                         sx={{ 
//                             cursor: "pointer",
//                             fontWeight: 'bold',
//                             background: 'linear-gradient(45deg, #FF9AA2 30%, #FFB7B2 90%)',
//                             WebkitBackgroundClip: 'text',
//                             WebkitTextFillColor: 'transparent',
//                             textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
//                         }} 
//                         onClick={() => navigate("/dashboard")}
//                     > 
//                         Mangalashtak Clone
//                     </Typography>
//                 </Box>

//                 {/* Right side - Navigation and Notification */}
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     {/* Desktop Navigation */}
//                     <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center', mr: 2 }}>
//                         <Button 
//                             color="inherit" 
//                             onClick={() => navigate("/dashboard")}
//                             sx={{
//                                 mx: 1,
//                                 '&:hover': {
//                                     backgroundColor: 'rgba(255, 255, 255, 0.1)'
//                                 }
//                             }}
//                         >
//                             Profile
//                         </Button>
                        
//                         <Button 
//                             color="inherit" 
//                             onClick={handleLogout}
//                             sx={{
//                                 mx: 1,
//                                 '&:hover': {
//                                     backgroundColor: 'rgba(255, 255, 255, 0.1)'
//                                 }
//                             }}
//                         >
//                             Logout
//                         </Button>
//                     </Box>

//                     {/* Enhanced Notification Badge */}
//                     <Box sx={{ ml: 1 }}>
//                         <EnhancedNotificationBadge 
//                             count={unreadCount} 
//                             onClick={navigateToNotificationsPage}
//                         />
//                     </Box>
//                 </Box>
     
//                 {/* Mobile Menu */}
//                 <Menu 
//                     anchorEl={anchorEl} 
//                     open={Boolean(anchorEl)} 
//                     onClose={handleMenuClose}
//                     PaperProps={{
//                         elevation: 3,
//                         sx: {
//                             mt: 1.5,
//                             borderRadius: 1,
//                             minWidth: 180,
//                             boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
//                         }
//                     }}
//                 >
//                     <MenuItem 
//                         onClick={() => { navigate("/dashboard"); handleMenuClose(); }}
//                         sx={{ py: 1 }}
//                     >
//                         Profile
//                     </MenuItem>
//                     <MenuItem 
//                         onClick={() => { navigate("/notifications"); handleMenuClose(); }}
//                         sx={{ py: 1 }}
//                     >
//                         Notifications {unreadCount > 0 && `(${unreadCount})`}
//                     </MenuItem>
//                     <Divider />
//                     <MenuItem 
//                         onClick={() => { handleLogout(); handleMenuClose(); }}
//                         sx={{ py: 1 }}
//                     >
//                         Logout
//                     </MenuItem>
//                 </Menu>
//             </Toolbar>
//         </AppBar>
//     );
// };

// export default NavBar;




import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Box, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Make sure to import toast
import EnhancedNotificationBadge from "./EnhancedNotificationBadge"; 
import { useNotifications } from "../context/NotificationContext"; // Import the hook

const NavBar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    
    // Get notifications from context
    const { notifications } = useNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navigateToNotificationsPage = () => {
        navigate("/notifications");
    };
    
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authTokenExpiry");
        toast.success("Logged out successfully");
        navigate("/");
    };

    // Function to navigate to payment/upgrade page
    const navigateToPaymentPage = () => {
        navigate("/payment");
        handleMenuClose();
    };

    // Rest of your NavBar component remains the same
    return (
        <AppBar 
            position="sticky" 
            sx={{ 
                bgcolor: "#333",
                backgroundImage: 'linear-gradient(to right, #333333, #444444)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Left side - Brand and mobile menu */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton 
                        edge="start" 
                        color="inherit" 
                        aria-label="menu" 
                        onClick={handleMenuOpen} 
                        sx={{ 
                            display: { xs: "block", md: "none" },
                            mr: 1
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        sx={{ 
                            cursor: "pointer",
                            fontWeight: 'bold',
                            background: 'linear-gradient(45deg, #FF9AA2 30%, #FFB7B2 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                        }} 
                        onClick={() => navigate("/dashboard")}
                    > 
                        Mangalashtak Clone
                    </Typography>
                </Box>

                {/* Right side - Navigation and Notification */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: 'center', mr: 2 }}>
                        <Button 
                            color="inherit" 
                            onClick={() => navigate("/dashboard")}
                            sx={{
                                mx: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            Profile
                        </Button>
                        
                        {/* New Premium Upgrade Button */}
                        <Button 
                            color="inherit"
                            onClick={() => navigate("/payment")}
                            sx={{
                                mx: 1,
                                background: 'linear-gradient(45deg, #8b5cf6 30%, #3b82f6 90%)',
                                color: 'white',
                                fontWeight: 'bold',
                                px: 2,
                                '&:hover': {
                                    opacity: 0.9,
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                }
                            }}
                        >
                            Upgrade Premium
                        </Button>
                        
                        <Button 
                            color="inherit" 
                            onClick={handleLogout}
                            sx={{
                                mx: 1,
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }}
                        >
                            Logout
                        </Button>
                    </Box>

                    {/* Enhanced Notification Badge */}
                    <Box sx={{ ml: 1 }}>
                        <EnhancedNotificationBadge 
                            count={unreadCount} 
                            onClick={navigateToNotificationsPage}
                        />
                    </Box>
                </Box>
     
                {/* Mobile Menu */}
                <Menu 
                    anchorEl={anchorEl} 
                    open={Boolean(anchorEl)} 
                    onClose={handleMenuClose}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            mt: 1.5,
                            borderRadius: 1,
                            minWidth: 180,
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                        }
                    }}
                >
                    <MenuItem 
                        onClick={() => { navigate("/dashboard"); handleMenuClose(); }}
                        sx={{ py: 1 }}
                    >
                        Profile
                    </MenuItem>
                    <MenuItem 
                        onClick={() => { navigate("/notifications"); handleMenuClose(); }}
                        sx={{ py: 1 }}
                    >
                        Notifications {unreadCount > 0 && `(${unreadCount})`}
                    </MenuItem>
                    
                    {/* Added Premium Upgrade menu item */}
                    <MenuItem 
                        onClick={navigateToPaymentPage}
                        sx={{ 
                            py: 1,
                            background: 'linear-gradient(45deg, #f5f3ff 30%, #ede9fe 90%)',
                            color: '#4c1d95',
                            fontWeight: 'bold'
                        }}
                    >
                        Upgrade to Premium
                    </MenuItem>
                    
                    <Divider />
                    <MenuItem 
                        onClick={() => { handleLogout(); handleMenuClose(); }}
                        sx={{ py: 1 }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;