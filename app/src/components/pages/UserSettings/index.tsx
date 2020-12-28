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
import { Link, useHistory } from "react-router-dom";

import { TabPanel } from "../../atoms/TabPanel";
import { Form } from "../../molecules/Form";
import { Notification } from "../../molecules/Notification";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import {
    ChangePasswordFields,
    DeleteAccountFields,
    EditProfileFields,
} from "../../../types/form-types";
import { getCurrentUser } from "../../../services/auth";
import { useMutation } from "@apollo/client";
import {
    DELETE_USER_MUTATION,
    UPDATE_USER_PROFILE_MUTATION,
    UPDATE_USER_SECURITY_MUTATION,
} from "../../../graphql/mutations/user";
import { useState } from "react";

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
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
    const theme: Theme = useTheme();
    const history = useHistory();
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);

    const currentUser = getCurrentUser();
    const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE_MUTATION, {
        onError: () => {
            setOpenError(true);
        },
    });
    const [updateUserPassword] = useMutation(UPDATE_USER_SECURITY_MUTATION, {
        onError: () => {
            setOpenError(true);
        },
    });
    const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
        onError: () => {
            setOpenError(true);
        },
    });

    const deleteForm = useFormik({
        initialValues: {
            name: "",
        },
        validate: (values: DeleteAccountFields) => {
            const errors: Partial<DeleteAccountFields> = {};
            if (!values.name) {
                errors.name = "Required";
            } else if (values.name !== currentUser.name) {
                errors.name = "Your name is incorrect!";
            }

            return errors;
        },
        onSubmit: (values: DeleteAccountFields, { setSubmitting }) => {
            handleDeleteSubmit(values, setSubmitting);
        },
    });

    const changePasswordForm = useFormik({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
        validate: (values: ChangePasswordFields) => {
            const errors: Partial<ChangePasswordFields> = {};
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
        onSubmit: (values: ChangePasswordFields, { setSubmitting }) => {
            handleChangePasswordSubmit(values, setSubmitting);
        },
    });

    const profileForm = useFormik({
        initialValues: {
            name: currentUser.name,
            email: currentUser.email,
            penName: currentUser.penName,
            bio: currentUser.bio,
        },
        validate: (values: EditProfileFields) => {
            const errors: Partial<EditProfileFields> = {};
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
        onSubmit: (values: EditProfileFields, { setSubmitting }) => {
            handleProfileSubmit(values, setSubmitting);
        },
    });

    async function handleProfileSubmit(
        user: EditProfileFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await updateUserProfile({
            variables: {
                id: currentUser.id,
                name: user.name,
                email: user.email,
                penName: user.penName,
                bio: user.bio,
            },
        });
        if (response) {
            setOpenSuccess(true);
        }

        setSubmitting(false);
    }

    async function handleDeleteSubmit(
        user: DeleteAccountFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await deleteUser({
            variables: {
                id: currentUser.id,
            },
        });
        if (response && response.data) {
            history.push("/");
        } else {
            setSubmitting(false);
        }
    }

    async function handleChangePasswordSubmit(
        user: ChangePasswordFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await updateUserPassword({
            variables: {
                id: currentUser.id,
                currentPassword: user.currentPassword,
                newPassword: user.newPassword,
            },
        });
        if (response) {
            setOpenSuccess(true);
        }

        setSubmitting(false);
    }

    return (
        <>
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
                        <Form handleSubmit={profileForm.handleSubmit}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                value={profileForm.values.name}
                                onChange={profileForm.handleChange}
                                error={
                                    profileForm.touched.name &&
                                    Boolean(profileForm.errors.name)
                                }
                                helperText={
                                    profileForm.touched.name &&
                                    profileForm.errors.name
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={profileForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <TextField
                                id="email"
                                name="email"
                                label="Email"
                                type="text"
                                value={profileForm.values.email}
                                onChange={profileForm.handleChange}
                                error={
                                    profileForm.touched.email &&
                                    Boolean(profileForm.errors.email)
                                }
                                helperText={
                                    profileForm.touched.email &&
                                    profileForm.errors.email
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={profileForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <TextField
                                id="penName"
                                name="penName"
                                label="Pen Name"
                                type="text"
                                value={profileForm.values.penName}
                                onChange={profileForm.handleChange}
                                error={
                                    profileForm.touched.penName &&
                                    Boolean(profileForm.errors.penName)
                                }
                                helperText={
                                    profileForm.touched.penName &&
                                    profileForm.errors.penName
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={profileForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <TextField
                                id="bio"
                                name="bio"
                                label="Bio"
                                placeholder="Tell us about yourself"
                                type="text"
                                value={profileForm.values.bio}
                                onChange={profileForm.handleChange}
                                error={
                                    profileForm.touched.bio &&
                                    Boolean(profileForm.errors.bio)
                                }
                                helperText={
                                    profileForm.touched.bio &&
                                    profileForm.errors.bio
                                }
                                InputLabelProps={{ shrink: true }}
                                inputProps={{
                                    maxLength: 255,
                                }}
                                disabled={profileForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                            <Typography variant="body2" component="p">
                                {`${profileForm.values.bio.length} / 255`}
                            </Typography>
                            <Box display="flex">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disableElevation
                                    disabled={profileForm.isSubmitting}
                                    style={{
                                        marginRight: theme.spacing(1),
                                        marginLeft: "auto",
                                    }}
                                    onClick={profileForm.handleReset}
                                >
                                    Reset
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    disabled={profileForm.isSubmitting}
                                >
                                    Submit
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
                                id="currentPassword"
                                name="currentPassword"
                                label="Current Password"
                                type="password"
                                value={
                                    changePasswordForm.values.currentPassword
                                }
                                onChange={changePasswordForm.handleChange}
                                error={
                                    changePasswordForm.touched
                                        .currentPassword &&
                                    Boolean(
                                        changePasswordForm.errors
                                            .currentPassword
                                    )
                                }
                                helperText={
                                    changePasswordForm.touched
                                        .currentPassword &&
                                    changePasswordForm.errors.currentPassword
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={changePasswordForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <TextField
                                id="newPassword"
                                name="newPassword"
                                label="New password"
                                type="password"
                                value={changePasswordForm.values.newPassword}
                                onChange={changePasswordForm.handleChange}
                                error={
                                    changePasswordForm.touched.newPassword &&
                                    Boolean(
                                        changePasswordForm.errors.newPassword
                                    )
                                }
                                helperText={
                                    changePasswordForm.touched.newPassword &&
                                    changePasswordForm.errors.newPassword
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={changePasswordForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                            />
                            <TextField
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                label="Re-enter new password"
                                type="password"
                                value={
                                    changePasswordForm.values.confirmNewPassword
                                }
                                onChange={changePasswordForm.handleChange}
                                error={
                                    changePasswordForm.touched
                                        .confirmNewPassword &&
                                    Boolean(
                                        changePasswordForm.errors
                                            .confirmNewPassword
                                    )
                                }
                                helperText={
                                    changePasswordForm.touched
                                        .confirmNewPassword &&
                                    changePasswordForm.errors.confirmNewPassword
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={changePasswordForm.isSubmitting}
                                fullWidth
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
                            deletion of your Pages, Outlines, and Notes. This is
                            an irreversible process. To permanently delete your
                            account, enter the name on your account below.
                        </Typography>
                        <Form handleSubmit={deleteForm.handleSubmit}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                value={deleteForm.values.name}
                                onChange={deleteForm.handleChange}
                                error={
                                    deleteForm.touched.name &&
                                    Boolean(deleteForm.errors.name)
                                }
                                helperText={
                                    deleteForm.touched.name &&
                                    deleteForm.errors.name
                                }
                                InputLabelProps={{ shrink: true }}
                                disabled={deleteForm.isSubmitting}
                                fullWidth
                                size="small"
                                variant="outlined"
                            />

                            <Box display="flex">
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    type="submit"
                                    disableElevation
                                    disabled={deleteForm.isSubmitting}
                                    style={{ marginLeft: "auto" }}
                                >
                                    Delete Account
                                </Button>
                            </Box>
                        </Form>
                    </TabPanel>
                </Grid>
            </NoSidebarWrapper>
            <Notification
                message="Changes saved"
                severity="success"
                open={openSuccess}
                setOpen={setOpenSuccess}
            />
            <Notification
                message="An error occurred. Please try again."
                severity="error"
                open={openError}
                setOpen={setOpenError}
            />
        </>
    );
};
