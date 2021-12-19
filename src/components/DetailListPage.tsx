import React from "react";
import Container from "@mui/material/Container";
import DetailList from "./DetailList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface DataProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
    setCurPage: React.Dispatch<React.SetStateAction<number>>;
}

const DetailListPage: React.VFC<DataProps> = ({
    data,
    setCurDatum,
    setCurPage,
}) => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        sx={{
                            width: "100%",
                            height: "100px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ p: 2 }} variant="h5">
                            특정 행을 클릭하면 해당 글을 확인할 수 있어요!
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ width: "100%", height: "400px" }}>
                        <DetailList
                            data={data}
                            setCurPage={setCurPage}
                            setCurDatum={setCurDatum}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DetailListPage;
