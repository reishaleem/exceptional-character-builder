import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@material-ui/core";
import { useFormik } from "formik";

import { Navbar } from "../../organisms/PublicNavbar";
import { Form } from "../../molecules/Form";

interface LoginFormFields {
    email: string;
    password: string;
}

export const UserMagicList = () => {
    const userName = "Reis Haleem";

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: (values: LoginFormFields) => {
            const errors: Partial<LoginFormFields> = {};
            if (!values.email) {
                errors.email = "";
            } else if (!values.password) {
                errors.password = "";
            }

            return errors;
        },
        onSubmit: (values: LoginFormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        user: LoginFormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(user, null, 2));
        setSubmitting(false);
    }

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
                <Navbar
                    color="primary"
                    dropdownMenuLabel={userName}
                    userLoggedIn={true}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                User Magic List
            </Grid>
        </Grid>
    );
};
