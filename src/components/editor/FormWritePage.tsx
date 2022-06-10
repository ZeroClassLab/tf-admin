import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import SubmitModeAlertToast from "../form-tools/SubmitModeAlertToast";
import FormEditCore from "./FormEditCore";
import { editorSubmitModeState, SubmitMode } from "./recoils";

const FormWritePage = () => {
    const setSubmitMode = useSetRecoilState(editorSubmitModeState);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        setSubmitMode(SubmitMode.CREATE);
        setOpen(true);
    }, []);
    return (
        <>
            <FormEditCore />;
            <SubmitModeAlertToast open={open} onClose={handleClose} />
        </>
    );
};

export default FormWritePage;
