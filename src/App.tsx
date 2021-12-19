import React, { useState, useEffect } from "react";

import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import axios from "axios";

const App = () => {
    const [data, setData] = useState<any>(undefined);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    "https://tmr-founders-cafe-backdeploy.herokuapp.com/form/"
                );
                const d = res.data;
                setData(d);
            } catch (e) {
                console.log(e);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            {data ? (
                <>
                    <Dashboard data={data} />
                </>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default App;
