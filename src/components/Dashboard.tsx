import React, { useState } from "react";
import Box from "@mui/material/Box";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import Loading from "./Loading";
import V1DetailListPage from "./v1/DetailListPage";
import V1DetailPage from "./v1/DetailPage";

import { useRecoilValue } from "recoil";
import { currentPageState, isLoadingState } from "./recoils";

interface DataProps {
    reload: () => void;
    data?: { [key: string]: any }[];
}

interface ContentMapperProps {
    idx: number;
    props: any;
}

const ContentMapper: React.VFC<ContentMapperProps> = ({ idx, props }) => {
    switch (idx) {
        case 0:
            return <MainContent {...props} />;
        case 1:
            return <V1DetailListPage {...props} />;
        case 2:
            return <V1DetailPage {...props} />;
        default:
            return <Box>404 Not found</Box>;
    }
};

const Dashboard: React.VFC<DataProps> = ({ data, reload }) => {
    const [open, setOpen] = useState(true);
    const [curDatum, setCurDatum] = useState(data?.[0] || {});
    const currentPage = useRecoilValue(currentPageState);
    const isFormDataLoading = useRecoilValue(isLoadingState);

    return (
        <Box sx={{ display: "flex" }}>
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
                {isFormDataLoading ? (
                    <Loading />
                ) : (
                    <ContentMapper
                        idx={currentPage}
                        props={{
                            data: data ?? [{}],
                            curDatum: curDatum,
                            setCurDatum: setCurDatum,
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
