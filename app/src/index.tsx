import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    from,
    InMemoryCache,
} from "@apollo/client";

const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
});

const client = new ApolloClient({
    link: from([httpLink]),
    cache: new InMemoryCache(),
    //credentials: "include",
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
