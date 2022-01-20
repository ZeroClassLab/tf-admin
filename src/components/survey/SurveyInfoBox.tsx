import { useRecoilState } from "recoil";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { nowSurveyInfoState } from "./recoils";
import BasicBlank from "./BasicBlank";

const SurveyInfoBox = () => {
    const [nowSurveyInfo, setNowSurveyInfo] =
        useRecoilState(nowSurveyInfoState);

    const handleSurveyName = (val: string) => {
        const newSurveyInfo = {
            ...nowSurveyInfo,
            name: val,
        };
        setNowSurveyInfo(newSurveyInfo);
    };
    // todo
    const handleSurveyType = (val: string) => {};

    return (
        <Box sx={{ mt: 5, mb: 5 }}>
            <BasicBlank
                state={nowSurveyInfo.name}
                setState={handleSurveyName}
                isFullWidth
                placeholder="서베이 제목을 반드시 입력해주세요."
                label="서베이 제목"
            />
        </Box>
    );
};

export default SurveyInfoBox;
