import React from "react";
import Paper from "@mui/material/Paper";
import SubmitButton from "./sidebar/SubmitButton";

const Bottom = () => {
    return (
        <Paper
            sx={{
                height: "100%",
                width: "100%",
                textAlign: "center",
                pt: 3,
            }}
        >
            <SubmitButton />
        </Paper>
    );
};

export default Bottom;
