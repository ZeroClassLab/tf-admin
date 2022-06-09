import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ThumbnailUploaders from "../sidebar/ThumbnailUploaders";
import InfoTable from "../infotable/InfoTable";

/**
 * 편집페이지에서 오른쪽에 부분
 * @returns
 */
const Side = () => {
    return (
        <Paper
            sx={{
                height: "100%",
                minHeight: 400,
                maxHeight: 672.5,
                width: "100%",
                textAlign: "center",
                pt: 3,
                overflowY: "auto",
            }}
        >
            <ThumbnailUploaders />
            <InfoTable />
        </Paper>
    );
};

export default Side;
