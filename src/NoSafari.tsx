
import Alert from "@mui/material/Alert";
import { tss } from "tss-react/mui";

export function NoSafari() {

    const { classes } = useStyles();

    return (
        <div className={classes.root}>
            <Alert severity="error">
                This redirection method to your local Keycloak instance doesn't work on <strong>Safari</strong>.
                <br />
                <br />
                Please open <strong>{location.href}</strong> in Chrome or Firefox.  
                <br />
                <br />
                Once redirected to your login pages you'll be able to copy paste the URL into Safari.  
                <br />
                <br />
                Sorry for the inconvenience. 
            </Alert>
        </div>
    );

}

const useStyles = tss
    .withName({ NoSafari })
    .create({
        root: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    });