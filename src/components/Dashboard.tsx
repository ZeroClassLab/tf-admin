import React, { useState } from "react";
import Box from "@mui/material/Box";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Loading from "./Loading";
import V1DetailListPage from "./v1/DetailListPage";
import V1DetailPage from "./v1/DetailPage";

import { useRecoilState, useRecoilValue } from "recoil";
import {
    currentFormContentData,
    currentPageState,
    isLoadingState,
} from "./recoils";
import SurveyFormPage from "./survey/SurveyListPage";
import WriteSurveyPage from "./survey/WriteSurveyPage";
import ServiceTypePage from "./servicetype/ServiceTypePage";
import FormWritePage from "./editor/FormWritePage";
import FormEditPage from "./editor/FormEditPage";
// import FormTestPage from "./editor/FormTestPage";
import StoryListPage from "./story/StoryList";
import V1MainContent from "./v1/V1MainContent";

interface DataProps {
    reload: () => void;
    callbacks: {
        [key: string]: () => void;
    };
}

interface ContentMapperProps {
    idx: number;
    callbacks?: {
        [key: string]: () => void;
    };
}

const ContentMapper: React.VFC<ContentMapperProps> = ({ idx, callbacks }) => {
    switch (idx) {
        case -44:
            return <V1MainContent />;
        case 0:
            return <MainContent callbacks={callbacks} />;
        case 1:
            return <V1DetailListPage />;
        case 2:
            return <V1DetailPage />;
        case 3:
            return <SurveyFormPage />;
        case 30:
            return <WriteSurveyPage />;
        case 4:
            return <ServiceTypePage />;
        case 50:
            return <StoryListPage />;
        case 52:
            return <FormWritePage />;
        case 53:
            return <FormEditPage />;
        default:
            return (
                <Box sx={{ m: 3 }}>
                    <p>
                        404 Not found (개발 중인 페이지거나 잘못된 접근입니다.)
                    </p>
                    <p>page code: {idx}</p>
                </Box>
            );
    }
};

const Dashboard: React.VFC<DataProps> = ({ reload, callbacks }) => {
    const [open, setOpen] = useState(false);
    const currentPage = useRecoilValue(currentPageState);
    const isFormDataLoading = useRecoilValue(isLoadingState);

    return (
        <>
            <Box sx={{ display: "flex", position: "relative" }}>
                <Sidebar open={open} setOpen={setOpen} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === "light"
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto",
                    }}
                >
                    {/* header */}
                    <HeaderBar
                        open={open}
                        setOpen={setOpen}
                        reload={reload}
                        isReloading={isFormDataLoading}
                    />

                    {/* contents */}
                    <ContentMapper idx={currentPage} callbacks={callbacks} />
                    {isFormDataLoading && <Loading />}
                </Box>
            </Box>
        </>
    );
};

export default Dashboard;
