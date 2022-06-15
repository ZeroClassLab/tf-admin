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
                    setCurPage(-44);
                }}
            >
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="아카이브" />
            </ListItem>
        </List>
    );
};

export default SubList;
