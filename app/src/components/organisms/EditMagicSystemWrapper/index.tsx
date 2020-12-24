import {
    Box,
    Collapse,
    CssBaseline,
    Divider,
    Drawer,
    Grid,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    useTheme,
} from "@material-ui/core";
import {
    Assignment,
    Create,
    Help,
    Note,
    NoteAdd,
    Menu,
    ExpandLess,
    ExpandMore,
} from "@material-ui/icons";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { MagicSystem } from "../../../types/magic-system";

import { AppNavbar } from "../AppNavbar";

interface Props {
    system: MagicSystem;
    activeItem: string;
    startOutlinesDropdownOpen?: boolean;
    startNotesDropdownOpen?: boolean;
    children: ReactNode;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
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

export const EditMagicSystemWrapper = ({
    system,
    activeItem,
    startOutlinesDropdownOpen,
    startNotesDropdownOpen,
    children,
}: Props) => {
    const theme = useTheme();
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
    const [outlinesDropdownOpen, setOutlinesDropdownOpen] = useState<boolean>(
        Boolean(startOutlinesDropdownOpen)
    );
    const [notesDropdownOpen, setNotesDropdownOpen] = useState<boolean>(
        Boolean(startNotesDropdownOpen)
    );

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
            <AppNavbar
                withDrawerSlider
                drawerOpen={drawerOpen}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
            />
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
                                <Menu />
                            </ListItemIcon>
                            <ListItemText primary={"Item2"} />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem button>
                            <ListItemIcon>
                                <Menu />
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
                        <ListItem
                            button
                            selected={activeItem === "Page"}
                            component={Link}
                            to="/magic-systems/1/page/edit"
                        >
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
                                {system.outlines.map((outline) => {
                                    return (
                                        <ListItem
                                            key={outline.id}
                                            button
                                            style={{
                                                paddingLeft: theme.spacing(4),
                                            }}
                                            selected={
                                                activeItem === outline.name
                                            }
                                        >
                                            <ListItemIcon>
                                                <Assignment />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={outline.name}
                                            />
                                        </ListItem>
                                    );
                                })}
                                <ListItem
                                    button
                                    style={{
                                        paddingLeft: theme.spacing(4),
                                    }}
                                    component={Link}
                                    to="/magic-systems/1/outlines/new"
                                    selected={activeItem === "New Outline"}
                                >
                                    <ListItemIcon>
                                        <Assignment />
                                    </ListItemIcon>
                                    <ListItemText primary="New Outline" />
                                </ListItem>
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
                                {system.notes.map((note) => {
                                    return (
                                        <ListItem
                                            key={note.id}
                                            button
                                            style={{
                                                paddingLeft: theme.spacing(4),
                                            }}
                                            selected={activeItem === note.name}
                                        >
                                            <ListItemIcon>
                                                <Note />
                                            </ListItemIcon>
                                            <ListItemText primary={note.name} />
                                        </ListItem>
                                    );
                                })}
                                <ListItem
                                    button
                                    style={{
                                        paddingLeft: theme.spacing(4),
                                    }}
                                    component={Link}
                                    to="/magic-systems/1/notes/new"
                                    selected={activeItem === "New Note"}
                                >
                                    <ListItemIcon>
                                        <NoteAdd />
                                    </ListItemIcon>
                                    <ListItemText primary="New Note" />
                                </ListItem>
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
                    {children}
                </Grid>
            </main>
        </Box>
    );
};
