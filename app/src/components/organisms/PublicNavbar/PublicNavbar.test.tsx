import { render, screen } from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import { Navbar } from "./";

describe("NavbarTitle", () => {
    it("renders transparent Navbar with user logged in", () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Navbar
                    color="transparent"
                    dropdownMenuLabel="Reis Haleem"
                    userLoggedIn={true}
                />{" "}
            </Router>
        );
        const navbarTitle = screen.getByRole("link");
        const registerButton = screen.getAllByRole("button")[0];
        const loginButton = screen.getAllByRole("button")[1];

        expect(navbarTitle).toBeInTheDocument();
        expect(navbarTitle).toHaveTextContent("The Exceptional Outliner");

        expect(registerButton).toBeInTheDocument();
        expect(registerButton).toHaveTextContent("Sign Up");

        expect(loginButton).toBeInTheDocument();
        expect(loginButton).toHaveTextContent("Login");
        screen.debug();
        expect(screen.getByRole("banner")).toHaveClass(
            "MuiAppBar-colorTransparent"
        );
    });
});
