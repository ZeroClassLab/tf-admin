import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";

interface ServicePanelProps {
    isValid: boolean;
    name: string;
}

const ServicePanel: React.VFC<ServicePanelProps> = ({ name, isValid }) => {
    return (
        <Tooltip
            title={
                isValid ? (
                    <Typography sx={{ fontSize: 20 }}>서비스 중!</Typography>
                ) : (
                    <Typography sx={{ fontSize: 20 }}>
                        배포되지 않음...
                    </Typography>
                )
            }
        >
            <Button
                sx={{ fontSize: 50, mr: 2, mb: 2, width: 150 }}
                variant="contained"
                color={isValid ? "success" : "error"}
            >
                {name}
            </Button>
        </Tooltip>
    );
};

export default ServicePanel;
