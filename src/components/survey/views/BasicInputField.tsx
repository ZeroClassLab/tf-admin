import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useLocalStorage } from "./useLocalStorage";

interface BasicInputFieldProps {
    id: string;
    name: string;
    label: string;
    autoComplete: string;
    localStorageValueKey: string;

    isMultiline?: boolean;
    maxRowsNum?: number;

    control: any;
    formState: any;
}

const BasicInputField: React.VFC<BasicInputFieldProps> = ({
    id,
    name,
    label,
    autoComplete,
    localStorageValueKey,

    control,
    formState,

    isMultiline = false,
    maxRowsNum,
}) => {
    const [value, setValue] = useLocalStorage(localStorageValueKey, "");
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <FormControl
                        sx={{
                            mt: isMultiline ? 3 : 2,
                            mb: isMultiline ? 3 : 2,
                        }}
                    >
                        <TextField
                            sx={{ width: isMultiline ? "100%" : "60%" }}
                            id={id}
                            label={label}
                            variant={isMultiline ? "outlined" : "standard"}
                            multiline={isMultiline}
                            rows={isMultiline ? maxRowsNum : undefined}
                            autoComplete={autoComplete ?? name}
                            {...field}
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                                return field.onChange(e.target.value);
                            }}
                            error={!!formState.errors?.[name]}
                        />
                        <FormHelperText error={!!formState.errors?.[name]}>
                            {formState.errors &&
                                formState.errors?.[name]?.message}
                        </FormHelperText>
                    </FormControl>
                )}
            />
        </>
    );
};

export default BasicInputField;
