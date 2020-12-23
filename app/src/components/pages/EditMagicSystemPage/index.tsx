import {
    AppBar,
    Avatar,
    Box,
    Button,
    Collapse,
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
    TextField,
    Theme,
    Toolbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DescriptionIcon from "@material-ui/icons/Description";
import clsx from "clsx";

import { UserMenu } from "../../molecules/UserMenu";
import { Fragment, useState } from "react";
import { NavbarTitle } from "../../atoms/NavbarTitle";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FormikProps, useField, useFormik } from "formik";
import { Assignment, Create, Help, Note, NoteAdd } from "@material-ui/icons";
import { RichTextEditor } from "../../organisms/RichTextEditor";
import { Form } from "../../molecules/Form";

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

interface FormFields {
    body: string;
}

// interface FormFieldErrors {
//     name: string;
//     type: string;
//     hardnessRating: string;
//     description: string;
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
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
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

export const EditMagicSystemPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(true);
    const [outlinesDropdownOpen, setOutlinesDropdownOpen] = useState<boolean>(
        false
    );
    const [notesDropdownOpen, setNotesDropdownOpen] = useState<boolean>(false);

    const magicSystem: MagicSystem = {
        id: "1",
        name: "Nen",
        description: "A magic system from Hunter x Hunter",
        page: "<h1>Nen</h1>",
        notes: [
            {
                id: "1",
                title: "Test note",
                body: "This is just a test note",
            },
        ],
        outlines: [
            {
                id: "1",
                title: "Source outline",
                body:
                    "This is the body of the outline about the source of magic",
            },
        ],
        updatedAt: "1608587625018",
    };
    const [pageContent, setPageContent] = useState(magicSystem.page);

    const formik = useFormik({
        initialValues: {
            body: pageContent,
        },
        validate: (values: FormFields) => {
            const errors: Partial<FormFields> = {};

            return errors;
        },
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    function handleChange(newContent: string) {
        setPageContent(newContent);
        formik.values.body = newContent;
    }

    async function handleSubmit(
        body: FormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(body, null, 2));

        setSubmitting(false);
    }

    function handleDrawerOpen() {
        setDrawerOpen(true);
    }

    function handleDrawerClose() {
        setDrawerOpen(false);
    }

    function handleOutlinesDropdownClick() {
        setOutlinesDropdownOpen(!outlinesDropdownOpen);
    }

    function handleNotesDropdownClick() {
        setNotesDropdownOpen(!notesDropdownOpen);
    }

    return (
        <Box display="flex">
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: drawerOpen,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={
                            drawerOpen ? handleDrawerClose : handleDrawerOpen
                        }
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>

                    <NavbarTitle
                        text="The Exceptional Outliner"
                        link
                        to="/magic-systems"
                    />
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
            <Hidden smUp>
                <Drawer
                    //container={container}
                    variant="temporary"
                    anchor="left"
                    open={drawerOpen}
                    onClose={handleDrawerClose}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                >
                    <div className={classes.drawerHeader}>Logo</div>
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Item2"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Item1"} />
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
            <Hidden xsDown>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={drawerOpen}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>Logo</div>
                    <List>
                        <ListItem button selected>
                            <ListItemIcon>
                                <Create />
                            </ListItemIcon>
                            <ListItemText primary="Page" />
                        </ListItem>

                        <ListItem button onClick={handleOutlinesDropdownClick}>
                            <ListItemIcon>
                                <Assignment />
                            </ListItemIcon>
                            <ListItemText primary={"Outlines"} />
                            {outlinesDropdownOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </ListItem>
                        <Collapse
                            in={outlinesDropdownOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {magicSystem.outlines.length > 0 ? (
                                    magicSystem.outlines.map((outline) => {
                                        return (
                                            <ListItem
                                                key={outline.id}
                                                button
                                                style={{
                                                    paddingLeft: theme.spacing(
                                                        4
                                                    ),
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Assignment />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={outline.title}
                                                />
                                            </ListItem>
                                        );
                                    })
                                ) : (
                                    <ListItem
                                        button
                                        style={{
                                            paddingLeft: theme.spacing(4),
                                        }}
                                    >
                                        <ListItemIcon>
                                            <Assignment />
                                        </ListItemIcon>
                                        <ListItemText primary="New Outline" />
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>
                        <ListItem button onClick={handleNotesDropdownClick}>
                            <ListItemIcon>
                                <Note />
                            </ListItemIcon>
                            <ListItemText primary={"Notes"} />
                            {notesDropdownOpen ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
                        </ListItem>
                        <Collapse
                            in={notesDropdownOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {magicSystem.notes.length > 0 ? (
                                    magicSystem.notes.map((note) => {
                                        return (
                                            <ListItem
                                                key={note.id}
                                                button
                                                style={{
                                                    paddingLeft: theme.spacing(
                                                        4
                                                    ),
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Note />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={note.title}
                                                />
                                            </ListItem>
                                        );
                                    })
                                ) : (
                                    <ListItem
                                        button
                                        style={{
                                            paddingLeft: theme.spacing(4),
                                        }}
                                    >
                                        <ListItemIcon>
                                            <NoteAdd />
                                        </ListItemIcon>
                                        <ListItemText primary="New Note" />
                                    </ListItem>
                                )}
                            </List>
                        </Collapse>
                        <Divider />
                        <List>
                            <ListItem button>
                                <ListItemIcon>
                                    <Help />
                                </ListItemIcon>
                                <ListItemText primary="Help" />
                            </ListItem>
                        </List>
                    </List>
                </Drawer>
            </Hidden>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={12} md={10}>
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="h3"
                                component="h2"
                                display="inline"
                            >
                                {magicSystem.name}
                            </Typography>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                form="page-body-form"
                                disabled={formik.isSubmitting}
                                style={{ marginLeft: "auto" }}
                            >
                                Save
                            </Button>
                        </Box>
                        <Divider />
                    </Grid>

                    <Grid item xs={12} sm={12} md={10}>
                        <Form
                            handleSubmit={formik.handleSubmit}
                            id="page-body-form"
                        >
                            <RichTextEditor
                                content={pageContent}
                                onEditorChange={handleChange}
                            />
                        </Form>
                    </Grid>
                </Grid>
            </main>
        </Box>
    );
};
