import { ComponentProps } from "react";
import { Story } from "@storybook/react/types-6-0";
import { MemoryRouter } from "react-router-dom";

import { Home } from "./";

const storyDetails = {
    title: "Pages/Home",
    component: Home,
    decorators: [(getStory: any) => <MemoryRouter>{getStory()}</MemoryRouter>],
};
export default storyDetails;

const Template: Story<ComponentProps<typeof Home>> = (args) => {
    return <Home {...args} />;
};

export const withSunsetBackground = Template.bind({});
withSunsetBackground.args = {
    backgroundColor: "linear-gradient(to right, #feb47b, #ff7e5f)",
};

export const withSpectrumBackground = Template.bind({});
withSpectrumBackground.args = {
    backgroundColor:
        "radial-gradient(at 50% 100%, rgba(123, 22, 255, 0.75), rgb(15, 1, 94)",
};

export const withFlareBackground = Template.bind({});
withFlareBackground.args = {
    backgroundColor: "linear-gradient(to right, #f12711, #f5af19)",
};
