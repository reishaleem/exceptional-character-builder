import { Box, Button, Grid, Hidden, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Navbar } from "../../organisms/PublicNavbar";

export const Register = () => {
    const userName = "Reis Haleem";
    return (
        <Box>
            <Navbar
                color="primary"
                dropdownMenuLabel={userName}
                userLoggedIn={false}
            />
            <Grid container spacing={2} alignItems="center">
                <Hidden smDown>
                    <Grid item md={2}></Grid>
                </Hidden>
                <Grid
                    container
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    style={{ flexGrow: 1 }}
                >
                    <Grid item xs={12} sm={12} md={12} lg={6}>
                        <Typography variant="h2" component="h1">
                            Add a register form here
                        </Typography>
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid item md={2}></Grid>
                </Hidden>
                <div
                    style={{
                        backgroundColor: "white",
                        height: "50px",
                        width: "100%",
                        borderTopRightRadius: "50%",
                        borderTopLeftRadius: "50%",
                        marginTop: "auto",
                    }}
                ></div>
            </Grid>
        </Box>
    );
};
