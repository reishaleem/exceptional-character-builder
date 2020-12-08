import { Avatar, Button, Menu } from "@material-ui/core";
import { MouseEvent, useState, Children, cloneElement } from "react";

interface Props {
    avatarImage?: string;
    dropdownText: string;
    buttonDropdownType: "avatar" | "button";
    children?: any; // typed as any so that we can use cloneElement on each child
}

export const UserMenu = ({
    avatarImage,
    dropdownText,
    buttonDropdownType,
    children,
}: Props) => {
    const [anchorEl, setAnchorEl] = useState<
        HTMLButtonElement | HTMLDivElement | null
    >(null);

    const handleClick = (
        event: MouseEvent<HTMLButtonElement> | MouseEvent<HTMLDivElement>
    ) => {
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
            {buttonDropdownType === "avatar" ? (
                <Avatar
                    alt={dropdownText[0]}
                    src={avatarImage}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                />
            ) : (
                <Button>{dropdownText}</Button>
            )}
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
