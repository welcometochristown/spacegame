import { ChangeEvent, useState } from "react";
import { Input, InputGroup, Label } from "reactstrap";
import { IOptions } from "../../Game/Interfaces";
import Dialog, { DIALOG_TYPE, IDialogProps } from "../Dialog";

export interface IOptionsDialogProps extends IDialogProps<IOptions> {}

const OptionsDialog: React.FC<IOptionsDialogProps> = ({
  item,
  title = "Options",
  type = DIALOG_TYPE.OkCancel,
  ...rest
}) => {
  const [option1, setOption1] = useState<string | undefined>(item?.option1);

  const getOptions = (): IOptions | undefined =>
    !item
      ? undefined
      : {
          ...item,
          option1: option1!,
        };

  const handleOption1Changed = (event: ChangeEvent<HTMLInputElement>) => {
    setOption1(event.target.value);
  };

  if (!item) return <></>;

  return (
    <Dialog
      item={item}
      title={title}
      type={type}
      getItem={getOptions}
      {...rest}
    >
      <InputGroup>
        <Label>Option 1</Label>
        <Input
          type="text"
          onChange={handleOption1Changed}
          value={option1 ?? ""}
        />
      </InputGroup>
    </Dialog>
  );
};

export default OptionsDialog;
