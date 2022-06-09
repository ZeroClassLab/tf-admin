import React from "react";
import Box from "@mui/material/Box";
import { useRecoilValue } from "recoil";
import { infoTableKeyValueState } from "./recoils";
import { InfoRowProps } from "./interfaces";

const InfoCell = () => {
    return (
        <textarea
            style={{
                margin: 8,
                height: 24,
                textAlign: "center",
                textAlignLast: "center",
                resize: "none",
            }}
            rows={1}
            onKeyDown={(e) => {
                const keyName = e.key;
                if (keyName === "Enter" || keyName === " ") {
                    e.preventDefault();
                }
                console.log(e.key);
            }}
            maxLength={15}
        />
    );
};

const InfoRow: React.VFC<InfoRowProps> = ({ k, v }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <InfoCell />
            <InfoCell />
        </Box>
    );
};

const InfoTable = () => {
    const data = useRecoilValue(infoTableKeyValueState);
    return (
        <Box>
            {data.map((row) => {
                return <InfoRow key={row.key} k={row.key} v={row.value} />;
            })}
        </Box>
    );
};

export default InfoTable;
