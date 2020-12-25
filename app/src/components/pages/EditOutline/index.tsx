import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { Form } from "../../molecules/Form";
import { EditMagicSystemWrapper } from "../../organisms/EditMagicSystemWrapper";
import { RichTextEditor } from "../../organisms/RichTextEditor";

import { EditOutlineFields } from "../../../types/form-types";
import { MagicSystem } from "../../../types/magic-system";

interface URLParameters {
    magicSystemId: string;
    outlineId: string;
}

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

    const { outlineId }: URLParameters = useParams();
    const outline = magicSystem.outlines.find((item) => item.id === outlineId)!;
    const [outlineContent, setOutlineContent] = useState<string>(outline.body);

    const editOutlineForm = useFormik({
        initialValues: {
            body: outlineContent,
        },
        onSubmit: (values: EditOutlineFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    function handleOutlineBodyChange(newContent: string) {
        setOutlineContent(newContent);
        editOutlineForm.values.body = newContent;
    }

    async function handleSubmit(
        body: EditOutlineFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(body, null, 2));
        setSubmitting(false);
    }

    return (
        <EditMagicSystemWrapper
            system={magicSystem}
            activeItem={"Source outline"} // change to the actual outline name later
            startOutlinesDropdownOpen
        >
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        {outline.name}
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        form="outline-body-form"
                        disabled={editOutlineForm.isSubmitting}
                        style={{ marginLeft: "auto" }}
                    >
                        Save
                    </Button>
                </Box>
                <Divider />
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                <Form
                    handleSubmit={editOutlineForm.handleSubmit}
                    id="outline-body-form"
                >
                    <RichTextEditor
                        content={outlineContent}
                        onEditorChange={handleOutlineBodyChange}
                    />
                </Form>
            </Grid>
        </EditMagicSystemWrapper>
    );
};
