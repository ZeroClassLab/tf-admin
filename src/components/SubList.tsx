import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";

interface SubListProps {
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const SubList: React.VFC<SubListProps> = ({ setCurPage }) => {
    return (
        <List>
            <ListSubheader inset>개발 중...</ListSubheader>
            <ListItem
                button
                onClick={() => {
                    setCurPage(2);
                }}
            >
                <ListItemIcon>
                    <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="뷰어" />
            </ListItem>
            <ListItem
                button
                onClick={() => {
                    setCurPage(3);
                }}
            >
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText primary="에디터" />
            </ListItem>
        </List>
    );
};

export default SubList;
