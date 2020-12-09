import { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router-dom";

import OnePiece from "../../../images/onepieceworldbright.jpg";

import { UserMenu } from "./";

const storyDetails = {
    title: "Molecules/UserMenu",
    component: UserMenu,
    decorators: [
        (getStory: any) => (
            <MemoryRouter>
                <div style={{ width: "100%", display: "flex" }}>
                    <div style={{ marginLeft: "auto" }}>{getStory()}</div>
                </div>
            </MemoryRouter>
        ),
    ],
};
export default storyDetails;

const Template: Story<ComponentProps<typeof UserMenu>> = (args) => {
    return (
        <UserMenu {...args}>
            <p>Test</p>
        </UserMenu>
    );
};

export const withAvatarVariant = Template.bind({});
withAvatarVariant.args = {
    avatarImage: OnePiece,
    dropdownText: "Reis Haleem",
    buttonDropdownType: "avatar",
};

export const withButtonVariant = Template.bind({});
withButtonVariant.args = {
    dropdownText: "Reis Haleem",
    buttonDropdownType: "button",
};
