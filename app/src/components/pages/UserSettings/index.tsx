import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    makeStyles,
    Tab,
    Tabs,
    TextField,
    Theme,
    Typography,
    useTheme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { TabPanel } from "../../atoms/TabPanel";
import { Form } from "../../molecules/Form";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

interface FormFields {
    name: string;
}

interface ChangePasswordFormFields {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

interface ProfileFormFields {
    name: string;
    email: string;
    penName: string;
    bio: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: "flex",
    },
    tabs: {
        borderLeft: `1px solid ${theme.palette.divider}`,
    },
    leftIndicator: {
        left: "0px",
    },
    wrapper: {
        alignItems: "flex-start",
    },
}));

interface Props {
    value: number;
}

export const UserSettings = ({ value }: Props) => {
    const classes = useStyles();
    const theme = useTheme();

    const currentUser = {
        name: "Reis",
        email: "reishaleem@gmail.com",
        penName: "Reis Haleem",
        bio: "",
    };

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        validate: (values: FormFields) => {
            const errors: Partial<FormFields> = {};
            if (!values.name) {
                errors.name = "Required";
            } else if (values.name !== currentUser.name) {
                errors.name = "Your name is incorrect!";
            }

            return errors;
        },
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    const changePasswordForm = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validate: (values: ChangePasswordFormFields) => {
            const errors: Partial<ChangePasswordFormFields> = {};
            if (!values.currentPassword) {
                errors.currentPassword = "Required";
            }

            if (!values.newPassword) {
                errors.newPassword = "Required";
            } else if (values.newPassword.length < 6) {
                errors.newPassword = "Password must be at least 6 characters";
            }

            if (!values.confirmNewPassword) {
                errors.confirmNewPassword = "Required";
            } else if (values.newPassword !== values.confirmNewPassword) {
                errors.confirmNewPassword = "Password does not match";
            }

            return errors;
        },
        onSubmit: (values: ChangePasswordFormFields, { setSubmitting }) => {
            handleChangePasswordSubmit(values, setSubmitting);
        },
    });

    const ProfileForm = useFormik({
        initialValues: {
            name: currentUser.name,
            email: currentUser.email,
            penName: currentUser.penName,
            bio: currentUser.bio,
        },
        validate: (values: ProfileFormFields) => {
            const errors: Partial<ProfileFormFields> = {};
            if (!values.name) {
                errors.name = "Required";
            }

            if (!values.penName) {
                errors.name = "Required";
            } else if (values.penName.length > 50) {
                errors.penName = "Pen Name must be shorter than 50 characters";
            }

            if (values.bio.length > 255) {
                errors.bio = "Bio must be shorter than 255 characters";
            }

            return errors;
        },
        onSubmit: (values: ProfileFormFields, { setSubmitting }) => {
            handleProfileSubmit(values, setSubmitting);
        },
    });

    async function handleProfileSubmit(
        user: ProfileFormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(user, null, 2));
        // login
        // direct to magic-systems list
        setSubmitting(false);
    }

    async function handleSubmit(
        user: FormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(user, null, 2));
        // login
        // direct to magic-systems list
        setSubmitting(false);
    }

    async function handleChangePasswordSubmit(
        user: ChangePasswordFormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(user, null, 2));
        // login
        // direct to magic-systems list
        setSubmitting(false);
    }

    return (
        <NoSidebarWrapper>
            <Grid item xs={12} sm={12} md={2}>
                <Card elevation={1}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        className={classes.tabs}
                        classes={{
                            indicator: classes.leftIndicator,
                        }}
                    >
                        <Tab
                            label="Profile"
                            {...a11yProps(0)}
                            classes={{
                                wrapper: classes.wrapper,
                            }}
                            component={Link}
                            to="/settings/profile"
                        />
                        <Tab
                            label="Security"
                            {...a11yProps(1)}
                            classes={{
                                wrapper: classes.wrapper,
                            }}
                            component={Link}
                            to="/settings/security"
                        />
                        <Tab
                            label="Delete"
                            {...a11yProps(2)}
                            classes={{
                                wrapper: classes.wrapper,
                            }}
                            component={Link}
                            to="/settings/delete"
                        />
                    </Tabs>
                </Card>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
                <TabPanel value={value} index={0}>
                    <Typography variant="h3" component="h1">
                        Profile
                    </Typography>
                    <Divider />
                    <Form handleSubmit={ProfileForm.handleSubmit}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Name"
                            type="text"
                            value={ProfileForm.values.name}
                            onChange={ProfileForm.handleChange}
                            error={
                                ProfileForm.touched.name &&
                                Boolean(ProfileForm.errors.name)
                            }
                            helperText={
                                ProfileForm.touched.name &&
                                ProfileForm.errors.name
                            }
                            disabled={ProfileForm.isSubmitting}
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
                            value={ProfileForm.values.email}
                            onChange={ProfileForm.handleChange}
                            error={
                                ProfileForm.touched.email &&
                                Boolean(ProfileForm.errors.email)
                            }
                            helperText={
                                ProfileForm.touched.email &&
                                ProfileForm.errors.email
                            }
                            disabled={ProfileForm.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="penName"
                            name="penName"
                            label="Pen Name"
                            type="text"
                            value={ProfileForm.values.penName}
                            onChange={ProfileForm.handleChange}
                            error={
                                ProfileForm.touched.penName &&
                                Boolean(ProfileForm.errors.penName)
                            }
                            helperText={
                                ProfileForm.touched.penName &&
                                ProfileForm.errors.penName
                            }
                            disabled={ProfileForm.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="bio"
                            name="bio"
                            label="Bio"
                            placeholder="Tell us about yourself"
                            type="text"
                            value={ProfileForm.values.bio}
                            onChange={ProfileForm.handleChange}
                            error={
                                ProfileForm.touched.bio &&
                                Boolean(ProfileForm.errors.bio)
                            }
                            helperText={
                                ProfileForm.touched.bio &&
                                ProfileForm.errors.bio
                            }
                            disabled={ProfileForm.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{
                                maxLength: 255,
                            }}
                            size="small"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                        <Typography variant="body2" component="p">
                            {`${ProfileForm.values.bio.length} / 255`}
                        </Typography>
                        <Box display="flex">
                            <Button
                                color="primary"
                                variant="contained"
                                disableElevation
                                disabled={ProfileForm.isSubmitting}
                                style={{
                                    marginRight: theme.spacing(1),
                                    marginLeft: "auto",
                                }}
                                onClick={ProfileForm.handleReset}
                            >
                                Reset
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disableElevation
                                disabled={ProfileForm.isSubmitting}
                            >
                                Create
                            </Button>
                        </Box>
                    </Form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography variant="h3" component="h1">
                        Change password
                    </Typography>
                    <Divider />
                    <Form handleSubmit={changePasswordForm.handleSubmit}>
                        <TextField
                            fullWidth
                            id="currentPassword"
                            name="currentPassword"
                            label="Current Password"
                            type="password"
                            value={changePasswordForm.values.currentPassword}
                            onChange={changePasswordForm.handleChange}
                            error={
                                changePasswordForm.touched.currentPassword &&
                                Boolean(
                                    changePasswordForm.errors.currentPassword
                                )
                            }
                            helperText={
                                changePasswordForm.touched.currentPassword &&
                                changePasswordForm.errors.currentPassword
                            }
                            disabled={changePasswordForm.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="newPassword"
                            name="newPassword"
                            label="New password"
                            type="password"
                            value={changePasswordForm.values.newPassword}
                            onChange={changePasswordForm.handleChange}
                            error={
                                changePasswordForm.touched.newPassword &&
                                Boolean(changePasswordForm.errors.newPassword)
                            }
                            helperText={
                                changePasswordForm.touched.newPassword &&
                                changePasswordForm.errors.newPassword
                            }
                            disabled={changePasswordForm.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            label="Re-enter new password"
                            type="password"
                            value={changePasswordForm.values.confirmNewPassword}
                            onChange={changePasswordForm.handleChange}
                            error={
                                changePasswordForm.touched.confirmNewPassword &&
                                Boolean(
                                    changePasswordForm.errors.confirmNewPassword
                                )
                            }
                            helperText={
                                changePasswordForm.touched.confirmNewPassword &&
                                changePasswordForm.errors.confirmNewPassword
                            }
                            disabled={changePasswordForm.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                        />

                        <Box display="flex">
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disableElevation
                                disabled={changePasswordForm.isSubmitting}
                                style={{ marginLeft: "auto" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Form>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Typography variant="h3" component="h1">
                        Delete account
                    </Typography>
                    <Divider />
                    <Typography variant="body1" component="p">
                        Deleting your account will result in the permanent
                        deletion of your Pages, Outlines, and Notes. This is an
                        irreversible process. To permanently delete your
                        account, enter the name on your account below.
                    </Typography>
                    <Form handleSubmit={formik.handleSubmit}>
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
                                formik.touched.name && formik.errors.name
                            }
                            disabled={formik.isSubmitting}
                            InputLabelProps={{ shrink: true }}
                            size="small"
                            variant="outlined"
                        />

                        <Box display="flex">
                            <Button
                                color="secondary"
                                variant="contained"
                                type="submit"
                                disableElevation
                                disabled={formik.isSubmitting}
                                style={{ marginLeft: "auto" }}
                            >
                                Delete Account
                            </Button>
                        </Box>
                    </Form>
                </TabPanel>
            </Grid>
        </NoSidebarWrapper>
    );
};
