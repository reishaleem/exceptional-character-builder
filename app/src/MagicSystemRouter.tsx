import { Switch, useRouteMatch } from "react-router-dom";
import { EditMagicSystemWrapper } from "./components/organisms/EditMagicSystemWrapper";

import { EditMagicSystemPage } from "./components/pages/EditMagicSystemPage";
import { CreateOutline } from "./components/pages/CreateOutline";
import { EditOutline } from "./components/pages/EditOutline";
import { CreateNote } from "./components/pages/CreateNote";
import { EditNote } from "./components/pages/EditNote";

import { MagicSystem } from "./types/magic-system";
import { AppRoute } from "./components/atoms/AppRoute";
import { getCurrentUser } from "./services/auth";
import { useQuery } from "@apollo/client";
import { GET_MAGIC_SYSTEM_QUERY } from "./graphql/queries/magic-system";

export const MagicSystemRouter = () => {
    let { path, url } = useRouteMatch();
    const currentUser = getCurrentUser();
    const splitUrl = url.split("/");
    const magicSystemId = splitUrl[splitUrl.length - 1];
    const { loading, error, data } = useQuery(GET_MAGIC_SYSTEM_QUERY, {
        variables: {
            ownerId: currentUser.id,
            magicSystemId: magicSystemId,
        },
        fetchPolicy: "network-only",
    });

    if (loading) {
        return <p>Loading</p>;
    } else if (error) {
        return <p>error</p>;
    } else {
        const magicSystem: MagicSystem = data.magicSystem;
        console.log("System in router", magicSystem);

        return (
            <EditMagicSystemWrapper system={magicSystem}>
                <Switch>
                    <AppRoute path={`${path}/page/edit`} exact>
                        <EditMagicSystemPage magicSystem={magicSystem} />
                    </AppRoute>
                    <AppRoute path={`${path}/outlines/new`} exact>
                        <CreateOutline magicSystem={magicSystem} />
                    </AppRoute>
                    <AppRoute path={`${path}/outlines/:outlineId/edit`} exact>
                        <EditOutline magicSystem={magicSystem} />
                    </AppRoute>
                    {/* <AppRoute path={`${path}/notes/new`} exact>
                        <CreateNote />
                    </AppRoute> */}
                    <AppRoute path={`${path}/notes/:noteId/edit`} exact>
                        <EditNote magicSystem={magicSystem} />
                    </AppRoute>
                </Switch>
            </EditMagicSystemWrapper>
        );
    }
};
