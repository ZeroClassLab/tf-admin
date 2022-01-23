import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface TitleGridProps {
    text: string;
    sx?: any;
}

const TitleGrid: React.VFC<TitleGridProps> = ({ text, sx }) => {
    return (
        <Grid item xs={12} sx={sx}>
            <Typography variant="h4" component="h3">
                {text}
            </Typography>
        </Grid>
    );
};

export default TitleGrid;
