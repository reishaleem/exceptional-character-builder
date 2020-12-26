import {
    Box,
    Button,
    Divider,
    Grid,
    TextField,
    Theme,
    Typography,
    useTheme,
} from "@material-ui/core";

import { Form } from "../../molecules/Form";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

interface FormFields {
    name: string;
}

export const CreateNote = () => {
    const theme: Theme = useTheme();

    const createNoteForm = useFormik({
        initialValues: {
            name: "",
        },
        validate: (values: FormFields) => {
            const errors: Partial<FormFields> = {};

            if (!values.name) {
                errors.name = "Required";
            }

            return errors;
        },
        onSubmit: (values: FormFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        outline: FormFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(outline, null, 2));
        // direct to new note
        setSubmitting(false);
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        New Note
                    </Typography>
                </Box>
                <Divider />
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
                <Form handleSubmit={createNoteForm.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        placeholder="E.g. Character idea, Endgame"
                        type="text"
                        value={createNoteForm.values.name}
                        onChange={createNoteForm.handleChange}
                        error={
                            createNoteForm.touched.name &&
                            Boolean(createNoteForm.errors.name)
                        }
                        helperText={
                            createNoteForm.touched.name &&
                            createNoteForm.errors.name
                        }
                        disabled={createNoteForm.isSubmitting}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                    />

                    <Box display="flex">
                        <Button
                            color="primary"
                            variant="contained"
                            disableElevation
                            disabled={createNoteForm.isSubmitting}
                            style={{
                                marginRight: theme.spacing(1),
                                marginLeft: "auto",
                            }}
                            component={Link}
                            to="/magic-systems/1/page/edit"
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            type="submit"
                            disableElevation
                            disabled={createNoteForm.isSubmitting}
                        >
                            Create
                        </Button>
                    </Box>
                </Form>
            </Grid>
        </>
    );
};
