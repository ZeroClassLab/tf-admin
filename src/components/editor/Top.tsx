import React from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useRecoilValue } from "recoil";

import FormBoardSelect from "./topbar/FormBoardSelect";
import FormCustomUserCheckbox from "./topbar/FormCustomUserCheckbox";
import FormLocation from "./topbar/FormLocation";
import FormServiceTypeSelect from "./topbar/FormServiceTypeSelect";
import FormCafeSelect from "./topbar/FormCafeSelect";
import FormCafeInput from "./topbar/FormCafeInput";
import { formBoardTypeState, isCustomUserState } from "./recoils";
import FormEditorSelect from "./topbar/FormEditorSelect";

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

            <Box sx={{ flex: 2 }}>
                <FormServiceTypeSelect />
            </Box>
        </Paper>
    );
};

export default Top;
