import { isLoggedIn } from "../../../services/auth";
import { Redirect, Route } from "react-router-dom";

interface Props {
    path: string;
    exact?: boolean;
    children: React.ReactNode;
}

export const AppRoute = ({ path, children, ...rest }: Props) => {
    const userIsLoggedIn = isLoggedIn();

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
