import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

interface TitleGridProps {
    text: string;
}

const TitleGrid: React.VFC<TitleGridProps> = ({ text }) => {
    return (
        <Grid item xs={12}>
            <Typography variant="h4" component="h3">
                {text}
            </Typography>
        </Grid>
    );
};

export default TitleGrid;
