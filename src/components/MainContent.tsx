import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import V1MainCotent from "./v1/V1MainContent";

interface MainContentProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const MainContent: React.VFC<MainContentProps> = ({ data, setCurDatum }) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <V1MainCotent data={data} setCurDatum={setCurDatum} />
            </Grid>
        </Container>
    );
};

export default MainContent;
