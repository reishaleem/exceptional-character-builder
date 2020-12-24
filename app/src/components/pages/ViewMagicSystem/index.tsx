import { Grid } from "@material-ui/core";
import { MagicSystem } from "../../../types/magic-system";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

export const ViewMagicSystem = () => {
    const magicSystem: MagicSystem = {
        id: "1",
        name: "Nen",
        description: "A magic system from Hunter x Hunter",
        page: "<h1>Nen</h1>",
        notes: [
            {
                id: "1",
                name: "Test note",
                body: "This is just a test note",
            },
        ],
        outlines: [
            {
                id: "1",
                name: "Source outline",
                body:
                    "This is the body of the outline about the source of magic",
            },
        ],
        updatedAt: "1608587625018",
    };
    return (
        <NoSidebarWrapper>
            <Grid
                item
                xs={12}
                sm={12}
                md={8}
                style={{ backgroundColor: "white" }}
            >
                <div dangerouslySetInnerHTML={{ __html: magicSystem.page }} />
            </Grid>
        </NoSidebarWrapper>
    );
};
