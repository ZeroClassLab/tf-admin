import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRecoilState } from "recoil";
import { infoTableKeyValueState } from "./recoils";
import { InfoRowProps } from "./interfaces";
import IconButton from "@mui/material/IconButton";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button from "@mui/material/Button";

interface InfoCellProps {
    v: string;
    rowIndex: number;
    colIndex: number;
}

const InfoCell: React.VFC<InfoCellProps> = ({ v, rowIndex, colIndex }) => {
    const [d, setD] = useRecoilState(infoTableKeyValueState);
    const handleChange = (newVal: string) => {
        const newD = d.map((row, idx) => {
            const key = row.key;
            const value = row.value;
            if (rowIndex === idx) {
                if (colIndex === 0) {
                    return {
                        key: newVal,
                        value,
                    };
                } else {
                    return {
                        key,
                        value: newVal,
                    };
                }
            }
            return row;
        });
        setD(newD);
    };

    return (
        <textarea
            style={{
                margin: 8,
                height: 24,
                textAlign: "center",
                textAlignLast: "center",
                resize: "none",
            }}
            onKeyDown={(e) => {
                const keyName = e.key;
                if (keyName === "Enter") {
                    e.preventDefault();
                }
                console.log(e.key);
            }}
            rows={1}
            value={v}
            onChange={(e) => {
                handleChange(e.target.value);
            }}
            maxLength={20}
        />
    );
};

const InfoHead = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1 }}>키</Box>
            <Box sx={{ flex: 1 }}>값</Box>
        </Box>
    );
};

const InfoRow: React.VFC<InfoRowProps> = ({ k, v, rowIndex }) => {
    const [d, setD] = useRecoilState(infoTableKeyValueState);

    const removeSelf = () => {
        const newD = d.filter((_row, idx) => {
            return idx !== rowIndex;
        });
        setD(newD);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <InfoCell v={k} rowIndex={rowIndex} colIndex={0} />
            <InfoCell v={v} rowIndex={rowIndex} colIndex={1} />
            <IconButton
                onClick={() => {
                    removeSelf();
                }}
            >
                <RemoveCircleOutlineIcon />
            </IconButton>
        </Box>
    );
};

const InfoTable = () => {
    const [data, setData] = useRecoilState(infoTableKeyValueState);
    const addRow = () => {
        setData([...data, { key: "", value: "" }]);
    };

    return (
        <Box sx={{ mt: 2, ml: 1, mr: 1 }}>
            <Typography variant="h5" sx={{ pb: 1 }}>
                정보테이블
            </Typography>
            <InfoHead />
            {data.map((row, idx) => {
                return (
                    <InfoRow
                        rowIndex={idx}
                        key={`info-table-row-${idx}`}
                        k={row.key}
                        v={row.value}
                    />
                );
            })}
            <Box sx={{ m: 2 }}>
                <Button onClick={addRow} variant="contained" fullWidth>
                    행 추가
                </Button>
            </Box>
        </Box>
    );
};

export default InfoTable;
