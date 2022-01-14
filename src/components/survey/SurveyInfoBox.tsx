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
        <Box>
            <Box sx={{ m: 2 }}>
                <Typography variant="h4">서베이 제목</Typography>
            </Box>

            <Box sx={{ m: 2 }}>
                <BasicBlank
                    state={nowSurveyInfo.name}
                    setState={handleSurveyName}
                    isFullWidth
                    placeholder="서베이 제목을 반드시 입력해주세요."
                />
            </Box>
        </Box>
    );
};

export default SurveyInfoBox;
