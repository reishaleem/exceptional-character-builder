import { useMutation } from "@apollo/client";
import Box from "@material-ui/core/Box";
import { useHistory } from "react-router-dom";
import { LOGOUT_MUTATION } from "../../../graphql/mutations/auth";
import { setAccessToken } from "../../../services/auth";

interface Props {
    refreshOnClick?: boolean;
    children: React.ReactNode;
}

export const Logout = ({ refreshOnClick, children }: Props) => {
    const [logout, { client }] = useMutation(LOGOUT_MUTATION);
    const history = useHistory();

    async function logoutUser() {
        await client.resetStore();
        await logout();
        setAccessToken("");
        // The refreshOnClick case is solely for if the user logs out from the home screen, because the app will
        // not re-render, which specifically means the Navbar won't update and will still show the logged in version
        // Issue here: https://github.com/reishaleem/exceptional-outliner/issues/3
        if (refreshOnClick) {
            window.location.reload();
        } else {
            history.push("/");
        }
    }

    return <Box onClick={logoutUser}>{children}</Box>;
};
