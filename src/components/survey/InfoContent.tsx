import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRecoilValue } from "recoil";
import {
    contentsState,
    isSurveyViewModeState,
    activeStepState,
} from "./recoils";
import InputField from "./InputField";
import { InputFieldType } from "./consts";
import BasicInputField from "./views/BasicInputField";
import ItemTaggerInputField from "./views/ItemTaggerInputField";
import { SubmitHandler, useForm } from "react-hook-form";
import RadioInputField from "./views/RadioInputField";
import PhoneInputField from "./views/PhoneInputField";
import MoneyInputField from "./views/MoneyInputField";
import MainImage from "../itemTaggingComponent/MainImage";
import { imagesInputState } from "./mock/ImageInputsMockups";
import KakaoAddressInputField from "./views/KakaoAddressInputField";
import EmailInputField from "./views/EmailInputField";

const InfoContent = () => {
    const contentsList = useRecoilValue(contentsState);
    const isViewMode = useRecoilValue(isSurveyViewModeState);
    const activeStep = useRecoilValue(activeStepState);

    const { control, handleSubmit, formState } = useForm<any>({
        mode: "onChange",
        defaultValues: {},
    });

    const onSubmit: SubmitHandler<any> = async (data: any) => {
        console.log(data);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                mt: 2,
                width: "60%",
            }}
        >
            {/* <div>
                {"contentsInfo: "}
                {JSON.stringify(contentsList)}
            </div> */}
            {isViewMode ? (
                contentsList[activeStep].map((field, idx) => {
                    if (field.type === InputFieldType.BASIC) {
                        return (
                            <BasicInputField
                                key={`viewmode-inputfield-${idx}`}
                                id={field.id}
                                name={field.name}
                                label={field.label}
                                autoComplete={field.autoComplete}
                                localStorageValueKey={
                                    field.localStorageValueKey
                                }
                                control={control}
                                formState={formState}
                            />
                        );
                    } else if (field.type === InputFieldType.LONG) {
                        return (
                            <BasicInputField
                                key={`viewmode-inputfield-${idx}`}
                                id={field.id}
                                name={field.name}
                                label={field.label}
                                autoComplete={field.autoComplete}
                                localStorageValueKey={
                                    field.localStorageValueKey
                                }
                                isMultiline
                                maxRowsNum={Number(field.maxRowsNum)}
                                control={control}
                                formState={formState}
                            />
                        );
                    } else if (field.type === InputFieldType.EMAIL) {
                        return (
                            <EmailInputField
                                key={`viewmode-inputfield-${idx}`}
                                id={field.id}
                                name={field.name}
                                label={field.label}
                                autoComplete={field.autoComplete}
                                localStorageValueKey={
                                    field.localStorageValueKey
                                }
                                control={control}
                                formState={formState}
                            />
                        );
                    } else if (field.type === InputFieldType.PHONE) {
                        return (
                            <PhoneInputField
                                key={`viewmode-inputfield-${idx}`}
                                id={field.id}
                                name={field.name}
                                label={field.label}
                                autoComplete={field.autoComplete}
                                localStorageValueKey={
                                    field.localStorageValueKey
                                }
                                control={control}
                                formState={formState}
                            />
                        );
                    } else if (field.type === InputFieldType.MONEY) {
                        return (
                            <MoneyInputField
                                key={`viewmode-inputfield-${idx}`}
                                id={field.id}
                                name={field.name}
                                label={field.label}
                                autoComplete={field.autoComplete}
                                localStorageValueKey={
                                    field.localStorageValueKey
                                }
                                control={control}
                                formState={formState}
                            />
                        );
                    } else if (field.type === InputFieldType.RADIO) {
                        return (
                            <Box key={`viewmode-inputfield-${idx}`}>
                                <RadioInputField
                                    name={field.name}
                                    id={field.id}
                                    localStorageValueKey={
                                        field.localStorageValueKey
                                    }
                                    label={field.label}
                                    choices={field.choices}
                                    control={control}
                                    formState={formState}
                                />
                            </Box>
                        );
                    } else if (field.type === InputFieldType.IMAGE) {
                        return (
                            <Box key={`viewmode-inputfield-${idx}`}>
                                <Typography variant="body1">
                                    {field.label}
                                </Typography>
                                <MainImage
                                    maxImageNum={Number(field.maxImageNums)}
                                    mainImageFilesRecoil={imagesInputState}
                                />
                            </Box>
                        );
                    } else if (field.type === InputFieldType.ITEMTAGGER) {
                        return (
                            <Box key={`viewmode-inputfield-${idx}`}>
                                <Typography variant="body1">
                                    {field.label}
                                </Typography>
                                <ItemTaggerInputField
                                    maxImageLength={Number(field.maxImageNums)}
                                />
                            </Box>
                        );
                    } else if (field.type === InputFieldType.KAKAO_ADDRESS) {
                        return (
                            <Box key={`viewmode-inputfield-${idx}`}>
                                <KakaoAddressInputField
                                    id={field.id}
                                    name={field.name}
                                    label={field.label}
                                    autoComplete={field.autoComplete}
                                    localStorageValueKey={
                                        field.localStorageValueKey
                                    }
                                    control={control}
                                    formState={formState}
                                />
                            </Box>
                        );
                    } else {
                        return;
                    }
                })
            ) : (
                <>
                    {contentsList[activeStep].map((field, idx) => (
                        <InputField
                            key={`input-field-${idx}`}
                            label={field.label}
                            type={field.type}
                            idx={idx}
                            required={field.required}
                        />
                    ))}
                </>
            )}
        </Box>
    );
};

export default InfoContent;
