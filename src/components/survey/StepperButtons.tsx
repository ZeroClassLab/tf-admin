import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeStepState, stepsLengthSelector } from "./recoils";

const StepperButtons = () => {
    const [step, setStep] = useRecoilState(activeStepState);

    const stepsLength = useRecoilValue(stepsLengthSelector);

    const toTheTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    const handleNext = () => {
        toTheTop();
        setStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        toTheTop();
        setStep((prevStep) => prevStep - 1);
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    pt: 2,
                }}
            >
                <Button
                    color="inherit"
                    variant="outlined"
                    disabled={step === 0}
                    onClick={() => {
                        handleBack();
                    }}
                    sx={{ mr: 1 }}
                    size="large"
                >
                    이 전
                </Button>

                <Box sx={{ flex: "1 1 auto" }} />
                {step === stepsLength - 1 ? (
                    <Button type="submit" variant="contained" size="large">
                        제 출
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            handleNext();
                        }}
                        variant="contained"
                        size="large"
                    >
                        다 음
                    </Button>
                )}
            </Box>
        </>
    );
};

export default StepperButtons;
