import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import {BsFillArrowDownSquareFill} from "react-icons/bs";

export const UserActionMenu = () => {
  return (
    <Menu>
      <MenuButton as={Button} >
        <BsFillArrowDownSquareFill />
      </MenuButton>
      <MenuList>
        <MenuItem>Block</MenuItem>
        <MenuItem color='red'>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};
