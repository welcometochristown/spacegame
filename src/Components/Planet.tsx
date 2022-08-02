interface IPlanetProps {
  name: string;
  onClick?: () => void;
}

const Planet: React.FC<IPlanetProps> = ({ name, onClick }) => {
  return <div onClick={onClick}>{name}</div>;
};

export default Planet;
