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

export const Login = () => {
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
        // direct to magic-systems list
        setSubmitting(false);
    }

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
                <Navbar
                    color="primary"
                    dropdownMenuLabel={userName}
                    userLoggedIn={false}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant="h4" component="h1">
                            Login
                        </Typography>
                        <Form handleSubmit={loginForm.handleSubmit}>
                            <Box marginTop="8px" marginBottom="8px">
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    value={loginForm.values.email}
                                    onChange={loginForm.handleChange}
                                    error={
                                        loginForm.touched.email &&
                                        Boolean(loginForm.errors.email)
                                    }
                                    helperText={
                                        loginForm.touched.email &&
                                        loginForm.errors.email
                                    }
                                    disabled={loginForm.isSubmitting}
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    variant="outlined"
                                />

                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={loginForm.values.password}
                                    onChange={loginForm.handleChange}
                                    error={
                                        loginForm.touched.password &&
                                        Boolean(loginForm.errors.password)
                                    }
                                    helperText={
                                        loginForm.touched.password &&
                                        loginForm.errors.password
                                    }
                                    disabled={loginForm.isSubmitting}
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    variant="outlined"
                                />
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                fullWidth
                                disableElevation
                                disabled={loginForm.isSubmitting}
                            >
                                Login
                            </Button>
                        </Form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
