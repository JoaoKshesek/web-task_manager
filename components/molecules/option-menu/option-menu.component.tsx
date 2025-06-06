import { MouseEvent, useState, ReactNode } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@/components";
import { OptionType, OptionsMenuType, OptionMenuItemType } from "./option-menu.types";

const MenuItemWrapper = ({ children, option }: { children: ReactNode; option: OptionMenuItemType }) => {
  if (option.href) {
    return (
      <Box
        component={Link}
        href={option.href}
        target={option.target}
        {...option.linkProps}
        sx={{
          px: 2,
          py: 1.5,
          width: "100%",
          display: "flex",
          color: "inherit",
          alignItems: "center",
          textDecoration: "none",
        }}
      >
        {children}
      </Box>
    );
  } else {
    return <>{children}</>;
  }
};

const OptionsMenu = (props: OptionsMenuType) => {
  const { icon, options, menuProps, iconProps, leftAlignMenu, iconButtonProps } = props;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton aria-haspopup="true" onClick={handleClick} {...iconButtonProps}>
        {icon ? icon : <Icon icon="mdi:dots-vertical" {...iconProps} />}
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
        {...(!leftAlignMenu && {
          anchorOrigin: { vertical: "bottom", horizontal: "right" },
          transformOrigin: { vertical: "top", horizontal: "right" },
        })}
        {...menuProps}
      >
        {options.map((option: OptionType, index: number) => {
          if (typeof option === "string") {
            return (
              <MenuItem key={index} onClick={handleClose}>
                {option}
              </MenuItem>
            );
          } else if ("divider" in option) {
            return option.divider && <Divider key={index} {...option.dividerProps} />;
          } else {
            return (
              <MenuItem
                key={index}
                {...option.menuItemProps && { sx: { px: 2 } }}
                {...(option.href && { sx: { p: 0 } })}
                onClick={(e) => {
                  handleClose();
                  if (option.menuItemProps?.onClick) {
                    option.menuItemProps.onClick(e);
                  }
                }}
              >
                <MenuItemWrapper option={option}>
                  {option.icon ? option.icon : null}
                  {option.text}
                </MenuItemWrapper>
              </MenuItem>
            );
          }
        })}
      </Menu>
    </>
  );
};

export default OptionsMenu;
