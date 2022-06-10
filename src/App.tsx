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
import {
    boardTypeListState,
    serviceTypeListState,
} from "./components/servicetype/recoils";
import {
    formUserListState,
    formServiceTypeState,
    formBoardTypeState,
    assignedUserListState,
    currentAssignedUserState,
} from "./components/editor/recoils";
import { USER_ROLE } from "./components/editor/configs/constants";

const App = () => {
    const [data, setData] = useRecoilState(formContentDataListState);
    const setCurDatumV1 = useSetRecoilState(currentFormContentData);
    const setIsReloading = useSetRecoilState(isLoadingState);
    const setSurveyContentDataList = useSetRecoilState(
        surveyContentDataListState
    );

    const setFormTypeList = useSetRecoilState(serviceTypeListState);

    // editor
    const setUserList = useSetRecoilState(formUserListState);
    const setServiceTypeEditor = useSetRecoilState(formServiceTypeState);
    const setBoardList = useSetRecoilState(boardTypeListState);
    const setBoardTypeEditor = useSetRecoilState(formBoardTypeState);
    const setAssignedUserList = useSetRecoilState(assignedUserListState);
    const setCurrentAssignedUser = useSetRecoilState(currentAssignedUserState);

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
                setServiceTypeEditor(d2.data[0]); // 에디터에서 현재 사용할 타입

                // 현재 가입되어있는 유저목록 불러오기
                const userListData = await axios.get(
                    `${process.env.REACT_APP_MAIN_BACK}/user/all`
                );
                setUserList(userListData.data);

                // 보드타입들 불러오기
                const boardTypeList = await axios.get(
                    `${process.env.REACT_APP_MAIN_BACK}/board/all`
                );
                setBoardList(boardTypeList.data);
                setBoardTypeEditor(boardTypeList.data[0]);

                // 에디터와 관리자 가져오기
                const editorUserList = await axios.get(
                    `${process.env.REACT_APP_MAIN_BACK}/user/all?role=${USER_ROLE.EDI}`
                );
                const adminUserList = await axios.get(
                    `${process.env.REACT_APP_MAIN_BACK}/user/all?role=${USER_ROLE.ADM}`
                );
                const assignedUserList = [
                    ...editorUserList.data,
                    ...adminUserList.data,
                ];
                setAssignedUserList(assignedUserList);
                setCurrentAssignedUser(assignedUserList[0]);

                // 해시태그 목록 가져오기
                const hashtagList = await axios.get(
                    `${process.env.REACT_APP_MAIN_BACK}/user/all?role=${USER_ROLE.ADM}`
                );
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
