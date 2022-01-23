import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { currentPageState, surveyContentDataListState } from "../recoils";
import {
    surveyTypeState,
    stepperState,
    sectionState,
    contentsState,
    nowSurveyObjectIdState,
    nowSurveyInfoState,
} from "./recoils";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TitleGrid from "../main/TitleGrid";
import AddPaper from "./AddPaper";
import EditPaper from "./EditPaper";
import { SurveySchema } from "./interfaces";

const SurveyFormPage = () => {
    const surveyContentList = useRecoilValue(surveyContentDataListState);
    const [surveyType, setSurveyType] = useRecoilState(surveyTypeState);
    const setStepper = useSetRecoilState(stepperState);
    const [section, setSection] = useRecoilState(sectionState);
    const setContents = useSetRecoilState(contentsState);
    const setCurPage = useSetRecoilState(currentPageState);
    const setNowSurveyObjectId = useSetRecoilState(nowSurveyObjectIdState);
    const setNowSurveyInfo = useSetRecoilState(nowSurveyInfoState);

    const openTheSurvey = (idx: number) => {
        const surveyInfo = surveyContentList[idx];
        setNowSurveyInfo({
            name: surveyInfo.name,
            authors: surveyInfo.authors,
            isCoEditable: surveyInfo.isCoEditable,
            isPublished: surveyInfo.isPublished,
            isSelected: surveyInfo.isSelected,
        });

        setNowSurveyObjectId(surveyInfo._id);

        const schema = JSON.parse(surveyInfo.schemaString) as SurveySchema;
        setSurveyType(schema.type);
        setStepper(schema.stepper);
        setSection(schema.section);
        setContents(schema.contents);

        setCurPage(30);
    };

    const showPreview = (idx: number) => {
        const surveyInfo = surveyContentList[idx];
        const schema = JSON.parse(surveyInfo.schemaString) as SurveySchema;
        // console.log(surveyInfo?.modifiedDate);
        const modifiedDate = surveyInfo?.modifiedDate
            ? new Date(surveyInfo.modifiedDate).toLocaleString("ko-KR")
            : "";
        // console.log(modifiedDate);
        return {
            section: schema.section[0],
            contents: schema.contents[0],
            modifiedDate,
            surveyType: schema.type,
        };
    };

    // const [] =
    return (
        <Box sx={{ mt: 4, mb: 4 }}>
            <Grid container>
                <TitleGrid sx={{ ml: 3 }} text={"인터뷰 질문들"} />
                <Grid item xs={12} flexWrap={"wrap"} display={"flex"}>
                    {surveyContentList.map((surveyContentData, idx) => {
                        return (
                            <EditPaper
                                key={`surveypaper-${idx}`}
                                onClick={() => {
                                    openTheSurvey(idx);
                                }}
                                title={surveyContentData.name}
                                preview={
                                    showPreview(idx) ?? {
                                        section: {
                                            title: "",
                                            subtitle: "",
                                            lastModified: "",
                                        },
                                        type: [{ label: "" }],
                                    }
                                }
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
