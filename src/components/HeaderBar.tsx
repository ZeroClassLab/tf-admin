import React, { useState } from "react";
import { styled } from "@mui/material/styles";

import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { scherzo } from "./etc";

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
interface HeaderBarProps extends AppBarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    reload: () => void;
    isReloading: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const HeaderBar: React.VFC<HeaderBarProps> = ({
    open,
    setOpen,
    reload,
    isReloading,
}) => {
    const [moo, setMoo] = useState(() => {
        return localStorage.getItem("moomessage") || "";
    });
    const [modalOpen, setModalOpen] = useState(false);

    const openDrawer = () => {
        setOpen(true);
    };

    return (
        <>
            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: "24px", // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={openDrawer}
                        sx={{
                            marginRight: "36px",
                            ...(open && { display: "none" }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        내일의 창업 대시보드
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                        {/* reload */}
                        {isReloading ? (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    mr: 1.5,
                                }}
                            >
                                <CircularProgress size={16} color="inherit" />
                            </Box>
                        ) : (
                            <IconButton color="inherit" onClick={reload}>
                                <RefreshIcon />
                            </IconButton>
                        )}
                        {/* notification */}
                        <IconButton
                            color="inherit"
                            onClick={() => {
                                setModalOpen(true);
                                scherzo();
                                setMoo("1");
                                localStorage.setItem("moomessage", "read!");
                            }}
                        >
                            <Badge badgeContent={moo ? 0 : 1} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
                <Paper
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        textAlign: "center",
                    }}
                >
                    <Typography variant="h6">안녕하세요, 무에요! 😆</Typography>
                    <Typography>날 추운데 몸조심하세요!</Typography>
                </Paper>
            </Modal>
        </>
    );
};

export default HeaderBar;
