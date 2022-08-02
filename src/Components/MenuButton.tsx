import React from "react";
import { Button, ButtonProps } from "reactstrap";

interface IMenuButton extends ButtonProps {}

const MenuButton: React.FC<IMenuButton> = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};

export default MenuButton;
