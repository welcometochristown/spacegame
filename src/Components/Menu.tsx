import { Navbar } from "reactstrap";
import MenuButton from "./MenuButton";

export interface IMenuProps {
  onOptionsClicked: () => void;
}

const Menu: React.FC<IMenuProps> = ({ onOptionsClicked }) => {
  return (
    <>
      <Navbar>
        <MenuButton onClick={onOptionsClicked}>Options</MenuButton>
        <MenuButton>Fleet</MenuButton>
        <MenuButton>Planets</MenuButton>
        <MenuButton>Finances</MenuButton>
        <MenuButton>Diplomacy</MenuButton>
      </Navbar>
    </>
  );
};

export default Menu;
