import { Route, Switch, useRouteMatch } from "react-router-dom";
import { EditMagicSystemWrapper } from "./components/organisms/EditMagicSystemWrapper";

import { EditMagicSystemPage } from "./components/pages/EditMagicSystemPage";
import { CreateOutline } from "./components/pages/CreateOutline";
import { EditOutline } from "./components/pages/EditOutline";
import { CreateNote } from "./components/pages/CreateNote";
import { EditNote } from "./components/pages/EditNote";

import { MagicSystem } from "./types/magic-system";

export const MagicSystemRouter = () => {
    let { path } = useRouteMatch();

    const magicSystem: MagicSystem = {
        id: "1",
        name: "Nen",
        description: "A magic system from Hunter x Hunter",
        page: "<h1>Nen</h1>",
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
        updatedAt: "1608587625018",
    };
    return (
        <EditMagicSystemWrapper system={magicSystem}>
            <Switch>
                <Route
                    path={`${path}/page/edit`}
                    component={EditMagicSystemPage}
                    exact
                />
                <Route
                    path={`${path}/outlines/new`}
                    component={CreateOutline}
                    exact
                />
                <Route
                    path={`${path}/outlines/:outlineId/edit`}
                    component={EditOutline}
                    exact
                />
                <Route
                    path={`${path}/notes/new`}
                    component={CreateNote}
                    exact
                />
                <Route
                    path={`${path}/notes/:noteId/edit`}
                    component={EditNote}
                    exact
                />
            </Switch>
        </EditMagicSystemWrapper>
    );
};
