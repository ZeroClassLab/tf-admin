import { useEffect } from "react";
import Infos from "./Infos";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";

import {
    isSurveyViewModeState,
    nowSurveyInfoState,
    stepperState,
    sectionState,
    contentsState,
    surveyTypeState,
    nowSurveyObjectIdState,
    selectedSurveyObjectIdState,
} from "./recoils";
import axios from "axios";
import SurveyInfoBox from "./SurveyInfoBox";
import InputFieldSettings from "./InputFieldSettings";
import AddQuestionButton from "./AddQuestionButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const WriteSurveyPage = () => {
    const [isViewMode, setIsViewMode] = useRecoilState(isSurveyViewModeState);
    const [surveyInfo, setSurveyInfo] = useRecoilState(nowSurveyInfoState);
    const stepper = useRecoilValue(stepperState);
    const section = useRecoilValue(sectionState);
    const contents = useRecoilValue(contentsState);
    const surveyType = useRecoilValue(surveyTypeState);
    const nowSurveyObjectId = useRecoilValue(nowSurveyObjectIdState);
    const [selectedSurveyObjectId, setSelectedSurveyObjectId] = useRecoilState(
        selectedSurveyObjectIdState
    );
    const theme = useTheme();
    const isOverMd = useMediaQuery(theme.breakpoints.up("md"));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const d = await axios.get(
                    `${process.env.REACT_APP_SURVEY_BACK}/survey/selected`
                );
                console.log(d.data._id);
                setSelectedSurveyObjectId(d.data._id);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);

    const saveSurvey = async () => {
        // axios.post(`${process.env.REACT_APP_SURVEY_BACK}/form`, {});
        console.log(surveyInfo);
        console.log(stepper);
        console.log(section);
        console.log(contents);
        console.log(surveyType);
        const stringifiedSchema = JSON.stringify({
            stepper,
            section,
            contents,
            type: surveyType,
        });
        const sendingData = {
            ...surveyInfo,
            schemaString: stringifiedSchema,
        };

        console.log(sendingData);
        try {
            const d = await axios.post(
                `${process.env.REACT_APP_SURVEY_BACK}/survey`,
                sendingData
            );
            console.log(d);
        } catch (e) {
            console.log(e);
        }
    };

    const selectSurvey = async () => {
        await axios.patch(
            `${process.env.REACT_APP_SURVEY_BACK}/survey/select/${nowSurveyObjectId}`
        );
        setSelectedSurveyObjectId(nowSurveyObjectId);
    };

    return (
        <Paper
            sx={{
                m: 3,
                pl: 4,
                pr: 4,
                pb: 4,
                overflow: "scroll",
                height: "80vh",
                display: "relative",
            }}
        >
            {/* <Box sx={{ height: 100 }}></Box> */}
            <Grid
                container
                spacing={2}
                sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "rgba(255,255,255, 0.9)",
                    zIndex: 99,
                    pb: 3,
                }}
            >
                <Grid item xs={11} sm={10} md={10} lg={4} xl={isOverMd ? 3 : 4}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isViewMode}
                                    onChange={() => {
                                        setIsViewMode(!isViewMode);
                                    }}
                                />
                            }
                            label="미리보기"
                        />
                    </FormGroup>
                </Grid>

                <Grid
                    item
                    xs={1}
                    sm={2}
                    md={2}
                    lg={2}
                    xl={isOverMd ? 5 : 2}
                ></Grid>

                <Grid item xs={6} sm={6} md={6} lg={6} xl={isOverMd ? 2 : 3}>
                    {!isViewMode && <AddQuestionButton />}
                    {isViewMode && (
                        <Button
                            onClick={selectSurvey}
                            variant="contained"
                            fullWidth
                            disabled={
                                selectedSurveyObjectId === nowSurveyObjectId
                            }
                        >
                            {selectedSurveyObjectId === nowSurveyObjectId
                                ? "선택됨"
                                : "선택하기"}
                        </Button>
                    )}
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={isOverMd ? 2 : 3}>
                    <Button variant="contained" fullWidth onClick={saveSurvey}>
                        저장하기
                    </Button>
                </Grid>
            </Grid>
            {!isViewMode && <SurveyInfoBox />}

            <Infos />
            <InputFieldSettings />
        </Paper>
    );
};

export default WriteSurveyPage;
