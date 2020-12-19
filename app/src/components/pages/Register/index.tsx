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

interface RegisterFormFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = () => {
    const userName = "Reis Haleem";

    const registerForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values: RegisterFormFields) => {
            const errors: Partial<RegisterFormFields> = {};
            if (!values.name) {
                errors.name = "Required";
            } else if (values.name.length > 50) {
                errors.name = "Name must be shorted than 5 characters";
            }

            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
                errors.email = "Enter a valid email address";
            }

            if (!values.password) {
                errors.password = "Required";
            }

            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Password does not match";
            }

            return errors;
        },
        onSubmit: (values: RegisterFormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        user: RegisterFormFields,
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
                        <Form handleSubmit={registerForm.handleSubmit}>
                            <Box marginTop="8px" marginBottom="8px">
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    value={registerForm.values.name}
                                    onChange={registerForm.handleChange}
                                    error={
                                        registerForm.touched.name &&
                                        Boolean(registerForm.errors.name)
                                    }
                                    helperText={
                                        registerForm.touched.name &&
                                        registerForm.errors.name
                                    }
                                    disabled={registerForm.isSubmitting}
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    value={registerForm.values.email}
                                    onChange={registerForm.handleChange}
                                    error={
                                        registerForm.touched.email &&
                                        Boolean(registerForm.errors.email)
                                    }
                                    helperText={
                                        registerForm.touched.email &&
                                        registerForm.errors.email
                                    }
                                    disabled={registerForm.isSubmitting}
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
                                    value={registerForm.values.password}
                                    onChange={registerForm.handleChange}
                                    error={
                                        registerForm.touched.password &&
                                        Boolean(registerForm.errors.password)
                                    }
                                    helperText={
                                        registerForm.touched.password &&
                                        registerForm.errors.password
                                    }
                                    disabled={registerForm.isSubmitting}
                                    InputLabelProps={{ shrink: true }}
                                    size="small"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Re-enter password"
                                    type="password"
                                    value={registerForm.values.confirmPassword}
                                    onChange={registerForm.handleChange}
                                    error={
                                        registerForm.touched.confirmPassword &&
                                        Boolean(
                                            registerForm.errors.confirmPassword
                                        )
                                    }
                                    helperText={
                                        registerForm.touched.confirmPassword &&
                                        registerForm.errors.confirmPassword
                                    }
                                    disabled={registerForm.isSubmitting}
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
                                disabled={registerForm.isSubmitting}
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
