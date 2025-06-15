// import React, { useState, useEffect } from "react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import { Lock, LockOpen, ShieldCheck, Shield, Eye, EyeOff } from "lucide-react";
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
// import { toast } from "react-toastify";
// import axios from "axios";

// const PrivacyToggle = ({ userId, initialPrivacy, isPremium, updateUser }) => {
//     const [privacy, setPrivacy] = useState(initialPrivacy);
//     const isPrivate = privacy === "private";

//     useEffect(() => {
//         setPrivacy(initialPrivacy); // keep in sync with parent updates if any
//     }, [initialPrivacy]);

//     const handleToggle = async () => {
//         const newPrivacy = isPrivate ? "public" : "private";
//         try {
//             const res = await axios.patch(`http://localhost:5000/api/user/privacy/${userId}`, {
//                 privacy: newPrivacy,
//             });
//             setPrivacy(res.data.privacy);
//             updateUser(res.data.privacy); // sync with parent
//             toast.success(`Profile is now ${newPrivacy}`);
//         } catch (error) {
//             console.log("Error :", error);
//             toast.error("Something went wrong");
//         }
//     };

//     return (
//         <Card className="w-full sm:w-[400px] bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100 rounded-2xl overflow-hidden">
//             <div className={`h-1 w-full ${isPremium ? "bg-gradient-to-r from-amber-400 to-yellow-300" : "bg-gradient-to-r from-blue-400 to-indigo-500"}`}></div>
//             <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
//                 <CardTitle className="text-lg font-semibold flex items-center gap-2">
//                     {isPrivate ? (
//                         <Lock className="w-5 h-5 text-indigo-600" />
//                     ) : (
//                         <LockOpen className="w-5 h-5 text-emerald-500" />
//                     )}
//                     <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
//                         Privacy Settings
//                     </span>
//                 </CardTitle>
//                 {isPremium ? (
//                     <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white border-none px-3 py-1 flex items-center gap-1">
//                         <ShieldCheck className="w-4 h-4" /> Premium
//                     </Badge>
//                 ) : (
//                     <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 px-3 py-1 flex items-center gap-1">
//                         <Shield className="w-4 h-4" /> Standard
//                     </Badge>
//                 )}
//             </CardHeader>
//             <CardContent className="flex flex-col gap-4">
//                 <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
//                     <div className="flex items-center gap-2">
//                         {!isPrivate ? <Eye className="w-4 h-4 text-emerald-500" /> : <EyeOff className="w-4 h-4 text-indigo-600" />}
//                         <div className="text-sm font-medium">Make my profile public</div>
//                     </div>
//                     <TooltipProvider>
//                         <Tooltip>
//                             <TooltipTrigger asChild>
//                                 <Switch
//                                     checked={!isPrivate}
//                                     onCheckedChange={handleToggle}
//                                     className={`${!isPrivate ? "bg-emerald-500" : "bg-gray-300"} data-[state=checked]:bg-emerald-500`}
//                                 />
//                             </TooltipTrigger>
//                             <TooltipContent className="bg-slate-800 text-white px-3 py-2 rounded-md">
//                                 <p>
//                                     {isPrivate
//                                         ? "Switch to make your profile visible to others"
//                                         : "Switch to hide your full profile from others"}
//                                 </p>
//                             </TooltipContent>
//                         </Tooltip>
//                     </TooltipProvider>
//                 </div>

//                 <div className={`text-xs leading-relaxed p-3 rounded-lg ${isPrivate ? "bg-indigo-50 text-indigo-700" : "bg-emerald-50 text-emerald-700"}`}>
//                     {isPrivate ? (
//                         <div className="flex gap-2">
//                             <div className="mt-1">
//                                 <Lock className="w-4 h-4" />
//                             </div>
//                             <div>
//                                 Your profile is <strong>private</strong>. Only basic information is visible to others.
//                                 Even premium users will see limited details.
//                             </div>
//                         </div>
//                     ) : isPremium ? (
//                         <div className="flex gap-2">
//                             <div className="mt-1">
//                                 <LockOpen className="w-4 h-4" />
//                             </div>
//                             <div>
//                                 Your profile is <strong>public</strong>. Other premium users can now view full profile
//                                 details.
//                             </div>
//                         </div>
//                     ) : (
//                         <div className="flex gap-2">
//                             <div className="mt-1">
//                                 <LockOpen className="w-4 h-4" />
//                             </div>
//                             <div>
//                                 Your profile is <strong>public</strong>. Non-premium users can only see limited info.
//                                 <div className="mt-1">
//                                     <span className="text-blue-600 font-medium cursor-pointer hover:underline">
//                                         Upgrade to Premium
//                                     </span>{" "}
//                                     to view full details of other public profiles.
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {isPremium && (
//                     <div className="flex items-center gap-2 bg-amber-50 p-3 rounded-lg border border-amber-100">
//                         <ShieldCheck className="w-4 h-4 text-amber-500" />
//                         <span className="text-xs text-amber-700">
//                             Premium members enjoy enhanced privacy controls and full profile viewing privileges.
//                         </span>
//                     </div>
//                 )}
//             </CardContent>
//         </Card>
//     );
// };

// export default PrivacyToggle;


import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Switch,
    Chip,
    Box,
    Tooltip,
    styled
} from "@mui/material";
import {
    Lock,
    LockOpen,
    Security,
    Shield,
    Visibility,
    VisibilityOff
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

// --- Styled Components with prop filtering ---

const StyledCard = styled(Card, {
    shouldForwardProp: (prop) => prop !== "$isPremium"
})(({ $isPremium }) => ({
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto',
    borderRadius: '16px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    overflow: 'hidden',
    position: 'relative',
    background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: $isPremium
            ? 'linear-gradient(to right, #f59e0b, #fbbf24)'
            : 'linear-gradient(to right, #60a5fa, #6366f1)'
    }
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(2)
}));

const StyledCardTitle = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
}));

const TitleText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: '1.125rem',
    backgroundImage: 'linear-gradient(to right, #1f2937, #4b5563)',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
}));

const PremiumChip = styled(Chip, {
    shouldForwardProp: (prop) => prop !== "$isPremium"
})(({ $isPremium }) => ({
    background: $isPremium
        ? 'linear-gradient(to right, #f59e0b, #fbbf24)'
        : 'transparent',
    color: $isPremium ? '#ffffff' : '#6b7280',
    border: $isPremium ? 'none' : '1px solid #e5e7eb',
    padding: '4px 8px',
    height: '28px',
    '& .MuiChip-label': {
        paddingLeft: '4px',
        paddingRight: '8px',
    }
}));

const ToggleSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: theme.spacing(1.5),
    borderRadius: '8px',
}));

const ToggleLabel = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '& svg': {
        fontSize: '1rem'
    }
}));

const StyledSwitch = styled(Switch, {
    shouldForwardProp: (prop) => prop !== "$isActive"
})(({ $isActive }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#10b981',
        '& + .MuiSwitch-track': {
            backgroundColor: '#10b981',
        },
    },
    '& .MuiSwitch-switchBase': {
        color: $isActive ? '#10b981' : '#d1d5db',
        '& + .MuiSwitch-track': {
            backgroundColor: $isActive ? '#10b981' : '#d1d5db',
        }
    }
}));

const StatusSection = styled(Box, {
    shouldForwardProp: (prop) => prop !== "$isPrivate"
})(({ theme, $isPrivate }) => ({
    display: 'flex',
    gap: theme.spacing(1),
    backgroundColor: $isPrivate ? '#eef2ff' : '#ecfdf5',
    color: $isPrivate ? '#4f46e5' : '#059669',
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    fontSize: '0.75rem',
    lineHeight: 1.5
}));

const PremiumSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    backgroundColor: '#fffbeb',
    color: '#92400e',
    padding: theme.spacing(1.5),
    borderRadius: '8px',
    border: '1px solid #fef3c7',
    fontSize: '0.75rem'
}));

// --- Component ---

const PrivacyToggle = ({ userId, initialPrivacy, isPremium, updateUser }) => {
    const [privacy, setPrivacy] = useState(initialPrivacy);
    const isPrivate = privacy === "private";

    useEffect(() => {
        setPrivacy(initialPrivacy);
    }, [initialPrivacy]);

    const handleToggle = async () => {
        const newPrivacy = isPrivate ? "public" : "private";
        try {
            const token = localStorage.getItem("authToken");
            const res = await axios.patch(
                `https://collage-project-backend-j2vf.onrender.com/api/users/profile/privacy`,
                { privacy: newPrivacy },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setPrivacy(res.data.privacy);
            if (updateUser) updateUser(res.data.privacy);
            toast.success(`Profile is now ${newPrivacy}`);
        } catch (error) {
            console.error("Error updating privacy:", error);
            toast.error("Something went wrong");
        }
    };

    return (
        <StyledCard $isPremium={isPremium}>
            <StyledCardHeader
                title={
                    <StyledCardTitle>
                        {isPrivate ?
                            <Lock style={{ color: '#4f46e5', fontSize: '1.25rem' }} /> :
                            <LockOpen style={{ color: '#10b981', fontSize: '1.25rem' }} />
                        }
                        <TitleText variant="h6">Privacy Settings</TitleText>
                    </StyledCardTitle>
                }
                action={
                    <PremiumChip
                        $isPremium={isPremium}
                        icon={isPremium ?
                            <Security style={{ fontSize: '1rem' }} /> :
                            <Shield style={{ fontSize: '1rem' }} />
                        }
                        label={isPremium ? "Premium" : "Standard"}
                        variant={isPremium ? "filled" : "outlined"}
                    />
                }
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <ToggleSection>
                    <ToggleLabel>
                        {!isPrivate ?
                            <Visibility style={{ color: '#10b981' }} /> :
                            <VisibilityOff style={{ color: '#4f46e5' }} />
                        }
                        <Typography variant="body2" fontWeight={500}>
                            Make my profile public
                        </Typography>
                    </ToggleLabel>
                    <Tooltip
                        title={isPrivate ?
                            "Switch to make your profile visible to others" :
                            "Switch to hide your full profile from others"
                        }
                        arrow
                        placement="top"
                    >
                        <StyledSwitch
                            checked={!isPrivate}
                            onChange={handleToggle}
                            $isActive={!isPrivate}
                        />
                    </Tooltip>
                </ToggleSection>

                <StatusSection $isPrivate={isPrivate}>
                    <Box sx={{ marginTop: '4px' }}>
                        {isPrivate ?
                            <Lock style={{ fontSize: '1rem' }} /> :
                            <LockOpen style={{ fontSize: '1rem' }} />
                        }
                    </Box>
                    <Box>
                        {isPrivate ? (
                            <>
                                Your profile is <strong>private</strong>. Only basic information is visible to others.
                                Even premium users will see limited details.
                            </>
                        ) : isPremium ? (
                            <>
                                Your profile is <strong>public</strong>. Other premium users can now view full profile
                                details.
                            </>
                        ) : (
                            <>
                                Your profile is <strong>public</strong>. Non-premium users can only see limited info.
                                <Box sx={{ marginTop: '4px' }}>
                                    <Typography
                                        component="span"
                                        sx={{
                                            color: '#2563eb',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline'
                                            }
                                        }}
                                    >
                                        Upgrade to Premium
                                    </Typography>
                                    {" "}
                                    to view full details of other public profiles.
                                </Box>
                            </>
                        )}
                    </Box>
                </StatusSection>

                {isPremium && (
                    <PremiumSection>
                        <Security style={{ color: '#f59e0b', fontSize: '1rem' }} />
                        <Typography variant="caption">
                            Premium members enjoy enhanced privacy controls and full profile viewing privileges.
                        </Typography>
                    </PremiumSection>
                )}
            </CardContent>
        </StyledCard>
    );
};

export default PrivacyToggle;
