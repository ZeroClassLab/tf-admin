import React from "react";
import TextField from "@mui/material/TextField";

interface BasicBlankProps {
    state: string;
    setState: (value: string) => void;
}

const BasicBlank: React.VFC<BasicBlankProps> = ({ state, setState }) => {
    return (
        <TextField value={state} onChange={(e) => setState(e.target.value)} />
    );
};

export default BasicBlank;
