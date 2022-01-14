import Infos from "./Infos";
import { useRecoilState } from "recoil";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";

import { isSurveyViewModeState, nowSurveyInfoState } from "./recoils";
import axios from "axios";
import SurveyInfoBox from "./SurveyInfoBox";
import InputFieldSettings from "./InputFieldSettings";

const WriteSurveyPage = () => {
    const [isViewMode, setIsViewMode] = useRecoilState(isSurveyViewModeState);
    const [surveyInfo, setSurveyInfo] = useRecoilState(nowSurveyInfoState);

    const saveSurvey = async () => {
        // axios.post(`${process.env.REACT_APP_SURVEY_BACK}/form`, {});
        console.log(surveyInfo);
    };

    return (
        <Paper sx={{ m: 3, p: 2 }}>
            <SurveyInfoBox />
            <Button variant="contained" onClick={saveSurvey}>
                저장하기
            </Button>

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
            <Infos />
            <InputFieldSettings />
        </Paper>
    );
};

export default WriteSurveyPage;
