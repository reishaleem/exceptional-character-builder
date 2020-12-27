import {
    Box,
    Button,
    Checkbox,
    Chip,
    Divider,
    Grid,
    ListItemText,
    MenuItem,
    Slider,
    TextField,
    Theme,
    Tooltip,
    Typography,
    useTheme,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons/";
import { useFormik } from "formik";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import { Form } from "../../molecules/Form";
import { NoSidebarWrapper } from "../../organisms/NoSidebarWrapper";

import { magicSystemTypes } from "../../../constants/magic-system";
import {
    MagicSystemDetailsFields,
    MagicSystemDetailsFieldsErrors,
} from "../../../types/form-types";
import { useMutation } from "@apollo/client";
import { CREATE_MAGIC_SYSTEM_MUTATION } from "../../../graphql/mutations/magic-system";
import { getCurrentUser } from "../../../services/auth";

export const CreateMagicSystem = () => {
    const theme: Theme = useTheme();
    const [createMagicSystem] = useMutation(CREATE_MAGIC_SYSTEM_MUTATION);
    const currentUser = getCurrentUser();
    const history = useHistory();
    const { url } = useRouteMatch();

    const createMagicSystemForm = useFormik({
        initialValues: {
            name: "",
            type: [],
            hardnessRating: 5,
            description: "",
        },
        validate: (values: MagicSystemDetailsFields) => {
            const errors: Partial<MagicSystemDetailsFieldsErrors> = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (values.type.length === 0) {
                errors.type = "Required";
            }

            if (!values.hardnessRating) {
                errors.hardnessRating = "Required";
            }

            return errors;
        },
        onSubmit: (values: MagicSystemDetailsFields, { setSubmitting }) => {
            handleSubmit(values, setSubmitting);
        },
    });

    async function handleSubmit(
        magicSystem: MagicSystemDetailsFields,
        setSubmitting: (isSubmitting: boolean) => void
    ) {
        const response = await createMagicSystem({
            variables: {
                ownerId: currentUser.id,
                name: magicSystem.name,
                type: magicSystem.type,
                hardnessRating: magicSystem.hardnessRating,
                description: magicSystem.description,
            },
        });
        if (response && response.data) {
            history.push(
                `/magic-systems/${response.data.createMagicSystem.id}/page/edit`
            );
        } else {
            setSubmitting(false);
        }
    }

    return (
        <>
            <NoSidebarWrapper>
                <Grid item xs={12} sm={12} md={10}>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h3" component="h1">
                            Create Magic System
                        </Typography>
                    </Box>
                    <Divider />
                </Grid>

                <Grid item xs={12} sm={12} md={10}>
                    <Form handleSubmit={createMagicSystemForm.handleSubmit}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={3}>
                                The thumbnail will go here. Don't know if this
                                messes with the flow of the form though. Will
                                see once the actual image uploader is in
                            </Grid>
                            <Grid container item xs={12} sm={12} md={9}>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Name"
                                        placeholder="E.g. Nen, Magic, Allomancy"
                                        type="text"
                                        value={
                                            createMagicSystemForm.values.name
                                        }
                                        onChange={
                                            createMagicSystemForm.handleChange
                                        }
                                        error={
                                            createMagicSystemForm.touched
                                                .name &&
                                            Boolean(
                                                createMagicSystemForm.errors
                                                    .name
                                            )
                                        }
                                        helperText={
                                            createMagicSystemForm.touched
                                                .name &&
                                            createMagicSystemForm.errors.name
                                        }
                                        disabled={
                                            createMagicSystemForm.isSubmitting
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={7}
                                    style={{ paddingRight: theme.spacing(1) }}
                                >
                                    <TextField
                                        id="type"
                                        name="type"
                                        label="Type(s)"
                                        error={
                                            createMagicSystemForm.touched
                                                .type &&
                                            Boolean(
                                                createMagicSystemForm.errors
                                                    .type
                                            )
                                        }
                                        helperText={
                                            createMagicSystemForm.touched
                                                .type &&
                                            createMagicSystemForm.errors.type
                                        }
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        disabled={
                                            createMagicSystemForm.isSubmitting
                                        }
                                        select
                                        SelectProps={{
                                            multiple: true,
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
                                                if (
                                                    (selected as string[])
                                                        .length === 0
                                                ) {
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
                                                } else if (
                                                    (selected as string[])
                                                        .length > 3
                                                ) {
                                                    return (
                                                        <>
                                                            <Box
                                                                display="flex"
                                                                flexWrap="wrap"
                                                                alignItems="center"
                                                            >
                                                                {(selected as string[])
                                                                    .slice(0, 3)
                                                                    .map(
                                                                        (
                                                                            value
                                                                        ) => (
                                                                            <Chip
                                                                                key={
                                                                                    value
                                                                                }
                                                                                label={
                                                                                    value
                                                                                }
                                                                                style={{
                                                                                    marginRight: 2,
                                                                                }}
                                                                                size="small"
                                                                            />
                                                                        )
                                                                    )}

                                                                <Typography
                                                                    variant="body1"
                                                                    component="p"
                                                                    style={{
                                                                        marginLeft:
                                                                            "5px",
                                                                    }}
                                                                    display="inline"
                                                                >
                                                                    +
                                                                    {(selected as string[])
                                                                        .length -
                                                                        3}{" "}
                                                                </Typography>
                                                            </Box>
                                                        </>
                                                    );
                                                }

                                                return (
                                                    <Box
                                                        display="flex"
                                                        flexWrap="wrap"
                                                    >
                                                        {(selected as string[]).map(
                                                            (value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        value
                                                                    }
                                                                    style={{
                                                                        marginRight: 2,
                                                                    }}
                                                                    size="small"
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                );
                                            },
                                            displayEmpty: true,
                                        }}
                                        value={
                                            createMagicSystemForm.values.type
                                        }
                                        onChange={
                                            createMagicSystemForm.handleChange
                                        }
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    >
                                        {magicSystemTypes.map(
                                            (type: string) => {
                                                return (
                                                    <MenuItem
                                                        value={type}
                                                        key={type}
                                                    >
                                                        <Checkbox
                                                            checked={
                                                                createMagicSystemForm.values.type.indexOf(
                                                                    type
                                                                ) > -1
                                                            }
                                                        />
                                                        <ListItemText
                                                            primary={type}
                                                        />
                                                    </MenuItem>
                                                );
                                            }
                                        )}
                                    </TextField>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    sm={12}
                                    md={5}
                                    style={{ paddingLeft: theme.spacing(1) }}
                                >
                                    <Box display="flex" alignItems="center">
                                        <Typography
                                            variant="caption"
                                            component="span"
                                            style={{
                                                color: "gray",
                                            }}
                                        >
                                            Hardness
                                        </Typography>
                                        <Tooltip
                                            title="Hardness refers to how specific a user of this magic's power would be. In Harry Potter, any single Wizard can do nearly anything, and you can never know what they can do until they do it, so it is very soft (1). With Allomancy, the powers are very well laid out, and to know what the user can do, you just need to know their category (10). Note that being a larger Magic System does not imply softness; Devil Fruits have an enormous record of potential abilities, but they only give the user one ability, and those abilities tend to be very hard."
                                            placement="right"
                                            arrow
                                        >
                                            <HelpOutline
                                                fontSize="small"
                                                style={{
                                                    color: "gray",

                                                    marginLeft: "auto",
                                                }}
                                            />
                                        </Tooltip>
                                    </Box>
                                    <Slider
                                        value={
                                            createMagicSystemForm.values
                                                .hardnessRating
                                        }
                                        onChange={(e, v) =>
                                            createMagicSystemForm.setFieldValue(
                                                "hardnessRating",
                                                v
                                            )
                                        }
                                        valueLabelDisplay="auto"
                                        step={1}
                                        marks
                                        min={1}
                                        max={10}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <TextField
                                        id="description"
                                        name="description"
                                        label="Description (Optional)"
                                        placeholder="Give a couple of sentences that capture the fantastic (or not so fantastic) nature of your Magic System"
                                        type="text"
                                        value={
                                            createMagicSystemForm.values
                                                .description
                                        }
                                        onChange={
                                            createMagicSystemForm.handleChange
                                        }
                                        error={
                                            createMagicSystemForm.touched
                                                .description &&
                                            Boolean(
                                                createMagicSystemForm.errors
                                                    .description
                                            )
                                        }
                                        helperText={
                                            createMagicSystemForm.touched
                                                .description &&
                                            createMagicSystemForm.errors
                                                .description
                                        }
                                        disabled={
                                            createMagicSystemForm.isSubmitting
                                        }
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        size="small"
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={12} md={12}>
                                    <Box display="flex">
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            disableElevation
                                            disabled={
                                                createMagicSystemForm.isSubmitting
                                            }
                                            style={{
                                                marginRight: theme.spacing(1),
                                                marginLeft: "auto",
                                            }}
                                            component={Link}
                                            to="/magic-systems"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            disableElevation
                                            disabled={
                                                createMagicSystemForm.isSubmitting
                                            }
                                        >
                                            Create
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                </Grid>
            </NoSidebarWrapper>
        </>
    );
};
