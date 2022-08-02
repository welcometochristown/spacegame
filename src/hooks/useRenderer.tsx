import BackGround from "../Components/Background";
import Galaxy from "../Components/Galaxy";
import { IGalaxy } from "../Game/Interfaces";

const useRenderer = () => {
  const render = (galaxy: IGalaxy) => {
    return (
      <></>
      // <BackGround>
      //   <Galaxy planets={galaxy.planets} size={galaxy.size} />
      // </BackGround>
    );
  };
  return { render };
};

export default useRenderer;
