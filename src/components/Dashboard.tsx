import React, { useState } from "react";
import Box from "@mui/material/Box";
import HeaderBar from "./HeaderBar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";
import DetailListPage from "./DetailListPage";
import DetailPage from "./DetailPage";

interface DataProps {
    data?: { [key: string]: any }[];
}

const Dashboard: React.VFC<DataProps> = ({ data }) => {
    const [open, setOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [curDatum, setCurDatum] = useState(data?.[0] || {});

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar
                open={open}
                setOpen={setOpen}
                setCurPage={setCurrentPage}
            />
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
                <HeaderBar open={open} setOpen={setOpen} />
                {currentPage === 0 ? (
                    <MainContent
                        data={data ?? [{}]}
                        setCurPage={setCurrentPage}
                        setCurDatum={setCurDatum}
                    />
                ) : currentPage === 1 ? (
                    <DetailListPage
                        data={data ?? [{}]}
                        setCurPage={setCurrentPage}
                        setCurDatum={setCurDatum}
                    />
                ) : (
                    <DetailPage curDatum={curDatum} />
                )}
            </Box>
        </Box>
    );
};

export default Dashboard;
