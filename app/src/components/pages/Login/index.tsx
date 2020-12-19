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
    name: string;
    password: string;
}

export const Login = () => {
    const userName = "Reis Haleem";

    const loginForm = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validate: (values: LoginFormFields) => {
            const errors: Partial<LoginFormFields> = {};
            if (!values.name) {
                errors.name = "Required";
            } else if (values.name.length > 50) {
                errors.name = "Name must be shorted than 5 characters";
            }

            if (!values.password) {
                errors.password = "Required";
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
                    userLoggedIn={false}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
                <Card elevation={1}>
                    <CardContent>
                        <Typography variant="h4" component="h1">
                            Register
                        </Typography>
                        <Form handleSubmit={loginForm.handleSubmit}>
                            <Box marginTop="8px" marginBottom="8px">
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    value={loginForm.values.name}
                                    onChange={loginForm.handleChange}
                                    error={
                                        loginForm.touched.name &&
                                        Boolean(loginForm.errors.name)
                                    }
                                    helperText={
                                        loginForm.touched.name &&
                                        loginForm.errors.name
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
                                Create your account
                            </Button>
                        </Form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};
