import { useQuery } from "@apollo/client";
import { Divider, Grid, List, Typography } from "@material-ui/core";
import { Fragment } from "react";

import { MagicSystemListItem } from "../../molecules/MagicSystemListItem";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import { MagicSystem } from "../../../types/magic-system";
import { GET_ALL_MAGIC_SYSTEMS_QUERY } from "../../../graphql/queries/magic-system";

export const ExploreList = () => {
    const { loading, error, data } = useQuery(GET_ALL_MAGIC_SYSTEMS_QUERY);

    if (loading) {
        return <p>Loading</p>;
    } else if (error) {
        return <p>Error</p>;
    } else {
        const magicSystems: MagicSystem[] = data.magicSystems;
        return (
            <>
                <NoSidebarWrapper>
                    <Grid item xs={12} sm={12} md={10}>
                        <Typography variant="h3" component="h2">
                            Explore
                        </Typography>
                        <Divider />
                        <Typography
                            variant="body1"
                            component="p"
                            display="inline"
                        >
                            Filter:
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} md={10}>
                        <List disablePadding>
                            {magicSystems.map((system, i) => {
                                return (
                                    <Fragment key={system.id}>
                                        {i ? <Divider component="li" /> : ""}
                                        <MagicSystemListItem
                                            system={system}
                                            linkDestination={`/explore/view/${system.id}`}
                                        />
                                    </Fragment>
                                );
                            })}
                        </List>
                    </Grid>
                </NoSidebarWrapper>
            </>
        );
    }
};
