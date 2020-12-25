import {
    AppBar,
    Box,
    Button,
    Divider,
    Grid,
    IconButton,
    makeStyles,
    MenuItem,
    Theme,
    Toolbar,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import clsx from "clsx";
import { Link } from "react-router-dom";

import { NavbarTitle } from "../../atoms/NavbarTitle";
import { UserMenu } from "../../molecules/UserMenu";

interface Props {
    withDrawerSlider?: boolean;
    drawerOpen?: boolean;
    handleDrawerOpen?: any;
    handleDrawerClose?: any;
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
}));

export const AppNavbar = ({
    withDrawerSlider,
    drawerOpen,
    handleDrawerOpen,
    handleDrawerClose,
}: Props) => {
    const classes = useStyles();
    return (
        <AppBar
            position={withDrawerSlider ? "fixed" : "static"}
            className={clsx({
                [classes.appBar]: withDrawerSlider,
                [classes.appBarShift]: withDrawerSlider && drawerOpen,
            })}
        >
            <Toolbar>
                <Grid container justify="center">
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={10}
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        {withDrawerSlider && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={
                                    drawerOpen
                                        ? handleDrawerClose
                                        : handleDrawerOpen
                                }
                                className={clsx(classes.menuButton)}
                            >
                                <Menu />
                            </IconButton>
                        )}

                        <NavbarTitle
                            text="The Exceptional Outliner"
                            link
                            to="/magic-systems"
                        />
                        <Button component={Link} to="/magic-systems">
                            Home
                        </Button>
                        <Button component={Link} to="/explore">
                            Explore
                        </Button>
                        <Box marginLeft="auto">
                            <UserMenu
                                buttonDropdownType="avatar"
                                dropdownText="Reis Haleem"
                            >
                                <MenuItem
                                    component={Link}
                                    to="/settings/profile"
                                >
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
    );
};
