import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";

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

            {/* Detail Button */}
            <ListItem
                button
                onClick={() => {
                    setCurPage(1);
                }}
            >
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="상세보기" />
            </ListItem>
        </List>
    );
};

export default MainList;
