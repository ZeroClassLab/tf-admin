import { EditPaperProps } from "./interfaces";
import SurveyPaper from "./SurveyPaper";

const EditPaper: React.VFC<EditPaperProps> = ({ onClick }) => {
    return (
        <SurveyPaper onClick={onClick}>
            <div>수정화면</div>
        </SurveyPaper>
    );
};

export default EditPaper;
