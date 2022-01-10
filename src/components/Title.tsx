import React from "react";
import Typography from "@mui/material/Typography";

interface TitleProps {
    children?: React.ReactNode;
}

const Title: React.VFC<TitleProps> = (props) => {
    return (
        <Typography component="h3" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
};

export default Title;
