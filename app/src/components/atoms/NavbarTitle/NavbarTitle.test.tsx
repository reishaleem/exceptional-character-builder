import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router";
import { createMemoryHistory } from "history";

import { NavbarTitle } from "./";

describe("NavbarTitle", () => {
    it("renders NavbarTitle component without a link", () => {
        render(<NavbarTitle text="Testing" />);

        expect(screen.getByRole("heading")).toBeInTheDocument();
        expect(screen.queryByRole("link")).toBeNull();
        expect(screen.getByRole("heading")).toHaveTextContent("Testing");
    });

    it("renders NavbarTitle component with a link to '/test'", () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <NavbarTitle link to="/" text="Testing" />
            </Router>
        );
        screen.debug();

        expect(screen.queryByRole("heading")).toBeNull();
        expect(screen.getByRole("link")).toBeInTheDocument();
        expect(screen.getByRole("link")).toHaveTextContent("Testing");

        //const leftClick = { button: 0 };
        //userEvent.click(screen.getByText(/Testing/i), leftClick);
        //screen.debug();
    });
});
