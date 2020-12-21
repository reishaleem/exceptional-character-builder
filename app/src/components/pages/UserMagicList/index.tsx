import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
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
    MenuItem,
    TextField,
    Theme,
    Toolbar,
    Typography,
    useTheme,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import { useFormik } from "formik";

import { Navbar } from "../../organisms/PublicNavbar";
import { UserMenu } from "../../molecules/UserMenu";
import { Form } from "../../molecules/Form";
import { useState } from "react";
import { NavbarTitle } from "../../atoms/NavbarTitle";
import { Link } from "react-router-dom";

interface LoginFormFields {
    email: string;
    password: string;
}

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

export const UserMagicList = () => {
    const userName = "Reis Haleem";
    const classes = useStyles();
    const theme = useTheme();
    const [drawerOpen, setDrawerOpen] = useState(true);

    function handleDrawerOpen() {
        setDrawerOpen(true);
    }

    function handleDrawerClose() {
        setDrawerOpen(false);
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
                        <ListItem button>
                            <ListItemIcon>
                                <MenuIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Item1"} />
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
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: drawerOpen,
                })}
            >
                <div className={classes.drawerHeader} />
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        User Magic List
                    </Grid>
                </Grid>
            </main>
        </Box>
    );
};
