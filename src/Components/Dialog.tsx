import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export interface IDialogProps<T> {
  item?: T;
  title?: string;
  type?: DIALOG_TYPE;
  isOpen?: boolean;
  onClose?: (result: DIALOG_RESULT, newItem: T) => void;
}

interface IDialogInternalProps<T> extends IDialogProps<T> {
  getItem: () => T;
}

export enum DIALOG_TYPE {
  YesNo,
  YesNoCancel,
  OkCancel,
  Ok,
}

export enum DIALOG_RESULT {
  Yes,
  No,
  Cancel,
  Ok,
}

const renderButtons = (
  getItem: () => any,
  type?: DIALOG_TYPE,
  onClose?: (result: DIALOG_RESULT, newItem: any) => void
) => {
  const item = getItem();

  if (type === DIALOG_TYPE.Ok)
    return (
      <Button onClick={() => onClose?.(DIALOG_RESULT.Ok, item)}>Ok</Button>
    );

  if (type === DIALOG_TYPE.OkCancel)
    return (
      <>
        <Button onClick={() => onClose?.(DIALOG_RESULT.Ok, item)}>Ok</Button>
        <Button onClick={() => onClose?.(DIALOG_RESULT.Cancel, item)}>
          Cancel
        </Button>
      </>
    );

  if (type === DIALOG_TYPE.YesNo)
    return (
      <>
        <Button onClick={() => onClose?.(DIALOG_RESULT.Yes, item)}>Yes</Button>
        <Button onClick={() => onClose?.(DIALOG_RESULT.No, item)}>No</Button>
      </>
    );

  if (type === DIALOG_TYPE.YesNoCancel)
    return (
      <>
        <Button onClick={() => onClose?.(DIALOG_RESULT.Yes, item)}>Yes</Button>
        <Button onClick={() => onClose?.(DIALOG_RESULT.No, item)}>No</Button>
        <Button onClick={() => onClose?.(DIALOG_RESULT.Cancel, item)}>
          Cancel
        </Button>
      </>
    );
  return <></>;
};

const Dialog: React.FC<IDialogInternalProps<any>> = ({
  item,
  title,
  type = DIALOG_TYPE.Ok,
  children,
  isOpen,
  onClose,
  getItem,
}) => {
  return (
    <Modal isOpen={isOpen} style={{ display: "float" }}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{children}</ModalBody>
      <ModalFooter>{renderButtons(getItem, type, onClose)}</ModalFooter>
    </Modal>
  );
};

export default Dialog;
