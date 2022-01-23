import React from "react";
import { Controller } from "react-hook-form";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { useLocalStorage } from "./useLocalStorage";

interface MoneyInputFieldProps {
    id: string;
    name: string;
    label: string;
    autoComplete: string;
    localStorageValueKey: string;

    control: any;
    formState: any;

    unitMask: string;
}

const MoneyInputField: React.VFC<MoneyInputFieldProps> = ({
    id,
    name,
    label,
    autoComplete,
    localStorageValueKey,

    control,
    formState,
    unitMask,
}) => {
    const [value, setValue] = useLocalStorage(localStorageValueKey, "");

    const getNumbersWithComma = (value: string) => {
        if (value === "") {
            return "";
        }
        value = value.replace(/,/g, "");

        //only number
        if (value.match(/^[0-9]+$/) != null) {
            let number = parseInt(value);
            if (number >= 500000000001) {
                return "999,999,999,999";
            } else {
                return number.toLocaleString();
            }
        } else {
            return value;
        }
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl
                    sx={{ mt: 2, mb: 2, width: "60%" }}
                    error={!!formState.errors?.[name]}
                    component="legend"
                >
                    <TextField
                        id={id}
                        label={label}
                        placeholder="1,000,000,000"
                        variant="standard"
                        autoComplete={autoComplete}
                        {...field}
                        value={value}
                        onChange={(e) => {
                            setValue(getNumbersWithComma(e.target.value));
                            return field.onChange(
                                getNumbersWithComma(e.target.value)
                            );
                        }}
                        error={!!formState.errors?.[name]}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    {unitMask}
                                </InputAdornment>
                            ),
                        }}
                    />

                    <FormHelperText error={!!formState.errors?.[name]}>
                        {formState.errors && formState.errors?.[name]?.message}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
};

export default MoneyInputField;
