import React from "react";
import TextField from "@mui/material/TextField";

interface BasicBlankProps {
    state: string;
    setState: (value: string, idx?: number) => void;
    onClick?: () => void;
    isLong?: boolean;
    isStandard?: boolean;
    isFullWidth?: boolean;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
    label?: string;
    sx?: any;
    required?: boolean;
}

const BasicBlank: React.VFC<BasicBlankProps> = ({
    state,
    setState,
    onClick,
    isLong,
    isStandard,
    isFullWidth,
    placeholder,
    error,
    helperText,
    label,
    sx,
    required,
}) => {
    return (
        <TextField
            value={state}
            onClick={onClick}
            onChange={(e) => setState(e.target.value)}
            multiline={isLong ? true : false}
            variant={isLong || isStandard ? "standard" : "outlined"}
            fullWidth={isFullWidth}
            placeholder={placeholder}
            helperText={helperText}
            error={error}
            label={label}
            sx={sx}
            required={required}
        />
    );
};

export default BasicBlank;
