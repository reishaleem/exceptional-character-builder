import { useMutation } from "@apollo/client";
import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Form } from "../../molecules/Form";
import { Notification } from "../../molecules/Notification";
import { RichTextEditor } from "../../organisms/RichTextEditor";

import { EditOutlineFields } from "../../../types/form-types";
import { MagicSystem } from "../../../types/magic-system";
import { getCurrentUser } from "../../../services/auth";
import { UPDATE_OUTLINE_MUTATION } from "../../../graphql/mutations/magic-system";
import { GET_MAGIC_SYSTEM_QUERY } from "../../../graphql/queries/magic-system";

interface URLParameters {
    magicSystemId: string;
    outlineId: string;
}

interface Props {
    magicSystem: MagicSystem;
}

export const EditOutline = ({ magicSystem }: Props) => {
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const { outlineId }: URLParameters = useParams();
    const outline = magicSystem.outlines.find((item) => item.id === outlineId)!;
    const [outlineContent, setOutlineContent] = useState<string>("");
    const currentUser = getCurrentUser();
    const [updateOutline] = useMutation(UPDATE_OUTLINE_MUTATION, {
        onError: () => {
            setOpenError(true);
        },
    });
    console.log(outline);
    useEffect(() => {
        setOutlineContent(outline?.body);
    }, [outline]);

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
        values: EditOutlineFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await updateOutline({
            variables: {
                ownerId: currentUser.id,
                magicSystemId: magicSystem.id,
                outlineId: outlineId,
                name: outline.name,
                body: values.body,
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
            setOutlineContent(response.data.updateOutline.body);
            setOpenSuccess(true);
        }
        setSubmitting(false);
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        {outline?.name}
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
