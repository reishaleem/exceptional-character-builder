import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MagicSystem } from "../../../types/magic-system";
import { Form } from "../../molecules/Form";
import { EditMagicSystemWrapper } from "../../organisms/EditMagicSystemWrapper";
import { RichTextEditor } from "../../organisms/RichTextEditor";

interface Params {
    magicSystemId: string;
    noteId: string;
}

interface FormFields {
    body: string;
}

export const EditNote = () => {
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

    const { noteId }: Params = useParams();
    const note = magicSystem.notes.find((item) => item.id === noteId)!;
    const [noteContent, setNoteContent] = useState(note.body);

    const editNoteForm = useFormik({
        initialValues: {
            body: noteContent,
        },
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    function handleNoteBodyChange(newContent: string) {
        setNoteContent(newContent);
        editNoteForm.values.body = newContent;
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
        <EditMagicSystemWrapper
            system={magicSystem}
            activeItem={note.name}
            startNotesDropdownOpen
        >
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        {note.name}
                    </Typography>
                    <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        form="outline-body-form"
                        disabled={editNoteForm.isSubmitting}
                        style={{ marginLeft: "auto" }}
                    >
                        Save
                    </Button>
                </Box>
                <Divider />
            </Grid>
            <Grid item xs={12} sm={12} md={10}>
                <Form
                    handleSubmit={editNoteForm.handleSubmit}
                    id="outline-body-form"
                >
                    <RichTextEditor
                        content={noteContent}
                        onEditorChange={handleNoteBodyChange}
                    />
                </Form>
            </Grid>
        </EditMagicSystemWrapper>
    );
};
