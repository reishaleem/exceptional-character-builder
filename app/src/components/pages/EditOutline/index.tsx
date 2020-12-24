import { MagicSystem } from "../../../types/magic-system";
import { EditMagicSystemWrapper } from "../../organisms/EditMagicSystemWrapper";

export const EditOutline = () => {
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
        <EditMagicSystemWrapper
            system={magicSystem}
            activeItem={"Source outline"} // change to the actual outline name later
            startOutlinesDropdownOpen
        >
            Hi
        </EditMagicSystemWrapper>
    );
};
