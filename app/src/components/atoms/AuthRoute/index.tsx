import { Redirect, Route } from "react-router-dom";

import { isLoggedIn } from "../../../services/auth";

interface Props {
    path: string;
    children: React.ReactNode;
}

export const AuthRoute = ({ path, children, ...rest }: Props) => {
    const userIsLoggedIn: boolean = isLoggedIn();

    return (
        <Route
            path={path}
            {...rest}
            exact
            render={({ location }) =>
                !userIsLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/magic-systems",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
};
