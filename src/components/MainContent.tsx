import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import V1MainCotent from "./v1/V1MainContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TitleGrid from "./main/TitleGrid";
import Infos from "./survey/Infos";
import CroppableItemTagger from "./itemTaggingComponent/CroppableItemTagger";
import {
    itemTaggerCropInfoState,
    itemTaggerImageInputState,
    itemTaggerOriginalFilesState,
    itemTaggerImageMaxNumState,
} from "./survey/mock/CroppableItemTaggerMockups";
import { useRecoilValue } from "recoil";

interface MainContentProps {
    data: { [key: string]: any }[];
    setCurDatum: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
}

const MainContent: React.VFC<MainContentProps> = ({ data, setCurDatum }) => {
    const itemTaggerImageMaxNum = useRecoilValue(itemTaggerImageMaxNumState);
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <TitleGrid text={"어음"} />
                <Grid item xs={12}>
                    <CroppableItemTagger
                        taggedImagesRecoil={itemTaggerImageInputState}
                        originalFilesRecoil={itemTaggerOriginalFilesState}
                        cropInfosRecoil={itemTaggerCropInfoState}
                        imageMaxNum={itemTaggerImageMaxNum}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2 }}>{/* <Infos data={data} /> */}</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <V1MainCotent data={data} setCurDatum={setCurDatum} />
            </Grid>
        </Container>
    );
};

export default MainContent;
