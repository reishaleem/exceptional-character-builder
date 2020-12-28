import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    createHttpLink,
    from,
    InMemoryCache,
} from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { decode } from "jsonwebtoken";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import { getAccessToken, setAccessToken } from "./services/auth";

const httpLink = createHttpLink({
    uri: "/graphql",
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = getAccessToken();
    // add the authorization to the headers
    operation.setContext({
        headers: {
            authorization: token ? `bearer ${token}` : "",
        },
    });

    return forward(operation);
});

const tokenRefreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
        const token = getAccessToken();
        if (!token) return true;

        try {
            const { exp }: any = decode(token);
            return Date.now() < exp * 1000;
        } catch (error) {
            return false;
        }
    },
    fetchAccessToken: () => {
        return fetch(process.env.REACT_APP_BACKEND_URI + "/refresh-token", {
            method: "POST",
            credentials: "include",
        });
    },
    handleFetch: (accessToken) => {
        setAccessToken(accessToken);
    },
    handleError: (err) => {
        // full control over handling token fetch Error
        console.warn("Your refresh token is invalid. Try to relogin");
        console.error(err);
    },
});

const client = new ApolloClient({
    link: from([tokenRefreshLink, authMiddleware, httpLink]),
    cache: new InMemoryCache(),
    credentials: "include",
});

ReactDOM.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
