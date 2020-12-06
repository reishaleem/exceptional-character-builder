import { Avatar, Box, Button, Menu } from "@material-ui/core";
import { ReactNode, MouseEvent, useState, Children, cloneElement } from "react";

interface Props {
    avatarImage?: string;
    dropdownText: string;
    buttonDropdownType: "avatar" | "button";
    children?: any;
}

export const UserMenu = ({
    avatarImage,
    dropdownText,
    buttonDropdownType,
    children,
}: Props) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const items = Children.map(children, (child) => {
        return cloneElement(child, {
            onClick: handleClose,
        });
    });

    return (
        <>
            <Box onClick={handleClick}>
                {buttonDropdownType === "avatar" ? (
                    <Avatar
                        alt={dropdownText[0]}
                        src={avatarImage}
                        style={{ cursor: "pointer" }}
                    />
                ) : (
                    <Button>{dropdownText}</Button>
                )}
            </Box>
            <Menu
                id="user-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                getContentAnchorEl={null}
                elevation={1}
            >
                {items}
            </Menu>
        </>
    );
};
