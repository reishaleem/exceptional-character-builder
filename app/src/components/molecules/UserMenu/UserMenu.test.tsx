import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MenuItem } from "@material-ui/core";

import { UserMenu } from "./";

describe("NavbarTitle", () => {
    it("renders UserMenu component with a button dropdown", () => {
        render(
            <UserMenu buttonDropdownType="button" dropdownText="Testing">
                <MenuItem>Test</MenuItem>
            </UserMenu>
        );
        screen.debug();

        const dropdownButton = screen.getByRole("button");
        expect(dropdownButton).toBeInTheDocument();
        userEvent.click(dropdownButton);
        screen.debug();
        screen.getByRole("menu");
        // expect(screen.queryByRole("link")).toBeNull();
        // expect(screen.getByRole("heading")).toHaveTextContent("Testing");
    });
});
