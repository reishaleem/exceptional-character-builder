import { useMutation } from "@apollo/client";
import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Form } from "../../molecules/Form";
import { Notification } from "../../molecules/Notification";
import { RichTextEditor } from "../../organisms/RichTextEditor";

import { EditNoteFields } from "../../../types/form-types";
import { MagicSystem } from "../../../types/magic-system";
import { getCurrentUser } from "../../../services/auth";
import { UPDATE_NOTE_MUTATION } from "../../../graphql/mutations/magic-system";
import { GET_MAGIC_SYSTEM_QUERY } from "../../../graphql/queries/magic-system";

interface URLParameters {
    magicSystemId: string;
    noteId: string;
}

interface Props {
    magicSystem: MagicSystem;
}

export const EditNote = ({ magicSystem }: Props) => {
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const { noteId }: URLParameters = useParams();
    const note = magicSystem.notes.find((item) => item.id === noteId)!;
    console.log(magicSystem.notes);
    const [noteContent, setNoteContent] = useState<string>("");
    const currentUser = getCurrentUser();
    const [updateNote] = useMutation(UPDATE_NOTE_MUTATION, {
        onError: () => {
            setOpenError(true);
        },
    });

    useEffect(() => {
        setNoteContent(note?.body);
    }, [note]);

    const editNoteForm = useFormik({
        initialValues: {
            body: noteContent,
        },
        onSubmit: (values: EditNoteFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    function handleNoteBodyChange(newContent: string) {
        setNoteContent(newContent);
        editNoteForm.values.body = newContent;
    }

    async function handleSubmit(
        note: EditNoteFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await updateNote({
            variables: {
                ownerId: currentUser.id,
                magicSystemId: magicSystem.id,
                noteId: noteId,
                name: "Note", // need to add a new text field to allow name editing
                body: note.body,
            },
            refetchQueries: [
                {
                    query: GET_MAGIC_SYSTEM_QUERY,
                    variables: {
                        ownerId: currentUser.id,
                        magicSystemId: magicSystem.id,
                    },
                },
            ],
            awaitRefetchQueries: true,
        });
        if (response && response.data) {
            setNoteContent(response.data.updateNote.body);
            setOpenSuccess(true);
        }
        setSubmitting(false);
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        {note?.name}
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
            <Notification
                message="Changes saved"
                severity="success"
                open={openSuccess}
                setOpen={setOpenSuccess}
            />
            <Notification
                message="An error occurred. Please try again."
                severity="error"
                open={openError}
                setOpen={setOpenError}
            />
        </>
    );
};
