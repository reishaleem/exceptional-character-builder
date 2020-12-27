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

import { Form } from "../../molecules/Form";
import { Navbar } from "../../organisms/PublicNavbar";

import { RegisterFields } from "../../../types/form-types";
import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../../../graphql/mutations/user";
import { LOGIN_MUTATION } from "../../../graphql/mutations/auth";
import { useHistory } from "react-router-dom";
import { setAccessToken } from "../../../services/auth";

export const Register = () => {
    const history = useHistory();
    const [createUser] = useMutation(CREATE_USER_MUTATION);
    const [login] = useMutation(LOGIN_MUTATION);

    const registerForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validate: (values: RegisterFields) => {
            const errors: Partial<RegisterFields> = {};
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
        onSubmit: (values: RegisterFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        user: RegisterFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const newUser = await createUser({
            variables: {
                name: user.name,
                email: user.email,
                password: user.password,
            },
        });
        if (newUser) {
            const response = await login({
                variables: {
                    email: user.email,
                    password: user.password,
                },
            });

            if (response && response.data) {
                setAccessToken(response.data.login.accessToken);
                history.push("/magic-systems");
            } else {
                history.push("/login"); // send them to login screen if there was an error for some reason...
            }
        } else {
            setSubmitting(false);
        }
    }

    return (
        <Grid container justify="center" spacing={2}>
            <Grid item xs={12}>
                <Navbar color="primary" userLoggedIn={false} />
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
                                    InputLabelProps={{ shrink: true }}
                                    disabled={registerForm.isSubmitting}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                                <TextField
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
                                    InputLabelProps={{ shrink: true }}
                                    disabled={registerForm.isSubmitting}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                                <TextField
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
                                    InputLabelProps={{ shrink: true }}
                                    disabled={registerForm.isSubmitting}
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                                <TextField
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
                                    InputLabelProps={{ shrink: true }}
                                    disabled={registerForm.isSubmitting}
                                    fullWidth
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
