import React, { useState } from "react";

import { Controller } from "react-hook-form";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import { useLocalStorage } from "./useLocalStorage";

import CloseIcon from "@mui/icons-material/Close";

import DaumPostcode from "react-daum-postcode";

interface KakaoAddressInputFieldProps {
    id: string;
    name: string;
    label: string;
    autoComplete: string;
    localStorageValueKey: string;

    control: any;
    formState: any;
}

const KakaoAddressInputField: React.VFC<KakaoAddressInputFieldProps> = ({
    id,
    name,
    label,
    autoComplete,
    localStorageValueKey,

    control,
    formState,
}) => {
    const [cafeIsLocationComplete, setCafeIsLocationComplete] = useLocalStorage(
        `${localStorageValueKey}Complete`,
        ""
    );
    const [cafeLocationDetail, setCafeLocationDetail] = useLocalStorage(
        `${localStorageValueKey}Detail`,
        ""
    );

    const [value, setValue] = useState("");

    const handleAddressComplete = (data: any) => {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }
        setValue(fullAddress);
        setCafeIsLocationComplete(!cafeIsLocationComplete);

        return fullAddress;
    };
    return (
        <>
            {!cafeIsLocationComplete ? (
                <>
                    <FormLabel sx={{ mt: 4 }} component="legend">
                        카페 주소를 입력해주세요
                    </FormLabel>
                    {/* <FormHelperText error={!cafeLocation}>
                            카페 주소를 입력해주세요!
                        </FormHelperText> */}
                    <br />
                    <Box sx={{ mb: 4 }}>
                        <DaumPostcode onComplete={handleAddressComplete} />
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{ mt: 2, mb: 2, width: "60%" }}>
                        <TextField
                            id={id}
                            label={label}
                            variant="standard"
                            autoComplete={autoComplete}
                            disabled
                            value={value}
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => {
                                            setValue("");
                                            setCafeIsLocationComplete(
                                                !cafeIsLocationComplete
                                            );
                                        }}
                                    >
                                        <CloseIcon color="warning" />
                                    </IconButton>
                                ),
                            }}
                        />
                    </Box>

                    {/* 상세주소 */}
                    <Controller
                        name={`${name}Details`}
                        control={control}
                        render={({ field }) => (
                            <FormControl sx={{ mt: 0, mb: 2, width: "60%" }}>
                                <TextField
                                    id={`${id}-details`}
                                    label={`${label} (상세)`}
                                    variant="standard"
                                    autoComplete={`${autoComplete}Details`}
                                    {...field}
                                    value={cafeLocationDetail}
                                    onChange={(e) => {
                                        setCafeLocationDetail(e.target.value);
                                        return field.onChange(e.target.value);
                                    }}
                                    error={
                                        !!formState.errors?.cafeLocationDetail
                                    }
                                />
                                <FormHelperText
                                    error={
                                        !!formState.errors?.cafeLocationDetail
                                    }
                                >
                                    {formState.errors &&
                                        formState.errors?.cafeLocationDetail
                                            ?.message}
                                </FormHelperText>
                            </FormControl>
                        )}
                    />
                </>
            )}
        </>
    );
};

export default KakaoAddressInputField;
