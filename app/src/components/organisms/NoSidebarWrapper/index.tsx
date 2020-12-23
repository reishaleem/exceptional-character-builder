import {
    AppBar,
    Box,
    Divider,
    Grid,
    MenuItem,
    Toolbar,
    useTheme,
} from "@material-ui/core";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { NavbarTitle } from "../../atoms/NavbarTitle";
import { UserMenu } from "../../molecules/UserMenu";

interface Props {
    children: ReactNode;
}

export const NoSidebarWrapper = ({ children }: Props) => {
    const theme = useTheme();

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

            <Box flexGrow={1} padding={theme.spacing(0.5)}>
                <Grid container justify="center" spacing={2}>
                    {children}
                </Grid>
            </Box>
        </>
    );
};
