import { useMutation } from "@apollo/client";
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
    Theme,
} from "@material-ui/core";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";

import { Form } from "../../molecules/Form";

import { outlineTypes } from "../../../constants/magic-system";
import { CreateOutlineFields } from "../../../types/form-types";
import { MagicSystem } from "../../../types/magic-system";
import { CREATE_OUTLINE_MUTATION } from "../../../graphql/mutations/magic-system";
import { GET_MAGIC_SYSTEM_QUERY } from "../../../graphql/queries/magic-system";
import { getCurrentUser } from "../../../services/auth";

interface Props {
    magicSystem: MagicSystem;
}

export const CreateOutline = ({ magicSystem }: Props) => {
    const theme: Theme = useTheme();
    const history = useHistory();
    const currentUser = getCurrentUser();
    const [createOutline] = useMutation(CREATE_OUTLINE_MUTATION);

    const createMagicSystemForm = useFormik({
        initialValues: {
            name: "",
            type: "",
        },
        validate: (values: CreateOutlineFields) => {
            const errors: Partial<CreateOutlineFields> = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (!values.type) {
                errors.type = "Required";
            }

            return errors;
        },
        onSubmit: (values: CreateOutlineFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        outline: CreateOutlineFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await createOutline({
            variables: {
                ownerId: currentUser.id,
                magicSystemId: magicSystem.id,
                name: outline.name,
                type: outline.type,
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
            history.push(
                `/magic-systems/${magicSystem.id}/outlines/${response.data.createOutline.id}/edit`
            );
        } else {
            setSubmitting(false);
        }
    }

    return (
        <>
            <Grid item xs={12} sm={12} md={10}>
                <Box display="flex" alignItems="center">
                    <Typography variant="h3" component="h1">
                        New Outline
                    </Typography>
                </Box>
                <Divider />
            </Grid>

            <Grid item xs={12} sm={12} md={10}>
                <Form handleSubmit={createMagicSystemForm.handleSubmit}>
                    <TextField
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
                        InputLabelProps={{ shrink: true }}
                        disabled={createMagicSystemForm.isSubmitting}
                        fullWidth
                        size="small"
                        variant="outlined"
                    />

                    <TextField
                        id="type"
                        name="type"
                        label="Type"
                        value={createMagicSystemForm.values.type}
                        onChange={createMagicSystemForm.handleChange}
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
                        fullWidth
                        size="small"
                        variant="outlined"
                    >
                        {outlineTypes.map((type: string) => {
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
        </>
    );
};
