import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import Dashboard from "./components/Dashboard";
import {
    isLoadingState,
    formContentDataListState,
    currentFormContentData,
    surveyContentDataListState,
} from "./components/recoils";
import axios from "axios";
import { formTypeListState } from "./components/servicetype/recoils";

const App = () => {
    const [data, setData] = useRecoilState(formContentDataListState);
    const setCurDatumV1 = useSetRecoilState(currentFormContentData);
    const setIsReloading = useSetRecoilState(isLoadingState);
    const setSurveyContentDataList = useSetRecoilState(
        surveyContentDataListState
    );

    const setFormTypeList = useSetRecoilState(formTypeListState);

    const refresh = () => {
        const fetchData = async () => {
            try {
                setIsReloading(true);
                // 폼 데이터 불러오기 v1
                const resv1 = await axios.get(
                    `${process.env.REACT_APP_V1_BACK}/form/`
                );
                setData(resv1.data);

                // 폼데이터 1.0 넣기
                setCurDatumV1(resv1.data[0] ?? {});

                // 질문형식 불러오기
                const surveyRes = await axios.get(
                    `${process.env.REACT_APP_SURVEY_BACK}/survey/`
                );
                setSurveyContentDataList(surveyRes.data);

                // 서비스 타입들 불러오기
                const d2 = await axios.get(
                    `${process.env.REACT_APP_SURVEY_BACK}/formtype`
                );
                setFormTypeList(d2.data);

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
