import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    ListItemText,
    TextField,
    Typography,
    useTheme,
} from "@material-ui/core";
import { EditMagicSystemWrapper } from "../../organisms/EditMagicSystemWrapper";

import { Form } from "../../molecules/Form";
import { MagicSystem } from "../../../types/magic-system";
import { useFormik } from "formik";
import { outlineTypes } from "../../../constants/magic-system";
import { Link } from "react-router-dom";

interface FormFields {
    name: string;
    type: string;
}

export const CreateOutline = () => {
    const theme = useTheme();
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

    const createMagicSystemForm = useFormik({
        initialValues: {
            name: "",
            type: "",
        },
        validate: (values: FormFields) => {
            const errors: Partial<FormFields> = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (!values.type) {
                errors.type = "Required";
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
        // direct to new outline
        setSubmitting(false);
    }

    return (
        <EditMagicSystemWrapper
            system={magicSystem}
            activeItem="New Outline"
            startOutlinesDropdownOpen
        >
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h2" display="inline">
                        New Outline
                    </Typography>
                </Box>
                <Divider />
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
                <Form handleSubmit={createMagicSystemForm.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        placeholder="E.g. History, Limitations"
                        type="text"
                        value={createMagicSystemForm.values.name}
                        onChange={createMagicSystemForm.handleChange}
                        error={
                            createMagicSystemForm.touched.name &&
                            Boolean(createMagicSystemForm.errors.name)
                        }
                        helperText={
                            createMagicSystemForm.touched.name &&
                            createMagicSystemForm.errors.name
                        }
                        disabled={createMagicSystemForm.isSubmitting}
                        InputLabelProps={{ shrink: true }}
                        size="small"
                        variant="outlined"
                    />

                    <TextField
                        id="type"
                        name="type"
                        label="Type"
                        error={
                            createMagicSystemForm.touched.type &&
                            Boolean(createMagicSystemForm.errors.type)
                        }
                        helperText={
                            createMagicSystemForm.touched.type &&
                            createMagicSystemForm.errors.type
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={createMagicSystemForm.isSubmitting}
                        fullWidth
                        select
                        SelectProps={{
                            MenuProps: {
                                anchorOrigin: {
                                    vertical: "bottom",
                                    horizontal: "center",
                                },
                                transformOrigin: {
                                    vertical: "top",
                                    horizontal: "center",
                                },
                                getContentAnchorEl: null,
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5 + 9,
                                    },
                                },
                            },
                            renderValue: (selected) => {
                                if ((selected as string[]).length === 0) {
                                    return (
                                        <Typography
                                            variant="body1"
                                            component="p"
                                            style={{
                                                color: "grey",
                                            }}
                                        >
                                            Select a type
                                        </Typography>
                                    );
                                } else {
                                    return selected as string;
                                }
                            },
                            displayEmpty: true,
                        }}
                        value={createMagicSystemForm.values.type}
                        onChange={createMagicSystemForm.handleChange}
                        size="small"
                        variant="outlined"
                    >
                        {outlineTypes.map((type) => {
                            return (
                                <MenuItem value={type} key={type}>
                                    <ListItemText primary={type} />
                                </MenuItem>
                            );
                        })}
                    </TextField>
                    <Box display="flex">
                        <Button
                            color="primary"
                            variant="contained"
                            disableElevation
                            disabled={createMagicSystemForm.isSubmitting}
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
                            disabled={createMagicSystemForm.isSubmitting}
                        >
                            Create
                        </Button>
                    </Box>
                </Form>
            </Grid>
        </EditMagicSystemWrapper>
    );
};
