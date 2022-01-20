import Button from "@mui/material/Button";
import { InputFieldType, inputFieldTypeLabelMap } from "./consts";

interface InputFieldTypeButtonProps {
    type: InputFieldType;
    areSameType: (val: InputFieldType) => boolean;
    handleType: (val: InputFieldType) => void;
    disabled?: boolean;
}

const InputFieldTypeButton: React.VFC<InputFieldTypeButtonProps> = ({
    type,
    areSameType,
    handleType,
    disabled,
}) => {
    return (
        <Button
            disabled={disabled}
            fullWidth
            onClick={() => handleType(type)}
            variant={areSameType(type) ? "contained" : "outlined"}
            // sx={{borderRadius: 0}}
        >
            {inputFieldTypeLabelMap[type]}
        </Button>
    );
};

export default InputFieldTypeButton;
