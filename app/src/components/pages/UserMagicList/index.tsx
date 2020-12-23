import {
    AppBar,
    Avatar,
    Box,
    Button,
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
    const classes = useStyles();
    const theme = useTheme();

    const magicSystems: MagicSystem[] = [
        {
            id: "1",
            name: "Nen",
            description: "A magic system from Hunter x Hunter",
            page: "<h1>Page Code</h1>",
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
        },
        {
            id: "2",
            name: "Devil Fruits",
            description:
                "A magic system from One Piece. It has 3 different types of fruits that gives you differnt poweres depending on which you eat.",
            page: "<h1>Page Code 2</h1>",
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
            updatedAt: "1608589417000",
        },
    ];

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Grid container justify="center">
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={8}
                            style={{ display: "flex", alignItems: "center" }}
                        >
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
                        </Grid>
                    </Grid>
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
                                Magic Systems
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to="/magic-systems/new"
                                style={{
                                    marginLeft: "auto",
                                }}
                            >
                                Create
                            </Button>
                        </Box>
                        <Divider />
                        <Typography
                            variant="body1"
                            component="p"
                            display="inline"
                        >
                            Filter:
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={8}>
                        <List>
                            {magicSystems.map((system, i) => {
                                let dayDiff = dayjs().diff(
                                    dayjs(parseInt(system.updatedAt)),
                                    "day"
                                );
                                let hourDiff = dayjs().diff(
                                    dayjs(parseInt(system.updatedAt)),
                                    "hour"
                                );
                                let minuteDiff = dayjs().diff(
                                    dayjs(parseInt(system.updatedAt)),
                                    "minute"
                                );

                                let timeSince = "";
                                if (dayDiff > 30) {
                                    if (
                                        dayjs().diff(
                                            dayjs(parseInt(system.updatedAt)),
                                            "year"
                                        ) >= 1
                                    ) {
                                        timeSince =
                                            "on " +
                                            dayjs(
                                                parseInt(system.updatedAt)
                                            ).format("MMM D, YYYY");
                                    } else {
                                        timeSince =
                                            "on " +
                                            dayjs(
                                                parseInt(system.updatedAt)
                                            ).format("MMM D");
                                    }
                                } else if (dayDiff > 0 && dayDiff <= 30) {
                                    if (dayDiff > 1) {
                                        timeSince = dayDiff + " days ago";
                                    } else {
                                        timeSince = dayDiff + " day ago";
                                    }
                                } else if (hourDiff > 0 && hourDiff <= 23) {
                                    if (hourDiff > 1) {
                                        timeSince = hourDiff + " hours ago";
                                    } else {
                                        timeSince = hourDiff + " hour ago";
                                    }
                                } else if (minuteDiff > 0 && minuteDiff <= 59) {
                                    if (minuteDiff > 1) {
                                        timeSince = minuteDiff + " minutes ago";
                                    } else {
                                        timeSince = minuteDiff + " minute ago";
                                    }
                                } else {
                                    timeSince = " less than a minute ago";
                                }
                                return (
                                    <Fragment key={system.id}>
                                        {i ? (
                                            <Divider
                                                //variant="inset"
                                                component="li"
                                            />
                                        ) : (
                                            ""
                                        )}
                                        <ListItem
                                            alignItems="flex-start"
                                            button
                                            component={Link}
                                            to={`/magic-systems/${system.id}/page/edit`}
                                        >
                                            <ListItemAvatar
                                                style={{
                                                    height: theme.spacing(10),
                                                    width: theme.spacing(10),
                                                }}
                                            >
                                                <Avatar
                                                    style={{
                                                        height: theme.spacing(
                                                            8
                                                        ),
                                                        width: theme.spacing(8),
                                                    }}
                                                >
                                                    T
                                                </Avatar>
                                            </ListItemAvatar>
                                            <Box width="60%">
                                                <ListItemText
                                                    primary={
                                                        <Typography
                                                            variant="h5"
                                                            component="p"
                                                        >
                                                            {system.name}
                                                        </Typography>
                                                    }
                                                    secondary={
                                                        <>
                                                            <Typography
                                                                variant="body1"
                                                                component="p"
                                                            >
                                                                {
                                                                    system.description
                                                                }
                                                            </Typography>
                                                            <br />
                                                            <Typography
                                                                variant="body2"
                                                                component="p"
                                                                gutterBottom
                                                            >
                                                                {"Updated " +
                                                                    timeSince}
                                                            </Typography>
                                                        </>
                                                    }
                                                />
                                            </Box>
                                        </ListItem>
                                    </Fragment>
                                );
                            })}
                        </List>
                    </Grid>
                </Grid>
            </main>
        </>
    );
};
