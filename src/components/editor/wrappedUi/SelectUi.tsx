import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectUiProps {
    labelId: string;
    label: string;
    value: string;
    handleChange: (event: SelectChangeEvent) => void;
}

const SelectUi: React.FC<SelectUiProps> = ({
    labelId,
    label,
    value,
    handleChange,
    children,
}) => {
    return (
        <Box sx={{ p: 2, display: "flex" }}>
            <FormControl fullWidth>
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    labelId={labelId}
                    value={value}
                    label={label}
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectUi;
