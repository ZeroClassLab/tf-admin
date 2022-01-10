import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import Title from "../Title";
import Chart from "./Chart";
import DetailList from "./DetailList";

interface V1MainContentProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const V1MainContent: React.VFC<V1MainContentProps> = ({
    data,
    setCurDatum,
}) => {
    return (
        <>
            {/* Section Title */}
            <Grid item xs={12}>
                <Typography variant="h4" component="h3">
                    Cafe Form v.1
                </Typography>
            </Grid>

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
        </>
    );
};

export default V1MainContent;
