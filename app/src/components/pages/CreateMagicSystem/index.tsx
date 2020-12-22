import {
    AppBar,
    Avatar,
    Box,
    Button,
    Checkbox,
    Chip,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    makeStyles,
    MenuItem,
    Slider,
    TextField,
    Theme,
    Toolbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";

import { UserMenu } from "../../molecules/UserMenu";
import { Fragment, useState } from "react";
import { NavbarTitle } from "../../atoms/NavbarTitle";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { Form } from "../../molecules/Form";
import { types } from "util";

interface Note {
    id: string;
    title: string;
    body: string;
}

interface Outline {
    id: string;
    title: string;
    body: string;
}

interface MagicSystem {
    id: string;
    name: string;
    description: string;
    page: string;
    notes: Note[];
    outlines: Outline[];
    updatedAt: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

interface FormFields {
    name: string;
    hardnessRating: number;
    type: string[];
    description: string;
}

interface FormFieldErrors {
    name: string;
    type: string;
    hardnessRating: string;
    description: string;
}

export const CreateMagicSystem = () => {
    const classes = useStyles();
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            name: "",
            type: [],
            hardnessRating: 5,
            description: "",
        },
        validate: (values: FormFields) => {
            const errors: Partial<FormFieldErrors> = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (values.type.length === 0) {
                errors.type = "Required";
            }

            if (!values.hardnessRating) {
                errors.hardnessRating = "Required";
            }

            return errors;
        },
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        magicSystem: FormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(magicSystem, null, 2));
        // direct to magic-systems list
        setSubmitting(false);
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <NavbarTitle text="The Exceptional Outliner" />
                    <Box marginLeft="auto">
                        <UserMenu
                            buttonDropdownType="avatar"
                            dropdownText="Reis Haleem"
                        >
                            <MenuItem component={Link} to="/settings">
                                Settings
                            </MenuItem>
                            <Divider />
                            <MenuItem component={Link} to="/">
                                Logout
                            </MenuItem>
                        </UserMenu>
                    </Box>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={12} md={8}>
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="h3"
                                component="h2"
                                display="inline"
                            >
                                Create Magic System
                            </Typography>
                        </Box>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} sm={12} md={6}>
                        <Form handleSubmit={formik.handleSubmit}>
                            <Grid container>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        name="name"
                                        label="Name"
                                        placeholder="E.g. Nen, Magic, Allomancy"
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
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    style={{ paddingRight: theme.spacing(1) }}
                                >
                                    <TextField
                                        id="type"
                                        name="type"
                                        label="Type(s)"
                                        error={
                                            formik.touched.type &&
                                            Boolean(formik.errors.type)
                                        }
                                        helperText={
                                            formik.touched.type &&
                                            formik.errors.type
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={formik.isSubmitting}
                                        fullWidth
                                        select
                                        SelectProps={{
                                            multiple: true,
                                            MenuProps: {
                                                anchorOrigin: {
                                                    vertical: "bottom",
                                                    horizontal: "center",
                                                },
                                                transformOrigin: {
                                                    vertical: "top",
                                                    horizontal: "center",
                                                },
                                                getContentAnchorEl: null,
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 48 * 4.5 + 9,
                                                    },
                                                },
                                            },
                                            renderValue: (selected) => {
                                                if (
                                                    (selected as string[])
                                                        .length === 0
                                                ) {
                                                    return (
                                                        <Typography
                                                            variant="body1"
                                                            component="p"
                                                            style={{
                                                                color: "grey",
                                                            }}
                                                        >
                                                            Select a type
                                                        </Typography>
                                                    );
                                                } else if (
                                                    (selected as string[])
                                                        .length > 3
                                                ) {
                                                    return (
                                                        <>
                                                            <Box
                                                                display="flex"
                                                                flexWrap="wrap"
                                                                alignItems="center"
                                                            >
                                                                {(selected as string[])
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            value
                                                                        ) => (
                                                                            <Chip
                                                                                key={
                                                                                    value
                                                                                }
                                                                                label={
                                                                                    value
                                                                                }
                                                                                style={{
                                                                                    margin: 2,
                                                                                }}
                                                                            />
                                                                        )
                                                                    )}

                                                                <Typography
                                                                    variant="body1"
                                                                    component="p"
                                                                    style={{
                                                                        marginLeft:
                                                                            "5px",
                                                                    }}
                                                                    display="inline"
                                                                >
                                                                    +
                                                                    {(selected as string[])
                                                                        .length -
                                                                        3}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </>
                                                    );
                                                }

                                                return (
                                                    <Box
                                                        display="flex"
                                                        flexWrap="wrap"
                                                    >
                                                        {(selected as string[]).map(
                                                            (value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        value
                                                                    }
                                                                    style={{
                                                                        margin: 2,
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                );
                                            },
                                            displayEmpty: true,
                                        }}
                                        value={formik.values.type}
                                        onChange={formik.handleChange}
                                        size="small"
                                        variant="outlined"
                                    >
                                        {[
                                            "Elemental",
                                            "Religious",
                                            "Aura",
                                            "Chakras",
                                        ].map((type) => {
                                            return (
                                                <MenuItem
                                                    value={type}
                                                    key={type}
                                                >
                                                    <Checkbox
                                                        checked={
                                                            formik.values.type.indexOf(
                                                                type
                                                            ) > -1
                                                        }
                                                    />
                                                    <ListItemText
                                                        primary={type}
                                                    />
                                                </MenuItem>
                                            );
                                        })}
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={5}
                                    style={{ paddingLeft: theme.spacing(1) }}
                                >
                                    <Typography
                                        variant="caption"
                                        component="p"
                                        style={{ color: "gray" }}
                                    >
                                        Hardness
                                    </Typography>
                                    <Slider
                                        value={formik.values.hardnessRating}
                                        onChange={(e, v) =>
                                            formik.setFieldValue(
                                                "hardnessRating",
                                                v
                                            )
                                        }
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        fullWidth
                                        id="description"
                                        name="description"
                                        label="Description (Optional)"
                                        placeholder="Give a couple of sentences that capture the fantastic (or not so fantastic) nature of your Magic System"
                                        type="text"
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        error={
                                            formik.touched.description &&
                                            Boolean(formik.errors.description)
                                        }
                                        helperText={
                                            formik.touched.description &&
                                            formik.errors.description
                                        }
                                        disabled={formik.isSubmitting}
                                        InputLabelProps={{ shrink: true }}
                                        size="small"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        disableElevation
                                        disabled={formik.isSubmitting}
                                    >
                                        Create Magic System
                                    </Button>
                                </Grid>
                            </Grid>
                        </Form>
                    </Grid>
                    <Grid item xs={12} sm={12} md={2}>
                        The thumbnail will go here
                    </Grid>
                </Grid>
            </main>
        </>
    );
};
