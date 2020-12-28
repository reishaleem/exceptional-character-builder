import { useQuery } from "@apollo/client";
import {
    Box,
    Button,
    CircularProgress,
    Divider,
    Grid,
    List,
    Typography,
} from "@material-ui/core";
import { Fragment } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import { MagicSystemListItem } from "../../molecules/MagicSystemListItem";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import { MagicSystem } from "../../../types/magic-system";
import { getCurrentUser } from "../../../services/auth";
import { GET_USER_MAGIC_SYSTEMS_LIST_QUERY } from "../../../graphql/queries/magic-system";

export const UserMagicList = () => {
    const { url } = useRouteMatch();
    const currentUser = getCurrentUser();
    const { loading, error, data } = useQuery(
        GET_USER_MAGIC_SYSTEMS_LIST_QUERY,
        {
            variables: {
                id: currentUser.id,
            },
        }
    );
    console.log(data);
    if (error) {
        return <p>Error...</p>;
    } else {
        const magicSystems: MagicSystem[] = data?.user?.magicSystems;
        return (
            <>
                <NoSidebarWrapper>
                    <Grid item xs={12} sm={12} md={10}>
                        <Box display="flex" alignItems="center">
                            <Typography
                                variant="h3"
                                component="h1"
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
                    </Grid>

                    <Grid item xs={12} sm={12} md={10}>
                        {loading ? (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box>
                        ) : magicSystems.length > 0 ? (
                            <>
                                <Typography
                                    variant="body1"
                                    component="p"
                                    display="inline"
                                >
                                    Filter:
                                </Typography>
                                <List disablePadding>
                                    {magicSystems.map((system, i) => {
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
                                                <MagicSystemListItem
                                                    system={system}
                                                    linkDestination={`${url}/${system.id}/page/edit`}
                                                />
                                            </Fragment>
                                        );
                                    })}
                                </List>
                            </>
                        ) : (
                            <Box display="flex" justifyContent="center">
                                <Typography variant="body1" component="p">
                                    No Magic Systems created
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </NoSidebarWrapper>
            </>
        );
    }
};
