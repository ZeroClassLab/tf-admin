import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";

import Dashboard from "./components/Dashboard";
import { isLoadingState, formContentDataListState } from "./components/recoils";
import axios from "axios";

const App = () => {
    const [data, setData] = useRecoilState(formContentDataListState);
    const [isReloading, setIsReloading] = useRecoilState(isLoadingState);

    const refresh = () => {
        const fetchData = async () => {
            try {
                setIsReloading(true);
                const res = await axios.get(
                    "https://tmr-founders-cafe-backdeploy.herokuapp.com/form/"
                );
                const d = res.data;
                setData(d);
                setIsReloading(false);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    };

    useEffect(() => {
        refresh();
    }, []);

    return <Dashboard data={data} reload={refresh} />;
};

export default App;
