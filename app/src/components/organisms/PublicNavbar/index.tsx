import {
    AppBar,
    AppBarProps,
    Box,
    Button,
    Grid,
    Hidden,
    Toolbar,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { NavbarTitle } from "../../atoms/NavbarTitle";

interface Props {
    dropdownMenuLabel: string;
    userLoggedIn: boolean;
    color?: AppBarProps["color"];
}

export const Navbar = ({ dropdownMenuLabel, userLoggedIn, color }: Props) => {
    console.log(userLoggedIn);
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
                            <Button component={Link} to="/register">
                                Sign Up
                            </Button>
                            <Button component={Link} to="/login">
                                Login
                            </Button>
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
