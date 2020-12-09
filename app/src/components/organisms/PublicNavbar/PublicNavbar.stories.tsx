import { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router-dom";

import { Navbar } from "./";

const storyDetails = {
    title: "Organisms/PublicNavbar",
    component: Navbar,
    decorators: [(getStory: any) => <MemoryRouter>{getStory()}</MemoryRouter>],
};
export default storyDetails;

const Template: Story<ComponentProps<typeof Navbar>> = (args) => {
    return <Navbar {...args} />;
};

export const withTransparentLoggedIn = Template.bind({});
withTransparentLoggedIn.args = {
    color: "transparent",
    dropdownMenuLabel: "Reis Haleem",
    userLoggedIn: true,
};

export const withTransparentLoggedOut = Template.bind({});
withTransparentLoggedOut.args = {
    color: "transparent",
    dropdownMenuLabel: "Reis Haleem",
    userLoggedIn: false,
};

export const withPrimaryColorLoggedIn = Template.bind({});
withPrimaryColorLoggedIn.args = {
    dropdownMenuLabel: "Reis Haleem",
    userLoggedIn: true,
};

export const withPrimaryColorLoggedOut = Template.bind({});
withPrimaryColorLoggedOut.args = {
    dropdownMenuLabel: "Reis Haleem",
    userLoggedIn: false,
};
