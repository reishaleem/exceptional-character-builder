import { Box, Divider, Grid, List, Typography } from "@material-ui/core";
import { Fragment } from "react";

import { MagicSystemListItem } from "../../molecules/MagicSystemListItem";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import { MagicSystem } from "../../../types/magic-system";

export const ExploreList = () => {
    const magicSystems: MagicSystem[] = [
        {
            id: "1",
            name: "Nen",
            description: "A magic system from Hunter x Hunter",
            page: "<h1>Page Code</h1>",
            notes: [
                {
                    id: "1",
                    name: "Test note",
                    body: "This is just a test note",
                },
            ],
            outlines: [
                {
                    id: "1",
                    name: "Source outline",
                    body:
                        "This is the body of the outline about the source of magic",
                },
            ],
            updatedAt: "1606150372000",
        },
        {
            id: "2",
            name: "Devil Fruits",
            description:
                "A magic system from One Piece. It has 3 different types of fruits that gives you differnt poweres depending on which you eat.",
            page: "<h1>Page Code 2</h1>",
            notes: [
                {
                    id: "1",
                    name: "Test note",
                    body: "This is just a test note",
                },
            ],
            outlines: [
                {
                    id: "1",
                    name: "Source outline",
                    body:
                        "This is the body of the outline about the source of magic",
                },
            ],
            updatedAt: "1608589417000",
        },
    ];

    return (
        <>
            <NoSidebarWrapper>
                <Grid item xs={12} sm={12} md={10}>
                    <Box display="flex" alignItems="center">
                        <Typography
                            variant="h3"
                            component="h2"
                            display="inline"
                        >
                            Explore
                        </Typography>
                    </Box>
                    <Divider />
                    <Typography variant="body1" component="p" display="inline">
                        Filter:
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={10}>
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
                                        linkDestination={`/magic-systems/view/${system.id}`}
                                    />
                                </Fragment>
                            );
                        })}
                    </List>
                </Grid>
            </NoSidebarWrapper>
        </>
    );
};
