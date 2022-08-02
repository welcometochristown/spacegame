import { ChangeEvent, useEffect, useState } from "react";
import { InputGroup, Label, Input } from "reactstrap";
import { BUILDING_TYPE, ICity, IPlanet } from "../../Game/Interfaces";
import { range } from "../../Utils/util";
import Building from "../Building";
import Dialog, { DIALOG_TYPE, IDialogProps } from "../Dialog";

export interface IPlanetDialogProps extends IDialogProps<IPlanet> {
  onPlanetChanged?: (newPlanet: IPlanet) => void;
  onBuild?: (type: BUILDING_TYPE, planet: IPlanet, city: ICity) => void;
}

const PlanetDialog: React.FC<IPlanetDialogProps> = ({
  item,
  title = "Planet",
  type = DIALOG_TYPE.OkCancel,
  onPlanetChanged,
  onBuild,
  ...rest
}) => {
  const [name, setName] = useState<string>();
  const [cities, setCities] = useState<ICity[]>();

  const getPlanet = (): IPlanet | undefined =>
    !item
      ? undefined
      : {
          ...item,
          name: name!,
        };

  useEffect(() => {
    setName(item?.name);
  }, [item]);

  useEffect(() => {
    setCities(item?.cities);
  }, [item?.cities]);

  const handlePlanetNameChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const getCity = (r: number, c: number) => {
    const index = r * 3 + c;
    if (!cities || cities.length <= index) return undefined;
    return cities[index];
  };

  if (!item) return <></>;

  return (
    <Dialog item={item} title={title} type={type} {...rest} getItem={getPlanet}>
      <InputGroup>
        <Label>Name</Label>
        <Input
          type="text"
          onChange={handlePlanetNameChanged}
          value={name ?? ""}
        />
      </InputGroup>
      <table style={{ height: 250, width: 250, tableLayout: "fixed" }}>
        <tbody>
          {range(3).map((r) => (
            <tr key={`city_row_${r}`} style={{ height: `${100 / 3}%` }}>
              {range(3).map((c) => {
                const city = getCity(r, c);
                return (
                  <td
                    key={`city_col_${c}`}
                    style={{
                      border: "1px solid black",
                      backgroundColor: city ? "white" : "grey",
                    }}
                  >
                    {city ? (
                      <Building
                        building={city?.building}
                        onBuild={(type) => onBuild?.(type, item, city)}
                      />
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Dialog>
  );
};

export default PlanetDialog;
