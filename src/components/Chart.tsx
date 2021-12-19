import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Cell,
    ResponsiveContainer,
} from "recharts";
import Title from "./Title";

interface ChartProps {
    contacts: number[];
}

const Chart: React.VFC<ChartProps> = ({ contacts }) => {
    const theme = useTheme();
    const [checkedContents, setCheckedContents] = useState([]);
    const [uLen, setULen] = useState(contacts.length);
    const [cLen, setCLen] = useState(0);
    const data = [
        { name: "확인안함", 개수: uLen },
        { name: "확인함", 개수: cLen },
        { name: "전체", 개수: contacts.length },
    ];

    const barColors = [
        theme.palette.primary.main,
        theme.palette.secondary.main,
        theme.palette.error.main,
    ];

    useEffect(() => {
        const checkeds = JSON.parse(localStorage.getItem("checkeds") || "[]");
        setCheckedContents(checkeds);
    }, []);

    useEffect(() => {
        const checkeds = JSON.parse(localStorage.getItem("checkeds") || "[]");
        setCheckedContents(checkeds);
    }, [contacts]);

    useEffect(() => {
        let checkedNum = 0;
        for (let i = 0; i < checkedContents.length; i++) {
            if (contacts.indexOf(checkedContents[i]) !== -1) {
                checkedNum++;
            }
        }
        setCLen(checkedNum);
        setULen(contacts.length - checkedNum);
    }, [checkedContents]);

    return (
        <React.Fragment>
            <Title>폼 제출 개수</Title>
            <ResponsiveContainer>
                <BarChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 30,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickCount={1} />
                    <Tooltip />
                    <Bar dataKey="개수" fill={theme.palette.primary.main}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={barColors[index % 20]}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
};
export default Chart;
