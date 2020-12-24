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
import { useState } from "react";
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

export const UserProfileSettings = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const currentUser = {
        name: "Reis",
        email: "reishaleem@gmail.com",
        penName: "Reis Haleem",
        bio: "",
    };

    const formik = useFormik({
        initialValues: {
            name: currentUser.name,
            email: currentUser.email,
            penName: currentUser.penName,
            bio: currentUser.bio,
        },
        validate: (values: FormFields) => {
            const errors: Partial<FormFields> = {};
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
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

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

    return (
        <NoSidebarWrapper>
            <Grid item xs={12} sm={12} md={2}>
                <Card elevation={1}>
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
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
                                formik.touched.email && formik.errors.email
                            }
                            disabled={formik.isSubmitting}
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
                            value={formik.values.penName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.penName &&
                                Boolean(formik.errors.penName)
                            }
                            helperText={
                                formik.touched.penName && formik.errors.penName
                            }
                            disabled={formik.isSubmitting}
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
                            value={formik.values.bio}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.bio && Boolean(formik.errors.bio)
                            }
                            helperText={formik.touched.bio && formik.errors.bio}
                            disabled={formik.isSubmitting}
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
                            {`${formik.values.bio.length} / 255`}
                        </Typography>
                        <Box display="flex">
                            <Button
                                color="primary"
                                variant="contained"
                                disableElevation
                                disabled={formik.isSubmitting}
                                style={{
                                    marginRight: theme.spacing(1),
                                    marginLeft: "auto",
                                }}
                                onClick={formik.handleReset}
                            >
                                Reset
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disableElevation
                                disabled={formik.isSubmitting}
                            >
                                Create
                            </Button>
                        </Box>
                    </Form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Sec
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Del
                </TabPanel>
            </Grid>
        </NoSidebarWrapper>
    );
};
