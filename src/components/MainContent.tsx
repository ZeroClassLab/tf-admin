import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chart from "./Chart";
import DetailList from "./DetailList";

interface MainContentProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const MainContent: React.VFC<MainContentProps> = ({
    data,
    setCurPage,
    setCurDatum,
}) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
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

                {/*  */}
                <Grid item xs={12} md={6}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <DetailList
                            data={data}
                            setCurPage={setCurPage}
                            setCurDatum={setCurDatum}
                            smallMode
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainContent;
