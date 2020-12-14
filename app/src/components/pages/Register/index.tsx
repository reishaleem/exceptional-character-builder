import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    Hidden,
    TextField,
    Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Navbar } from "../../organisms/PublicNavbar";

interface RegisterFormFields {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const Register = () => {
    const userName = "Reis Haleem";

    const formik = useFormik({
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
            // TODO: Add password validation like length and capitlization and whatnot

            if (values.confirmPassword !== values.password) {
                errors.confirmPassword = "Password does not match";
            }

            return errors;
        },
        onSubmit: async (values: RegisterFormFields, setSubmitting) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(user: RegisterFormFields, setSubmitting: any) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(user, null, 2));
    }

    return (
        <Box>
            <Navbar
                color="primary"
                dropdownMenuLabel={userName}
                userLoggedIn={false}
            />
            <Grid
                container
                spacing={2}
                style={{ height: "100vh" }}
                alignItems="center"
            >
                <Hidden smDown>
                    <Grid item md={5}></Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={2}>
                    <Typography
                        variant="h2"
                        component="h1"
                        align="center"
                        gutterBottom
                    >
                        Register
                    </Typography>
                    <Card>
                        <CardHeader
                            title={
                                <Typography
                                    variant="h2"
                                    component="h1"
                                    align="center"
                                >
                                    Register
                                </Typography>
                            }
                        />
                        <CardContent>
                            <form onSubmit={formik.handleSubmit}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="text"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.name &&
                                        Boolean(formik.errors.name)
                                    }
                                    helperText={
                                        formik.touched.name &&
                                        formik.errors.name
                                    }
                                    disabled={formik.isSubmitting}
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="text"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.email &&
                                        Boolean(formik.errors.email)
                                    }
                                    helperText={
                                        formik.touched.email &&
                                        formik.errors.email
                                    }
                                    disabled={formik.isSubmitting}
                                />

                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.password &&
                                        Boolean(formik.errors.password)
                                    }
                                    helperText={
                                        formik.touched.password &&
                                        formik.errors.password
                                    }
                                    disabled={formik.isSubmitting}
                                />

                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Re-enter password"
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    error={
                                        formik.touched.confirmPassword &&
                                        Boolean(formik.errors.confirmPassword)
                                    }
                                    helperText={
                                        formik.touched.confirmPassword &&
                                        formik.errors.confirmPassword
                                    }
                                    disabled={formik.isSubmitting}
                                />

                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    fullWidth
                                    disabled={formik.isSubmitting}
                                >
                                    Register
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
                <Hidden smDown>
                    <Grid item md={5}></Grid>
                </Hidden>
                <div
                    style={{
                        backgroundColor: "white",
                        height: "50px",
                        width: "100%",
                        borderTopRightRadius: "50%",
                        borderTopLeftRadius: "50%",
                        marginTop: "auto",
                    }}
                ></div>
            </Grid>
        </Box>
    );
};
