import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRecoilValue } from "recoil";
import { editorSubmitModeState } from "../editor/recoils";

interface SubmitModeAlertToastProps {
    open: boolean;
    onClose: () => void;
}

const SubmitModeAlertToast: React.VFC<SubmitModeAlertToastProps> = ({
    open,
    onClose,
}) => {
    const submitMode = useRecoilValue(editorSubmitModeState);
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert
                // onClose={handleClose}
                severity="info"
                sx={{ width: "100%" }}
            >
                Mode: {submitMode}
            </Alert>
        </Snackbar>
    );
};

export default SubmitModeAlertToast;
