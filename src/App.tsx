import React, { useEffect, useState } from "react";
import { app as _app } from "./firebase";
import { useRecoilState, useSetRecoilState } from "recoil";

import Dashboard from "./components/Dashboard";
import {
    autoReloadModeState,
    isLoadingState,
    loadingMessageState,
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

    // loading
    const setLoadingMessage = useSetRecoilState(loadingMessageState);

    const [autoReloadMode, setAutoReloadMode] =
        useRecoilState(autoReloadModeState);

    const refreshAboutServiceType = async () => {
        // 서비스 타입들 불러오기
        try {
            setLoadingMessage(() => "서비스 종류 정보 불러오는 중");
            const d2 = await axios.get(
                `${process.env.REACT_APP_SURVEY_BACK}/formtype`
            );
            setFormTypeList(d2.data);
            setServiceTypeEditor(d2.data[0]); // 에디터에서 현재 사용할 타입
        } catch (e) {
            console.error(e);
            alert("서비스 타입을 불러오는데 실패했습니다!");
        }
    };

    const refreshAboutSurvey = async () => {
        try {
            // 질문형식 불러오기
            setLoadingMessage("서베이 관련 정보 불러오는 중");
            const surveyRes = await axios.get(
                `${process.env.REACT_APP_SURVEY_BACK}/survey/`
            );
            setSurveyContentDataList(surveyRes.data);
            //서비스 타입불러오기
            await refreshAboutServiceType();
        } catch (e) {
            console.error(e);
            alert("서베이 관련 데이터를 불러오는데 실패했습니다!");
        }
    };

    const refreshAboutEditor = async () => {
        try {
            //서비스 타입불러오기
            await refreshAboutServiceType();

            setLoadingMessage(() => "에디터에 필요한 정보 불러오는 중");

            // 현재 가입되어있는 유저목록 불러오기
            const userListData = await axios.get(
                `${process.env.REACT_APP_MAIN_BACK}/user/all`
            );
            setUserList(userListData.data);
            console.log("불러온 유저리스트", userListData.data);

            // 보드타입들 불러오기
            const boardTypeList = await axios.get(
                `${process.env.REACT_APP_MAIN_BACK}/board/all`
            );
            setBoardList(boardTypeList.data);
            // setBoardTypeEditor(boardTypeList.data[0]); // 이제 이건 개별 컴포넌트에서...

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
            console.log(
                "뉴스피드 등을 작성할 수 있는 사람들",
                assignedUserList
            );
            setAssignedUserList(assignedUserList);
            setCurrentAssignedUser(assignedUserList[0]);
        } catch (e) {
            console.error(e);
            alert("에디터 관련 정보 불러오는데 실패!");
        }
    };

    const refresh = () => {
        const fetchData = async () => {
            if (autoReloadMode) {
                try {
                    setIsReloading(true);
                    await refreshAboutSurvey();
                    await refreshAboutEditor();
                    setIsReloading(false);
                } catch (e) {
                    console.log(e);
                }
            }
        };
        fetchData();
    };

    useEffect(() => {
        refresh();
    }, [autoReloadMode]);

    useEffect(() => {
        const autoReload = localStorage.getItem("autoreload");
        if (autoReload) {
            setAutoReloadMode(true);
        } else {
            setAutoReloadMode(false);
        }
    }, []);

    return (
        <Dashboard
            reload={refresh}
            callbacks={{
                surveyReload: refreshAboutSurvey,
                editorReload: refreshAboutEditor,
            }}
        />
    );
};

export default App;
