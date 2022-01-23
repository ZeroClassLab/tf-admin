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
import {
    nowSurveyObjectIdState,
    nowSurveyInfoState,
    surveyTypeState,
    stepperState,
    sectionState,
    contentsState,
    activeStepState,
} from "./recoils";

const AddPaper = () => {
    // const useSetRecoilState;
    const setCurPage = useSetRecoilState(currentPageState);
    const setNowSurveyObjectId = useSetRecoilState(nowSurveyObjectIdState);
    const setNowSurveyInfo = useSetRecoilState(nowSurveyInfoState);
    const setSurveyType = useSetRecoilState(surveyTypeState);
    const setStepper = useSetRecoilState(stepperState);
    const setSection = useSetRecoilState(sectionState);
    const setContents = useSetRecoilState(contentsState);
    const setActiveStep = useSetRecoilState(activeStepState);

    const resetSurvey = () => {
        setNowSurveyInfo({
            name: "newName",
            authors: "",
            isCoEditable: true,
            isPublished: true,
            isSelected: false,
            type: "cafe", // NOTE 스키마를 수정하는 바람에 어쩔 수 없이 넣은 literal 값. 추후에 수정
        });

        setNowSurveyObjectId("");

        setSurveyType("cafe");
        setStepper([{ label: "" }]);
        setSection([{ title: "", subtitle: "" }]);
        setContents([[]]);
        setActiveStep(0);

        setCurPage(30);
    };

    return (
        <SurveyPaper
            onClick={() => {
                resetSurvey();
                setNowSurveyObjectId("");
                setCurPage(30);
            }}
        >
            <AddCircleOutlineIcon sx={{ fontSize: 50 }} />
        </SurveyPaper>
    );
};

export default AddPaper;
