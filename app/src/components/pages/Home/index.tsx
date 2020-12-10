import { Box, Button, Grid, Hidden, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Navbar } from "../../organisms/PublicNavbar";

interface Props {
    backgroundColor: string;
}

export const Home = ({ backgroundColor }: Props) => {
    const userName = "Reis Haleem";
    const loggedIn = false;
    return (
        <Box
            style={{
                background: backgroundColor,
            }}
        >
            <Navbar
                color="transparent"
                dropdownMenuLabel={userName}
                userLoggedIn={loggedIn}
            />
            <Grid
                container
                spacing={2}
                style={{
                    height: "90vh",
                }}
                alignItems="center"
            >
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
                            Here is the main text
                        </Typography>
                        <Typography variant="h5" component="p" gutterBottom>
                            Here is the subtext. It may be multiple lines, but
                            right now, I am making it into a paragraph that
                            takes up a few lines. I am no sure what it will
                            include, though.
                        </Typography>
                        <Button
                            variant="contained"
                            component={Link}
                            to="/register"
                        >
                            Create your account
                        </Button>
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

            <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                style={{ backgroundColor: "white" }}
            >
                <Hidden smDown>
                    <Grid item md={2}></Grid>
                </Hidden>
                <Grid container item xs={12} sm={12} md={8}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h3" component="h2">
                            User driven features
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h6" component="p">
                            List out features
                        </Typography>
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid item md={2}></Grid>
                </Hidden>
            </Grid>
        </Box>
    );
};
