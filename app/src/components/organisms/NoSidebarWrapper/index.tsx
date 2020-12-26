import { Box, Grid, Theme, useTheme } from "@material-ui/core";
import { ReactNode } from "react";
import { AppNavbar } from "../AppNavbar";

interface Props {
    children: ReactNode;
}

export const NoSidebarWrapper = ({ children }: Props) => {
    const theme: Theme = useTheme();

    return (
        <>
            <AppNavbar />

            <Box padding={theme.spacing(0.5)}>
                <Grid container justify="center" spacing={2}>
                    {children}
                </Grid>
            </Box>
        </>
    );
};
