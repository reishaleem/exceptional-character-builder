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
import { AuthRoute } from "./components/atoms/AuthRoute";
import { refreshAccessToken } from "./services/auth";
import { useEffect, useState } from "react";
import { AppRoute } from "./components/atoms/AppRoute";

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function refreshToken() {
            await refreshAccessToken();
            setLoading(false);
        }
        refreshToken();
    }, []);

    return loading ? (
        <p>loading...</p>
    ) : (
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
                <AuthRoute path="/register">
                    <Register />
                </AuthRoute>
                <AuthRoute path="/login">
                    <Login />
                </AuthRoute>

                <AppRoute path="/magic-systems" exact>
                    <UserMagicList />
                </AppRoute>
                <AppRoute path="/magic-systems/new" exact>
                    <CreateMagicSystem />
                </AppRoute>

                <AppRoute path="/magic-systems/:magicSystemId">
                    <MagicSystemRouter />
                </AppRoute>

                <AppRoute path="/explore" exact>
                    <ExploreList />
                </AppRoute>
                <AppRoute path="/explore/view/:magicSystemId" exact>
                    <ViewMagicSystem />
                </AppRoute>

                <AppRoute path="/settings/profile" exact>
                    <UserSettings value={0} />
                </AppRoute>
                <AppRoute path="/settings/security" exact>
                    <UserSettings value={1} />
                </AppRoute>
                <AppRoute path="/settings/delete" exact>
                    <UserSettings value={2} />
                </AppRoute>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
