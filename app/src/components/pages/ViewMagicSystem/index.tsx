import { Grid } from "@material-ui/core";

import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import { MagicSystem } from "../../../types/magic-system";
import {
    GET_ALL_MAGIC_SYSTEMS_QUERY,
    VIEW_MAGIC_SYSTEM_QUERY,
} from "../../../graphql/queries/magic-system";
import { useRouteMatch } from "react-router-dom";
import { getCurrentUser } from "../../../services/auth";
import { useQuery } from "@apollo/client";

export const ViewMagicSystem = () => {
    let { url } = useRouteMatch();
    const splitUrl = url.split("/");
    const magicSystemId = splitUrl[splitUrl.length - 1];
    const { loading, error, data } = useQuery(VIEW_MAGIC_SYSTEM_QUERY);

    if (loading) {
        return <p>Loading</p>;
    } else if (error) {
        return <p>Error</p>;
    } else {
        const magicSystems: MagicSystem[] = data.magicSystems;
        const magicSystem: MagicSystem = magicSystems.find(
            (system) => system.id === magicSystemId
        )!;
        console.log(magicSystem);
        return (
            <NoSidebarWrapper>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={8}
                    style={{ backgroundColor: "white" }}
                >
                    <div
                        dangerouslySetInnerHTML={{ __html: magicSystem.page }}
                    />
                </Grid>
            </NoSidebarWrapper>
        );
    }
};
