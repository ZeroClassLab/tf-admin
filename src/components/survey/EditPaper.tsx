import { EditPaperProps } from "./interfaces";
import SurveyPaper from "./SurveyPaper";

const EditPaper: React.VFC<EditPaperProps> = ({ onClick, title }) => {
    return (
        <SurveyPaper onClick={onClick}>
            <div>{title}</div>
        </SurveyPaper>
    );
};

export default EditPaper;
