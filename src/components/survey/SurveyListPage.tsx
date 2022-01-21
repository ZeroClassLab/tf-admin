import { useRecoilValue, useSetRecoilState } from "recoil";
import { currentPageState, surveyContentDataListState } from "../recoils";
import {
    surveyTypeState,
    stepperState,
    sectionState,
    contentsState,
} from "./recoils";

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
    const setSurveyType = useSetRecoilState(surveyTypeState);
    const setStepper = useSetRecoilState(stepperState);
    const setSection = useSetRecoilState(sectionState);
    const setContents = useSetRecoilState(contentsState);
    const setCurPage = useSetRecoilState(currentPageState);

    const openTheSurvey = (idx: number) => {
        const surveyInfo = surveyContentList[idx];

        const schema = JSON.parse(surveyInfo.schemaString);
        setSurveyType(schema.type);
        setStepper(schema.stepper);
        setSection(schema.section);
        setContents(schema.contents);

        setCurPage(30);
    };

    // const [] =
    return (
        <Box sx={{ m: 3, p: 2 }}>
            <Grid container>
                <TitleGrid text={"질문 폼"} />
                <Grid item xs={12} flexWrap={"wrap"} display={"flex"}>
                    {surveyContentList.map((surveyContentData, idx) => {
                        return (
                            <EditPaper
                                key={`surveypaper-${idx}`}
                                onClick={() => {
                                    openTheSurvey(idx);
                                }}
                                title={surveyContentData.name}
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
