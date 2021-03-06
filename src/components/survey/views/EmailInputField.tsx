import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import { useLocalStorage } from "./useLocalStorage";

interface EmailInputFieldProps {
    id: string;
    name: string;
    label: string;
    autoComplete: string;
    localStorageValueKey: string;

    control: any;
    formState: any;
}

const EmailInputField: React.VFC<EmailInputFieldProps> = ({
    id,
    name,
    label,
    autoComplete,
    localStorageValueKey,

    control,
    formState,
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
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        <TextField
                            sx={{ width: "60%" }}
                            id={id}
                            label={label}
                            variant={"standard"}
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

export default EmailInputField;
