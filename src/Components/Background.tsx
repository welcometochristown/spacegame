const BackGround: React.FC = ({ children }) => {
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      {children}
    </div>
  );
};

export default BackGround;
