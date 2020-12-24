import {
    Avatar,
    Box,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    useTheme,
} from "@material-ui/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

import { MagicSystem } from "../../../types/magic-system";

dayjs.extend(relativeTime);

interface Props {
    system: MagicSystem;
    linkDestination: string;
}

export const MagicSystemListItem = ({ system, linkDestination }: Props) => {
    const theme = useTheme();

    function getTimeSinceUpdatedMessage(lastUpdatedDate: dayjs.Dayjs) {
        let differenceInMonths = dayjs().diff(lastUpdatedDate, "month");

        if (differenceInMonths > 0) {
            return `Updated ${dayjs(lastUpdatedDate).format("MMM D")}`;
        } else {
            return `Updated ${dayjs(lastUpdatedDate).fromNow()}`;
        }
    }

    return (
        <ListItem
            alignItems="flex-start"
            button
            component={Link}
            to={linkDestination}
        >
            <ListItemAvatar
                style={{
                    height: theme.spacing(10),
                    width: theme.spacing(10),
                }}
            >
                <Avatar
                    style={{
                        height: theme.spacing(8),
                        width: theme.spacing(8),
                    }}
                >
                    {system.name[0]}
                </Avatar>
            </ListItemAvatar>
            <Box width="60%">
                <ListItemText
                    primary={
                        <Typography variant="h5" component="p">
                            {system.name}
                        </Typography>
                    }
                    secondary={
                        <>
                            <Typography variant="body1" component="p">
                                {system.description}
                            </Typography>
                            <br />
                            <Typography
                                variant="body2"
                                component="p"
                                gutterBottom
                            >
                                {getTimeSinceUpdatedMessage(
                                    dayjs(parseInt(system.updatedAt))
                                )}
                            </Typography>
                        </>
                    }
                />
            </Box>
        </ListItem>
    );
};
