import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BarChartIcon from "@mui/icons-material/BarChart";

interface SubListProps {
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const SubList: React.VFC<SubListProps> = ({ setCurPage }) => {
    return (
        <List>
            <ListSubheader inset>기존 카페 폼</ListSubheader>

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
                <ListItemText primary="v1 카페 폼 목록" />
            </ListItem>

            <ListItem
                button
                onClick={() => {
                    setCurPage(2);
                }}
            >
                <ListItemIcon>
                    <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="v1 카페 폼 뷰어" />
            </ListItem>

            <ListItem
                button
                onClick={() => {
                    setCurPage(54);
                }}
            >
                <ListItemIcon>
                    <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="에디터테스트" />
            </ListItem>
        </List>
    );
};

export default SubList;
