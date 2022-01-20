import React from "react";
import { Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useLocalStorage } from "./useLocalStorage";
import { ChoiceLabel } from "../interfaces";

interface RadioInputFieldProps {
    id: string;
    name: string;
    label: string;
    localStorageValueKey: string;

    control: any;
    formState: any;

    choices?: ChoiceLabel[];
}

const RadioInputField: React.VFC<RadioInputFieldProps> = ({
    id,
    name,
    label,
    localStorageValueKey,

    control,
    formState,

    choices,
}) => {
    const [value, setValue] = useLocalStorage(localStorageValueKey, "");
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl sx={{ mt: 2, mb: 2 }} component="fieldset">
                    <FormLabel
                        error={!!formState.errors?.[name]}
                        component="legend"
                    >
                        {label}
                    </FormLabel>
                    <RadioGroup
                        {...field}
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                            return field.onChange(e.target.value);
                        }}
                        aria-label={id}
                        name={name}
                    >
                        {choices?.map((choice) => {
                            return (
                                <FormControlLabel
                                    value={choice.value}
                                    control={<Radio />}
                                    label={choice.label}
                                />
                            );
                        })}
                    </RadioGroup>
                    <FormHelperText error={!!formState.errors?.[name]}>
                        {formState.errors && formState.errors?.[name]?.message}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default RadioInputField;
