import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import TitleGrid from "./main/TitleGrid";
import V1MainCotent from "./v1/V1MainContent";
import Snowfall from "react-snowfall";

interface MainContentProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const MainContent: React.VFC<MainContentProps> = ({ data, setCurDatum }) => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3} sx={{ mt: 1, mb: 4 }}>
                <TitleGrid text={"Form Service v2.0"} />
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            minHeight: 300,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h2">준비중...</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 4, mb: 3 }}>
                <V1MainCotent data={data} setCurDatum={setCurDatum} />
            </Grid>

            <Grid container spacing={3} sx={{ mt: 4, mb: 3 }}>
                <TitleGrid text={"멋진 동료들!"} />
                <Grid item xs={6}>
                    <Paper
                        sx={{
                            height: 360,
                            p: 2,
                            minWidth: 530,
                            position: "relative",
                            background: `url(/image.png)`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            filter: "brightness(0.8) ",
                        }}
                    >
                        <Snowfall />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainContent;
