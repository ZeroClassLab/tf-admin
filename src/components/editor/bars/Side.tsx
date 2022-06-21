import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import ThumbnailUploaders from "../sidebar/ThumbnailUploaders";
import InfoTable from "../infotable/InfoTable";
import { useRecoilValue, useRecoilState } from "recoil";
import { formBoardTypeState } from "../recoils";
import { infoTableKeyValueState } from "../infotable/recoils";
import HashtagChipSelect from "../../form-tools/HashtagChipSelect";
import { boardTypeListState } from "../../servicetype/recoils";

const infoTableDefaultValue = [
    { key: "지역", value: "" },
    { key: "전화번호", value: "" },
    { key: "초기비용", value: "" },
    { key: "인스타", value: "" },
    { key: "평수", value: "" },
    { key: "휴무일", value: "" },
    { key: "영업시간", value: "" },
    { key: "주차여부", value: "" },
    { key: "애견동반", value: "" },
    { key: "키즈", value: "" },
];

/**
 * 편집페이지에서 오른쪽에 부분
 * @returns
 */
const Side = () => {
    const [curBoard, setCurBoard] = useRecoilState(formBoardTypeState);
    const boardTypeList = useRecoilValue(boardTypeListState);
    const [infoTable, setInfoTable] = useRecoilState(infoTableKeyValueState);

    useEffect(() => {
        setCurBoard(boardTypeList[0]);
    }, []);

    useEffect(() => {
        console.log("지금 boardList", boardTypeList);
    }, [boardTypeList]);

    useEffect(() => {
        console.log("지금 curBoard", curBoard);
        console.log("지금 infoTable", infoTable);
        if (infoTable === undefined) {
            if (curBoard?.name === "story") {
                setInfoTable(infoTableDefaultValue);
            } else if (curBoard) {
                setInfoTable([]);
            }
        }
    }, [curBoard, infoTable]);

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
            <HashtagChipSelect />
            <InfoTable />
        </Paper>
    );
};

export default Side;
