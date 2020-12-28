import { useMutation } from "@apollo/client";
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
    ExpandLess,
    ExpandMore,
} from "@material-ui/icons";
import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { AppNavbar } from "../AppNavbar";

import { MagicSystem } from "../../../types/magic-system";
import { CREATE_NOTE_MUTATION } from "../../../graphql/mutations/magic-system";
import { GET_MAGIC_SYSTEM_QUERY } from "../../../graphql/queries/magic-system";
import { getCurrentUser } from "../../../services/auth";
import { JwtUser } from "../../../types/user";

interface Props {
    system: MagicSystem;
    children?: ReactNode;
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

export const EditMagicSystemWrapper = ({ system, children }: Props) => {
    const theme: Theme = useTheme();
    const classes = useStyles();
    const history = useHistory();
    const [drawerOpen, setDrawerOpen] = useState<boolean>(true);
    const [outlinesDropdownOpen, setOutlinesDropdownOpen] = useState<boolean>(
        Boolean(false)
    );
    const [notesDropdownOpen, setNotesDropdownOpen] = useState<boolean>(
        Boolean(false)
    );
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [createNote] = useMutation(CREATE_NOTE_MUTATION);
    const currentUser: JwtUser = getCurrentUser();

    const { url } = useRouteMatch();

    const handleListItemClick = (
        _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        setSelectedIndex(index);
    };

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

    async function handleCreateNoteClick() {
        const response = await createNote({
            variables: {
                ownerId: currentUser.id,
                magicSystemId: system.id,
            },
            refetchQueries: [
                {
                    query: GET_MAGIC_SYSTEM_QUERY,
                    variables: {
                        ownerId: currentUser.id,
                        magicSystemId: system.id,
                    },
                },
            ],
            awaitRefetchQueries: true,
        });
        if (response && response.data) {
            history.push(
                `/magic-systems/${system.id}/notes/${response.data.createNote.id}/edit`
            );
        }
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
                            selected={selectedIndex === 0}
                            onClick={(event: any) =>
                                handleListItemClick(event, 0)
                            }
                            component={Link}
                            to={`${url}/page/edit`}
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
                                {system?.outlines.map((outline, i) => {
                                    return (
                                        <ListItem
                                            key={outline.id}
                                            button
                                            style={{
                                                paddingLeft: theme.spacing(4),
                                            }}
                                            selected={selectedIndex === i + 1}
                                            onClick={(event: any) =>
                                                handleListItemClick(
                                                    event,
                                                    i + 1
                                                )
                                            }
                                            component={Link}
                                            to={`${url}/outlines/${outline.id}/edit`}
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
                                    to={`${url}/outlines/new`}
                                    selected={
                                        selectedIndex ===
                                        1 + system?.outlines.length
                                    }
                                    onClick={(event: any) =>
                                        handleListItemClick(
                                            event,
                                            1 + system?.outlines.length
                                        )
                                    }
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
                                {system?.notes.map((note, i) => {
                                    return (
                                        <ListItem
                                            key={note.id}
                                            button
                                            style={{
                                                paddingLeft: theme.spacing(4),
                                            }}
                                            selected={
                                                selectedIndex ===
                                                1 +
                                                    system?.outlines.length +
                                                    1 +
                                                    1 +
                                                    i
                                            }
                                            onClick={(event: any) =>
                                                handleListItemClick(
                                                    event,
                                                    1 +
                                                        system?.outlines
                                                            .length +
                                                        1 +
                                                        1 +
                                                        i
                                                )
                                            }
                                            component={Link}
                                            to={`${url}/notes/${note.id}/edit`}
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
                                    selected={
                                        selectedIndex ===
                                        1 +
                                            system?.outlines.length +
                                            1 +
                                            1 +
                                            system?.notes.length +
                                            1
                                    }
                                    onClick={handleCreateNoteClick}
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
