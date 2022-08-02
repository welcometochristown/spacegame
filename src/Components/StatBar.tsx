import { toDict } from "../Utils/util";
import StatBarItem from "./StatBarItem";

export interface IStatBar {
  stats: IStats;
}

export interface IStats {
  credits: number;
  ships: number;
}

const StatBar: React.FC<IStatBar> = ({ stats }) => {
  const statDict = toDict(stats);
  return (
    <>
      <table>
        <tbody>
          <tr>
            {Object.keys(stats).map((s) => (
              <td key={s}>
                <StatBarItem>{statDict[s]}</StatBarItem>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default StatBar;
