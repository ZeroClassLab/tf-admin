import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { surveyContentDataListState } from "../recoils";
// import {
//     surveyTypeState,
//     stepperState,
//     sectionState,
//     ContentsState,
//     activeStepState,
//     isSurveyViewModeState,
// } from "./recoils";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TitleGrid from "../main/TitleGrid";
import AddPaper from "./AddPaper";
import EditPaper from "./EditPaper";

const mockups = [
    {
        name: "예제 폼 이름",
        authors: "[]",
        isCoEditbale: true,
        isPublished: true,
        isSelected: true,
        schemaString: "",
    },
];

const SurveyFormPage = () => {
    const surveyContentList = useRecoilValue(surveyContentDataListState);
    // const [] =
    return (
        <Box sx={{ m: 3, p: 2 }}>
            <Grid container>
                <TitleGrid text={"질문 폼"} />
                <Grid item xs={12} flexWrap={"wrap"} display={"flex"}>
                    {mockups.map((surveyContentData, idx) => {
                        return (
                            <EditPaper
                                key={`surveypaper-${idx}`}
                                onClick={() => {}}
                            />
                        );
                    })}
                    <AddPaper />
                </Grid>
            </Grid>
            {/* <Infos data={{ surveyContentData }} /> */}
        </Box>
    );
};

export default SurveyFormPage;
