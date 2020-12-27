import { Box, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "../../../services/auth";

import { Navbar } from "../../organisms/PublicNavbar";

interface Props {
    backgroundColor: string;
}

export const Home = ({ backgroundColor }: Props) => {
    const currentUser = getCurrentUser();
    const loggedIn = isLoggedIn();
    return (
        <Box
            style={{
                background: backgroundColor,
            }}
        >
            <Navbar
                color="transparent"
                dropdownMenuLabel={currentUser && currentUser.name}
                userLoggedIn={loggedIn}
            />
            <Grid
                container
                spacing={2}
                style={{
                    height: "90vh",
                }}
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    <Typography variant="h2" component="h1">
                        Here is the main text
                    </Typography>
                    <Typography variant="h5" component="p" gutterBottom>
                        Here is the subtext. It may be multiple lines, but right
                        now, I am making it into a paragraph that takes up a few
                        lines. I am no sure what it will include, though.
                    </Typography>
                    <Button variant="contained" component={Link} to="/register">
                        Create your account
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={4}>
                    A picture or graphic
                </Grid>

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
                justify="center"
            >
                <Grid item xs={12} sm={12} md={8}>
                    <Typography variant="h3" component="h2">
                        User driven features
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Typography variant="h6" component="p">
                        List out features
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};
