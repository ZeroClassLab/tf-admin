import { useSetRecoilState } from "recoil";
// import {
//     surveyTypeState,
//     stepperState,
//     sectionState,
//     ContentsState,
//     activeStepState,
//     isSurveyViewModeState,
// } from "./recoils";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SurveyPaper from "./SurveyPaper";
import { currentPageState } from "../recoils";
import { nowSurveyObjectIdState } from "./recoils";

const AddPaper = () => {
    // const useSetRecoilState;
    const setCurPage = useSetRecoilState(currentPageState);
    const setNowSurveyObjectId = useSetRecoilState(nowSurveyObjectIdState);

    return (
        <SurveyPaper
            onClick={() => {
                setNowSurveyObjectId("");
                setCurPage(30);
            }}
        >
            <AddCircleOutlineIcon sx={{ fontSize: 50 }} />
        </SurveyPaper>
    );
};

export default AddPaper;
