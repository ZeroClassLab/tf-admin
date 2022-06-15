import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import TitleGrid from "../main/TitleGrid";
import {
    currentFormContentData,
    currentPageState,
    formContentDataListState,
    isLoadingState,
} from "../recoils";

import Title from "../Title";
import Chart from "./Chart";
import DetailList from "./DetailList";

interface V1MainContentProps {}

const V1MainContent: React.VFC<V1MainContentProps> = () => {
    const [curDatum, setCurDatum] = useRecoilState(currentFormContentData);
    const [data, setData] = useRecoilState(formContentDataListState);
    const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
    const setCurPage = useSetRecoilState(currentPageState);

    useEffect(() => {}, []);

    useEffect(() => {
        if (data.length > 0) {
            setCurDatum(data[0]);
        } else {
            setIsLoading(true);
            const fetchData = async () => {
                // 폼 데이터 불러오기 v1
                const resv1 = await axios.get(
                    `${process.env.REACT_APP_V1_BACK}/form/`
                );
                setData(resv1.data);
            };
            fetchData();
        }
    }, [data]);

    useEffect(() => {
        if (Object.keys(curDatum).length > 0) {
            setIsLoading(false);
        }
    }, [curDatum]);

    useEffect(() => {
        console.log("isLoading: ", isLoading);
    }, [isLoading]);

    return (
        <Grid container sx={{ p: 2 }} spacing={2}>
            {/* Section Title */}
            <TitleGrid text={"Cafe Form v.1"} />

            {/* Chart */}
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: 330,
                    }}
                >
                    <Chart
                        contacts={data.map((datum: any) => {
                            return datum["contact"];
                        })}
                    />
                </Paper>
            </Grid>

            {/* DetailList */}
            <Grid item xs={12} md={6}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: 330,
                    }}
                >
                    <Title>제출 목록</Title>
                    <DetailList
                        data={data}
                        setCurDatum={setCurDatum}
                        smallMode
                    />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper
                    sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        minHeight: 330,
                    }}
                >
                    <Title>기능</Title>
                    <Button
                        onClick={() => {
                            setCurPage(1);
                        }}
                    >
                        리스트
                    </Button>
                    <Button
                        onClick={() => {
                            setCurPage(2);
                        }}
                    >
                        보던 거
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default V1MainContent;
