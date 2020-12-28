import { Redirect, Route } from "react-router-dom";

import { isLoggedIn } from "../../../services/auth";

interface Props {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const AppRoute = ({ path, children, ...rest }: Props) => {
    const userIsLoggedIn: boolean = isLoggedIn();

    return (
        <Route
            path={path}
            render={({ location }) =>
                userIsLoggedIn ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
            {...rest}
        />
    );
};
