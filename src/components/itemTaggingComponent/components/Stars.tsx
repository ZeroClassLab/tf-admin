import { AiFillStar } from "react-icons/ai";
import { StarsProps } from "../interfaces/props";

const Stars: React.VFC<StarsProps> = ({
    index,
    rating,
    size = 22,
    onSaveRating = () => {},
}) => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            {[...Array(index)].map((n, idx) => (
                <div
                    key={`star${idx}`}
                    onClick={() => onSaveRating(idx + 1)}
                    style={{ cursor: "pointer" }}
                >
                    <AiFillStar
                        color={idx < rating ? "#ffdb58" : "#bdbdbd"}
                        size={size}
                    />
                </div>
            ))}
        </div>
    );
};

export default Stars;
