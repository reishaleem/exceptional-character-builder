import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Home } from "./components/pages/Home";

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
            </Switch>
        </BrowserRouter>
    );
}

export default App;
