import { makeStyles, Theme } from "@material-ui/core";
import { HTMLProps, ReactNode } from "react";

interface Props extends HTMLProps<HTMLFormElement> {
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

export const Form = ({ handleSubmit, children, ...props }: Props) => {
    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit} className={classes.form} {...props}>
            {children}
        </form>
    );
};
