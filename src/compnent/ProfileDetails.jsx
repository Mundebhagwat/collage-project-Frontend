import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container, Card, Avatar, Typography, Grid, Box, Divider,
  Chip, Paper, Tab, Tabs, useTheme, useMediaQuery, Tooltip, Alert
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import MessageIcon from "@mui/icons-material/Message";
// import PremiumIcon from "@mui/icons-material/Workspace"; // For premium badge
import PremiumIcon from "@mui/icons-material/WorkspacePremium"; // For premium badge
import LockIcon from "@mui/icons-material/Lock"; // For private profile indication
import { motion } from "framer-motion";
import axios from "axios";
import {
  Person, LocationOn, School, Work, Cake, Favorite,
  LocalActivity, ColorLens, Height, FitnessCenter, Language,
  AttachMoney, Home, Favorite as FavoriteIcon
} from "@mui/icons-material";
import ShortlistButton from "./ShortListProfiles";
import ProfileChatButton from "./ProfileChatButton";
import ReportProfileButton from "./ReportProfileButton";

const ProfileDetail = () => {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("https://collage-project-backend-j2vf.onrender.com/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUser(response.data);
        // Check if viewing own profile
        setIsOwnProfile(response.data._id === userId);
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`https://collage-project-backend-j2vf.onrender.com/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchCurrentUser();
    fetchProfile();
  }, [userId]);

  if (!profile || !currentUser) {
    return (
      <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Box sx={{ textAlign: "center" }}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <FavoriteIcon sx={{ fontSize: 50, color: "#e91e63", mb: 2 }} />
          </motion.div>
          <Typography variant="h6">Loading profile...</Typography>
        </Box>
      </Container>
    );
  }

  // Determine if current user can see full profile
  const canViewFullProfile =
    isOwnProfile ||
    profile.privacy === "public" ||
    (currentUser.membership === "premium" && profile.privacy === "public");


  // Special permission for partner preferences - available to premium users
  const canViewPartnerPreferences =
    isOwnProfile ||
    (profile.privacy === "public") ||
    currentUser.membership === "premium";

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Format date for better display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const personalInfoSection = (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #6a11cb", pb: 1, display: "inline-block" }}>
        Personal Information
      </Typography>

      {!canViewFullProfile ? (
        <Box sx={{ py: 2 }}>
          <Alert severity="info" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LockIcon sx={{ mr: 1 }} /> This profile is private. Limited information is available.
            </Box>
          </Alert>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Cake sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Age:</strong> {calculateAge(profile.dateOfBirth)} years
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Favorite sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Religion:</strong> {profile.religion || "N/A"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Cake sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Date of Birth:</strong> {formatDate(profile.dateOfBirth)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Favorite sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Religion:</strong> {profile.religion || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocalActivity sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Caste:</strong> {profile.caste || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ColorLens sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Rashi:</strong> {profile.rashi || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <LocalActivity sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Gothra:</strong> {profile.gothra || "N/A"}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FavoriteIcon sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Blood Group:</strong> {profile.bloodGroup || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <ColorLens sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Favorite Color:</strong> {profile.color || "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Height sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Height:</strong> {profile.height ? `${profile.height} cm` : "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <FitnessCenter sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Weight:</strong> {profile.weight ? `${profile.weight} kg` : "N/A"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Language sx={{ mr: 1, color: "#6a11cb" }} />
              <Typography variant="body1">
                <strong>Mother Tongue:</strong> {profile.motherTongue || "N/A"}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );

  const professionalInfoSection = (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #6a11cb", pb: 1, display: "inline-block" }}>
        Professional Details
      </Typography>

      {!canViewPartnerPreferences ? (
        <Box sx={{ py: 2 }}>
          <Alert severity="info" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LockIcon sx={{ mr: 1 }} /> Upgrade to premium to view full professional details.
            </Box>
          </Alert>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Work sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Occupation:</strong> {profile.occupation || "N/A"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <School sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Education:</strong> {profile.qualification || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Work sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Occupation:</strong> {profile.occupation || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <AttachMoney sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Annual Income:</strong> {profile.annualIncome ? `₹${profile.annualIncome.toLocaleString()}` : "N/A"}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );

  const locationInfoSection = (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #6a11cb", pb: 1, display: "inline-block" }}>
        Location Details
      </Typography>

      {!canViewFullProfile ? (
        <Box sx={{ py: 2 }}>
          <Alert severity="info" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LockIcon sx={{ mr: 1 }} /> Detailed location information is hidden for private profiles.
            </Box>
          </Alert>
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <LocationOn sx={{ mr: 1, color: "#6a11cb" }} />
            <Typography variant="body1">
              <strong>Location:</strong> {profile.location || "N/A"}
            </Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            <Home sx={{ mr: 1, color: "#6a11cb", mt: 0.5 }} />
            <Typography variant="body1">
              <strong>Permanent Address:</strong> {profile.permanentAddress || "N/A"}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
            <LocationOn sx={{ mr: 1, color: "#6a11cb", mt: 0.5 }} />
            <Typography variant="body1">
              <strong>Current Address:</strong> {profile.currentAddress || "N/A"}
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );

  const partnerPreferencesSection = (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2, height: "100%" }}>
      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #6a11cb", pb: 1, display: "inline-block" }}>
        Partner Preferences
      </Typography>

      {!canViewPartnerPreferences ? (
        <Box sx={{ py: 2 }}>
          <Alert severity="info" sx={{ mb: 2, display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LockIcon sx={{ mr: 1 }} /> Partner preferences are only visible to premium members.
            </Box>
          </Alert>
          <Typography variant="body1" sx={{ color: "gray", fontStyle: "italic" }}>
            Upgrade to premium to view partner preferences
          </Typography>
        </Box>
      ) : (
        <>{profile.partnerPreferences ? (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  Age Range: {profile.partnerPreferences.minAge || "N/A"} - {profile.partnerPreferences.maxAge || "N/A"} years
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  Location: {profile.partnerPreferences.location || "N/A"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  Preferred Gender: {profile.partnerPreferences.preferredGender || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  Education: {profile.partnerPreferences.education || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight={500}>
                  Occupation: {profile.partnerPreferences.occupation || "N/A"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ color: "gray", fontStyle: "italic" }}>
            No partner preferences added yet.
          </Typography>
        )}</>
      )}
    </Paper>
  );

  // Generate premium badge based on membership
  const renderMembershipBadge = () => {
    if (profile.membership === "premium") {
      return (
        <Tooltip title="Premium Member" arrow placement="top">
          <Chip
            icon={<PremiumIcon sx={{ color: "#6a11cb !important" }} />}
            label="Premium"
            size="small"
            sx={{
              ml: 1,
              backgroundColor: "#FFD700",
              color: "#6a11cb",
              fontWeight: "bold",
              border: "1px solid rgba(106, 17, 203, 0.3)",
            }}
          />
        </Tooltip>
      );
    }
    return null;
  };

  // Conditional render for private profile badge
  const renderPrivacyBadge = () => {
    if (profile.privacy === "private") {
      return (
        <Tooltip title="Private Profile" arrow placement="top">
          <Chip
            icon={<LockIcon sx={{ color: "#6a11cb !important" }} />}
            label="Private"
            size="small"
            sx={{
              ml: 1,
              backgroundColor: "#e0e0e0",
              color: "#6a11cb",
              fontWeight: "bold",
              border: "1px solid rgba(106, 17, 203, 0.3)",
            }}
          />
        </Tooltip>
      );
    }
    return null;
  };

  return (
    <Container maxWidth="lg" component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }}>
      <Card sx={{
        p: 4,
        mt: 4,
        mb: 4,
        borderRadius: 3,
        backgroundImage: "linear-gradient(to right, rgba(37, 117, 252, 0.1), rgba(106, 17, 203, 0.1))",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)"
      }}>
        <Grid container spacing={3}>
          {/* Profile Header Section */}
          <Grid item xs={12}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              backgroundImage: profile.membership === "premium"
                ? "linear-gradient(135deg, #f59e0b, #6a11cb)"
                : "linear-gradient(135deg, #2575fc, #6a11cb)",
              color: "white",
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center"
            }}>
              <Box sx={{
                position: "relative",
                mr: isMobile ? 0 : 4,
                mb: isMobile ? 3 : 0,
                display: "flex",
                justifyContent: "center"
              }}>
                <Avatar
                  src={profile.profilePicture}
                  alt={profile.fullName}
                  sx={{
                    width: 150,
                    height: 150,
                    border: profile.membership === "premium" ? "4px solid #FFD700" : "4px solid white",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
                  }}
                />

                {/* Admin Verification Badge - Added conditionally based on adminApproved field */}
                {profile.adminApproved && (
                  <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3
                    }}
                    sx={{
                      position: "absolute",
                      bottom: 5,
                      right: 5,
                      backgroundColor: "#FFD700",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid white",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      zIndex: 2
                    }}
                  >
                    <Tooltip title="Profile Verified by Admin" arrow placement="top">
                      <VerifiedIcon sx={{ color: "#6a11cb", fontSize: 24 }} />
                    </Tooltip>
                  </Box>
                )}

                {/* Premium Badge Circle for profile picture */}
                {profile.membership === "premium" && (
                  <Box
                    component={motion.div}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.4
                    }}
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      backgroundColor: "#FFD700",
                      borderRadius: "50%",
                      width: 40,
                      height: 40,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "3px solid white",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      zIndex: 2
                    }}
                  >
                    <Tooltip title="Premium Member" arrow placement="top">
                      <PremiumIcon sx={{ color: "#6a11cb", fontSize: 24 }} />
                    </Tooltip>
                  </Box>
                )}
              </Box>

              <Box sx={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "center" : "flex-start", flexWrap: "wrap" }}>
                  <Typography variant="h4" fontWeight={700} gutterBottom>
                    {profile.fullName}
                  </Typography>

                  {/* Inline verification indicator next to name */}
                  {profile.adminApproved && (
                    <Tooltip title="Profile Verified by Admin" arrow>
                      <Box
                        component={motion.div}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        sx={{
                          display: "inline-flex",
                          ml: 1,
                          mt: -1,
                          alignItems: "center"
                        }}
                      >
                        <Chip
                          icon={<VerifiedIcon sx={{ color: "#6a11cb !important" }} />}
                          label="Verified"
                          size="small"
                          sx={{
                            backgroundColor: "#FFD700",
                            color: "#6a11cb",
                            fontWeight: "bold",
                            border: "1px solid rgba(106, 17, 203, 0.3)"
                          }}
                        />
                      </Box>
                    </Tooltip>
                  )}

                  {/* Premium badge */}
                  {renderMembershipBadge()}

                  {/* Privacy badge */}
                  {renderPrivacyBadge()}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1, justifyContent: isMobile ? "center" : "flex-start" }}>
                  <Cake sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="h6">
                    {calculateAge(profile.dateOfBirth)} years
                  </Typography>

                  <Divider orientation="vertical" flexItem sx={{ mx: 2, backgroundColor: "rgba(255,255,255,0.5)" }} />

                  <LocationOn sx={{ mr: 1, fontSize: 20 }} />
                  <Typography variant="h6">
                    {profile.location || "N/A"}
                  </Typography>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Chip
                    icon={<Person sx={{ color: "white !important" }} />}
                    label={profile.gender || "N/A"}
                    sx={{
                      mr: 1,
                      mb: 1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500
                    }}
                  />

                  <Chip
                    icon={<Work sx={{ color: "white !important" }} />}
                    label={profile.occupation || "N/A"}
                    sx={{
                      mr: 1,
                      mb: 1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500
                    }}
                  />

                  <Chip
                    icon={<LocalActivity sx={{ color: "white !important" }} />}
                    label={profile.religion || "N/A"}
                    sx={{
                      mr: 1,
                      mb: 1,
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontWeight: 500
                    }}
                  />
                </Box>
              </Box>
              
              <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: isMobile ? 2 : 0
              }}>
                <Box sx={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  gap: 1,
                  width: isMobile ? "100%" : "auto"
                }}>
                  <ShortlistButton
                    profileId={profile?._id}
                    userId={userId}
                    buttonProps={{
                      sx: {
                        fontWeight: "bold",
                        borderRadius: "50px",
                        backgroundColor: "white",
                        color: "#6a11cb",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
                        width: isMobile ? "100%" : "auto",
                        mb: isMobile ? 1 : 0
                      }
                    }}
                  />

                  <ProfileChatButton
                    userId={userId}
                    userName={profile.fullName}
                    buttonProps={{
                      variant: "contained",
                      startIcon: <MessageIcon />,
                      sx: {
                        fontWeight: "bold",
                        borderRadius: "50px",
                        backgroundColor: "white",
                        color: "#6a11cb",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.8)" },
                        width: isMobile ? "100%" : "auto",
                        mb: isMobile ? 1 : 0
                      }
                    }}
                  />
                  {/* ReportProfileButton component */}
                  <ReportProfileButton
                    userId={userId}
                    userName={profile.fullName}
                    buttonProps={{
                      sx: {
                        width: isMobile ? "100%" : "auto"
                      }
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Privacy Notice Section - Shown only for private profiles when viewed by non-owners */}
          {profile.privacy === "private" && !isOwnProfile && (
            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  border: "1px solid rgba(106, 17, 203, 0.2)",
                  backgroundColor: "rgba(106, 17, 203, 0.05)"
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <LockIcon sx={{ mr: 2, color: "#6a11cb" }} />
                  <Typography variant="h6" fontWeight={600} color="#6a11cb">
                    This is a private profile
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ mb: 2 }}>
                  {profile.fullName} has chosen to keep their profile private. Some information is hidden.
                </Typography>

                {currentUser.membership !== "premium" && (
                  <Box sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: "rgba(255, 215, 0, 0.1)",
                    border: "1px dashed #FFD700"
                  }}>
                    <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
                      <PremiumIcon sx={{ mr: 1, color: "#FFD700" }} />
                      <span>
                        <strong>Upgrade to Premium</strong> to view more details on private profiles.
                      </span>
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          )}

          {/* Bio Section */}
          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 2, borderBottom: "2px solid #6a11cb", pb: 1, display: "inline-block" }}>
                About Me
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: profile.bio ? "normal" : "italic" }}>
                {profile.bio || "No bio information available."}
              </Typography>
            </Paper>
          </Grid>

          {/* Tabs for Different Sections */}
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant={isMobile ? "scrollable" : "fullWidth"}
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': { fontWeight: 600 },
                  '& .Mui-selected': { color: '#6a11cb' },
                  '& .MuiTabs-indicator': { backgroundColor: '#6a11cb' }
                }}
              >
                <Tab label="Personal Info" />
                <Tab label="Professional" />
                <Tab label="Location" />
                <Tab label="Partner Preferences" />
              </Tabs>
            </Box>

            <Box sx={{ mt: 3 }}>
              {tabValue === 0 && personalInfoSection}
              {tabValue === 1 && professionalInfoSection}
              {tabValue === 2 && locationInfoSection}
              {tabValue === 3 && partnerPreferencesSection}
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProfileDetail;