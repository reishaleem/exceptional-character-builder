import { Box, Grid, useTheme } from "@material-ui/core";
import { ReactNode } from "react";
import { AppNavbar } from "../AppNavbar";

interface Props {
    children: ReactNode;
}

export const NoSidebarWrapper = ({ children }: Props) => {
    const theme = useTheme();

    return (
        <>
            <AppNavbar />

            <Box flexGrow={1} padding={theme.spacing(0.5)}>
                <Grid container justify="center" spacing={2}>
                    {children}
                </Grid>
            </Box>
        </>
    );
};
