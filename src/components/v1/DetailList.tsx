import React, { useEffect, useState } from "react";

import { useRecoilState } from "recoil";
import { currentPageState } from "../recoils";

import {
    DataGrid,
    GridRowsProp,
    GridColDef,
    GridRowParams,
} from "@mui/x-data-grid";

interface DataProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    smallMode?: boolean;
}
/**
 * name: str = Field(...)
    contact: str = Field(...)
    email: str = Field(...)
    title: str = Field(...)
    cafeName: str = Field(...)
    cafeClosedDays: str = Field(...)
    cafeOpenDays: str = Field(...)
    cafeStreetAddress: str = Field(...)
    cafeBuildingAddress: str = Field(...)
    cafeSignatureMenu: str = Field(...)
    cafeMenuImages: list[str]
    cafeIsParkingAvailable: str = Field(...)
    cafeIsDeliveryAvailable: str = Field(...)
    cafeIsPetAllowed: str = Field(...)
    cafeIsChildrenAllowed: str = Field(...)
    cafePhone: str = Field(...)

    cafeInstagram: str = Field(...)
    cafeYoutube: str = Field(...)
    cafeFacebook: str = Field(...)

    cafeIntroduction: str = Field(...)
    cafeStartupStory: str = Field(...)
    cafeStartupDifficulty: str = Field(...)
    cafeStartupPreparationTime: str = Field(...)
    cafeStartupItemSearchTimeSpent: str = Field(...)
    cafeStartupMarketingMethod: str = Field(...)
    cafeStartupInteriorMethod: str = Field(...)
    cafeStartupExpense: str = Field(...)
    code: str = Field(...)
    productTagImages: list[str]
    productTagImageDescriptions: list[str]
    productTags: list[ProductTag]
 */
const DetailList: React.VFC<DataProps> = ({ data, setCurDatum, smallMode }) => {
    const [checkedRows, setCheckedRows] = useState<number[]>([]);
    const [curPage, setCurPage] = useRecoilState(currentPageState);

    useEffect(() => {
        const checkeds = JSON.parse(localStorage.getItem("checkeds") || "[]");
        const cRows = [];
        for (let i = 0; i < data.length; i++) {
            checkeds.indexOf(data[i].contact) !== -1
                ? cRows.push(1)
                : cRows.push(0);
        }
        setCheckedRows(cRows);
    }, []);

    const rows: GridRowsProp = data.map((datum, idx) => {
        return {
            id: idx,
            col1: datum.contact,
            col2: datum.name,
            col3: datum.cafeName,
            col4: datum.email,
            col5: checkedRows[idx] ? "✅" : "❌",
        };
    });
    const columns: GridColDef[] = [
        {
            field: "col5",
            headerName: "확인",
            width: 80,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "col2",
            headerName: "성함",
            width: 120,
            headerAlign: "center",
            align: "center",
        },

        {
            field: "col3",
            headerName: "카페명",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
        {
            field: "col1",
            headerName: "연락처",
            width: 150,
            headerAlign: "center",
            align: "right",
        },
        {
            field: "col4",
            headerName: "이메일",
            width: 150,
            headerAlign: "center",
            align: "center",
        },
    ];

    const handleRowClick = (param: GridRowParams) => {
        setCurDatum(data[Number(param.id)]);
        setCurPage(2);
    };

    return (
        <DataGrid
            rows={rows}
            columns={smallMode ? columns.slice(0, 3) : columns}
            onRowClick={handleRowClick}
        />
    );
};

export default DetailList;
