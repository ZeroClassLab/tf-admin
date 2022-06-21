import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import RoomServiceIcon from "@mui/icons-material/RoomService";

import ListAltIcon from "@mui/icons-material/ListAlt";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useRecoilValue } from "recoil";
import { isLoadingState } from "./recoils";

interface MainListProps {
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const MainList: React.VFC<MainListProps> = ({ setCurPage }) => {
    const isReloading = useRecoilValue(isLoadingState);
    return (
        <List>
            {/* Main Button */}
            <ListItem
                disabled={isReloading}
                button
                onClick={() => {
                    setCurPage(0);
                }}
            >
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="메인" />
            </ListItem>

            <ListItem
                disabled={isReloading}
                button
                onClick={() => {
                    setCurPage(3);
                }}
            >
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>
                <ListItemText primary="질문 작성하기" />
            </ListItem>

            <ListItem
                disabled={isReloading}
                button
                onClick={() => {
                    setCurPage(4);
                }}
            >
                <ListItemIcon>
                    <RoomServiceIcon />
                </ListItemIcon>
                <ListItemText primary="서비스 확인하기" />
            </ListItem>
            {/* Detail Button */}
            <ListItem
                disabled={isReloading}
                button
                onClick={() => {
                    setCurPage(50);
                }}
            >
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="폼 목록" />
            </ListItem>

            <ListItem
                disabled={isReloading}
                button
                onClick={() => {
                    setCurPage(52);
                }}
            >
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="폼 작성하기" />
            </ListItem>
        </List>
    );
};

export default MainList;
