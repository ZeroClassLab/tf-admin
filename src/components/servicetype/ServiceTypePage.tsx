import React, { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TitleGrid from "../main/TitleGrid";
import ServicePanel from "./ServicePanel";
import axios from "axios";

interface Service {
    name: string;
    isValid: boolean;
    id: string;
}

const ServiceTypePage = () => {
    const [panelData, setPanelData] = useState<Service[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(
                `${process.env.REACT_APP_SURVEY_BACK}/formtype`
            );
            console.log(data.data);
            setPanelData(data.data);
        };
        fetchData();
    }, []);
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <TitleGrid text={"현재 서비스 중인 폼 목록"} />
                <Grid item xs={12} md={12} lg={12} xl={6}>
                    <Paper sx={{ p: 4 }}>
                        <Typography sx={{ mb: 3 }} variant="h3">
                            Service List
                        </Typography>
                        {panelData.map((panelDatum, idx) => {
                            return (
                                <ServicePanel
                                    key={`service-panel-${idx}`}
                                    {...panelDatum}
                                />
                            );
                        })}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={12} xl={6}>
                    <Paper
                        sx={{
                            p: 2,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Typography variant="h3">업데이트 중...</Typography>
                        <Typography sx={{ mt: 2 }} variant="body1">
                            서비스 목록 추가, 삭제, 배포 및 배포 취소 기능 구현
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ServiceTypePage;
