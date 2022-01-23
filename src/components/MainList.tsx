import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import CreateIcon from "@mui/icons-material/Create";
import RoomServiceIcon from "@mui/icons-material/RoomService";

import PreviewIcon from "@mui/icons-material/Preview";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";

interface MainListProps {
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const MainList: React.VFC<MainListProps> = ({ setCurPage }) => {
    return (
        <List>
            {/* Main Button */}
            <ListItem
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
                button
                onClick={() => {
                    setCurPage(51);
                }}
            >
                <ListItemIcon>
                    <PreviewIcon />
                </ListItemIcon>
                <ListItemText primary="폼 뷰어" />
            </ListItem>

            <ListItem
                button
                onClick={() => {
                    setCurPage(52);
                }}
            >
                <ListItemIcon>
                    <FormatColorTextIcon />
                </ListItemIcon>
                <ListItemText primary="폼 에디터" />
            </ListItem>
        </List>
    );
};

export default MainList;
