import { useQuery } from "@apollo/client";
import { Grid } from "@material-ui/core";
import { useRouteMatch } from "react-router-dom";

import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import { MagicSystem } from "../../../types/magic-system";
import { VIEW_MAGIC_SYSTEM_QUERY } from "../../../graphql/queries/magic-system";

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
