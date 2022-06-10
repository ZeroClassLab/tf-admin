import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useRecoilValue } from "recoil";

import FormBoardSelect from "../../form-tools/FormBoardSelect";
import FormCustomUserCheckbox from "../topbar/FormCustomUserCheckbox";
import FormLocation from "../topbar/FormLocation";
import FormServiceTypeSelect from "../topbar/FormServiceTypeSelect";
import FormCafeSelect from "../topbar/FormCafeSelect";
import FormCafeInput from "../topbar/FormCafeInput";
import { formBoardTypeState, isCustomUserState } from "../recoils";
import FormEditorSelect from "../topbar/FormEditorSelect";
import FormDeleteButton from "../topbar/FormDeleteButton";

/**
 * 편집페이지에서 윗부분
 * @returns
 */
const Top = () => {
    const isCustomCafename = useRecoilValue(isCustomUserState);
    const formBoardType = useRecoilValue(formBoardTypeState);

    return (
        <Paper
            sx={{
                backgroundColor: "white",
                display: "flex",
                minHeight: 30,
            }}
            elevation={0}
        >
            <Box sx={{ flex: 2 }}>
                <FormBoardSelect />
            </Box>

            {/* board 타입이 story 인경우 */}
            {formBoardType?.name === "story" && (
                <>
                    <Box sx={{ flex: 2 }}>
                        <FormLocation />
                    </Box>
                    <Box sx={{ flex: 2 }}>
                        {!isCustomCafename ? (
                            <FormCafeSelect />
                        ) : (
                            <FormCafeInput />
                        )}
                    </Box>

                    <Box
                        sx={{
                            flex: 2,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FormCustomUserCheckbox />
                    </Box>
                </>
            )}
            {/* board 타입이 스토리가 아닌 경우 */}
            {formBoardType?.name !== "story" && (
                <Box
                    sx={{
                        flex: 2,
                    }}
                >
                    <FormEditorSelect />
                </Box>
            )}

            <Box sx={{ flex: 1 }}>
                <FormServiceTypeSelect />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    padding: 2,
                }}
            >
                <FormDeleteButton />
            </Box>
        </Paper>
    );
};

export default Top;
