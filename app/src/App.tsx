import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./components/pages/Home";
import { Register } from "./components/pages/Register";
import { Login } from "./components/pages/Login";
import { UserMagicList } from "./components/pages/UserMagicList";
import { CreateMagicSystem } from "./components/pages/CreateMagicSystem";
import { ExploreList } from "./components/pages/ExploreList";
import { ViewMagicSystem } from "./components/pages/ViewMagicSystem";
import { UserSettings } from "./components/pages/UserSettings";
import { MagicSystemRouter } from "./MagicSystemRouter";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/"
                    render={(routeProps) => (
                        <Home
                            backgroundColor="linear-gradient(to right, #f12711, #f5af19)"
                            {...routeProps}
                        />
                    )}
                    exact
                />
                <Route path="/register" component={Register} exact />
                <Route path="/login" component={Login} exact />

                <Route path="/magic-systems" component={UserMagicList} exact />
                <Route
                    path="/magic-systems/new"
                    component={CreateMagicSystem}
                    exact
                />
                <Route path="/magic-systems/:magicSystemId">
                    <MagicSystemRouter />
                </Route>

                <Route path="/explore" component={ExploreList} exact />
                <Route
                    path="/explore/view/:magicSystemId"
                    component={ViewMagicSystem}
                    exact
                />

                <Route path="/settings/profile" exact>
                    <UserSettings value={0} />
                </Route>
                <Route path="/settings/security" exact>
                    <UserSettings value={1} />
                </Route>
                <Route path="/settings/delete" exact>
                    <UserSettings value={2} />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
