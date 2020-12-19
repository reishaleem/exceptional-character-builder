import { makeStyles, Theme } from "@material-ui/core";
import { ReactNode } from "react";

interface Props {
    handleSubmit: any; // submit function
    children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
    form: {
        "& .MuiTextField-root": {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    },
}));

export const Form = ({ handleSubmit, children }: Props) => {
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit} className={classes.form}>
            {children}
        </form>
    );
};
