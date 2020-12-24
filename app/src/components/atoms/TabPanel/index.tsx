import { ReactNode } from "react";

interface Props {
    value: number;
    index: number;
    children: ReactNode;
}

export const TabPanel = ({ value, index, children, ...other }: Props) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
};
