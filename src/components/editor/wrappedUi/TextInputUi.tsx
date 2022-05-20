import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface TextInputUiProps {
    label: string;
    value: string;
    handleChange: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void;
}

const TextInputUi: React.VFC<TextInputUiProps> = ({
    label,
    value,
    handleChange,
}) => {
    return (
        <Box sx={{ p: 2, display: "flex" }}>
            <TextField
                label={label}
                fullWidth
                value={value}
                onChange={handleChange}
            />
        </Box>
    );
};

export default TextInputUi;
