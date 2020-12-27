import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import { useFormik } from "formik";
import { useState } from "react";

import { Form } from "../../molecules/Form";
import { RichTextEditor } from "../../organisms/RichTextEditor";

import { MagicSystem } from "../../../types/magic-system";
import { EditPageFields } from "../../../types/form-types";
import { useMutation } from "@apollo/client";
import { UPDATE_MAGIC_SYSTEM_PAGE_MUTATION } from "../../../graphql/mutations/magic-system";
import { getCurrentUser } from "../../../services/auth";
import { GET_MAGIC_SYSTEM_QUERY } from "../../../graphql/queries/magic-system";

interface Props {
    magicSystem: MagicSystem;
}
export const EditMagicSystemPage = ({ magicSystem }: Props) => {
    const [pageContent, setPageContent] = useState<string>(magicSystem.page);
    const [updateMagicSystemPage] = useMutation(
        UPDATE_MAGIC_SYSTEM_PAGE_MUTATION
    );
    const currentUser = getCurrentUser();
    console.log(magicSystem.page);

    const editMagicSystemPageForm = useFormik({
        initialValues: {
            body: pageContent,
        },
        onSubmit: (values: EditPageFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    function handlePageBodyChange(newContent: string) {
        setPageContent(newContent);
        editMagicSystemPageForm.values.body = newContent;
    }

    async function handleSubmit(
        page: EditPageFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await updateMagicSystemPage({
            variables: {
                ownerId: currentUser.id,
                magicSystemId: magicSystem.id,
                page: page.body,
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
            setPageContent(response.data.updateMagicSystemPage.page);
        }
        setSubmitting(false);
    }

    return (
        <>
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
        </>
    );
};
