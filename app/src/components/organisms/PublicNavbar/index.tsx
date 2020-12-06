import {
    AppBar,
    AppBarProps,
    Box,
    Button,
    Divider,
    Grid,
    Hidden,
    MenuItem,
    Toolbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { NavbarTitle } from "../../atoms/NavbarTitle";
import { UserMenu } from "../../molecules/UserMenu";

import OnePiece from "../../../images/onepieceworldbright.jpg";

interface Props {
    dropdownMenuLabel: string;
    userLoggedIn: boolean;
    color?: AppBarProps["color"];
}

export const Navbar = ({ dropdownMenuLabel, userLoggedIn, color }: Props) => {
    return (
        <AppBar position="static" elevation={0} color={color}>
            <Toolbar>
                <Grid container>
                    <Hidden smDown>
                        <Grid item md={2}></Grid>
                    </Hidden>
                    <Grid container item xs={12} sm={12} md={8}>
                        <NavbarTitle
                            link
                            to="/"
                            text="The Exceptional Outliner"
                        />
                        <Box marginLeft="auto">
                            {userLoggedIn ? (
                                <UserMenu
                                    avatarImage={OnePiece}
                                    buttonDropdownType="avatar"
                                    dropdownText={dropdownMenuLabel}
                                >
                                    <MenuItem component={Link} to="/dashboard">
                                        Dashboard
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem component={Link} to="/">
                                        Sign out
                                    </MenuItem>
                                </UserMenu>
                            ) : (
                                <>
                                    <Button component={Link} to="/register">
                                        Sign Up
                                    </Button>
                                    <Button component={Link} to="/login">
                                        Login
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Grid>
                    <Hidden smDown>
                        <Grid item md={2}></Grid>
                    </Hidden>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};
