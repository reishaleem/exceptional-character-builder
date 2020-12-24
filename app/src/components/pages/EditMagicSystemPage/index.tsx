import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";

import { Form } from "../../molecules/Form";
import { EditMagicSystemWrapper } from "../../organisms/EditMagicSystemWrapper";
import { RichTextEditor } from "../../organisms/RichTextEditor";

import { MagicSystem } from "../../../types/magic-system";

interface FormFields {
    body: string;
}

export const EditMagicSystemPage = () => {
    const magicSystem: MagicSystem = {
        id: "1",
        name: "Nen",
        description: "A magic system from Hunter x Hunter",
        page: "<h1>Nen</h1>",
        notes: [
            {
                id: "1",
                title: "Test note",
                body: "This is just a test note",
            },
        ],
        outlines: [
            {
                id: "1",
                title: "Source outline",
                body:
                    "This is the body of the outline about the source of magic",
            },
        ],
        updatedAt: "1608587625018",
    };
    const [pageContent, setPageContent] = useState(magicSystem.page);

    const editMagicSystemPageForm = useFormik({
        initialValues: {
            body: pageContent,
        },
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    function handlePageBodyChange(newContent: string) {
        setPageContent(newContent);
        editMagicSystemPageForm.values.body = newContent;
    }

    async function handleSubmit(
        body: FormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(body, null, 2));
        setSubmitting(false);
    }

    return (
        <EditMagicSystemWrapper system={magicSystem}>
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        {magicSystem.name}
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        form="page-body-form"
                        disabled={editMagicSystemPageForm.isSubmitting}
                        style={{ marginLeft: "auto" }}
                    >
                        Save
                    </Button>
                </Box>
                <Divider />
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
                <Form
                    handleSubmit={editMagicSystemPageForm.handleSubmit}
                    id="page-body-form"
                >
                    <RichTextEditor
                        content={pageContent}
                        onEditorChange={handlePageBodyChange}
                    />
                </Form>
            </Grid>
        </EditMagicSystemWrapper>
    );
};
