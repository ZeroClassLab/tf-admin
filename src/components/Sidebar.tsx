import React from "react";

import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainList from "./MainList";
import SubList from "./SubList";

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    "& .MuiDrawer-paper": {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: "border-box",
        ...(!open && {
            overflowX: "hidden",
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(4),
            [theme.breakpoints.up("sm")]: {
                width: theme.spacing(9),
            },
        }),
    },
}));

const Sidebar: React.VFC<SidebarProps> = ({ open, setOpen, setCurPage }) => {
    const closeDrawer = () => {
        setOpen(false);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    px: [1],
                }}
            >
                <IconButton onClick={closeDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />

            <MainList setCurPage={setCurPage} />
            <Divider />
            <SubList setCurPage={setCurPage} />
        </Drawer>
    );
};

export default Sidebar;
