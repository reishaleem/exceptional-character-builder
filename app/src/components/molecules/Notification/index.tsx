import { Snackbar } from "@material-ui/core";
import {
    AlertProps,
    Alert as MuiAlert,
    Color as Severity,
} from "@material-ui/lab/";

interface Props {
    message: string;
    severity: Severity;
    open: boolean;
    setOpen: any;
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Notification = ({ message, severity, open, setOpen }: Props) => {
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    return (
        <Snackbar open={open} autoHideDuration={4500} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};
