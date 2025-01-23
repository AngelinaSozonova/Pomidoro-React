import { ReactNode, useState } from "react";
import * as s from "./style";
import CloseIcon from "../../components/Icons/ClostIcon";

interface IModal {
  children?: ReactNode;
  open?: boolean;
  setOpen?: (state: boolean) => void;
  footer?: ReactNode | null;
  style?: React.CSSProperties;
  onCanel?: () => void;
  title?: string;
  width?: string;
  onOk?: () => void;
}

const Modal = ({
  children,
  open = false,
  setOpen,
  style,
  onCanel,
  title,
  footer,
  onOk,
}: IModal) => {
  const [isOpenState, setIsOpenState] = useState(open);

  const isOpen = open ? open : isOpenState;
  const setIsOpen = setOpen ? setOpen : setIsOpenState;

  const onClose = () => {
    onCanel && onCanel();
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <s.modal>
          <s.modalBlock style={style}>
            <s.buttonClose onClick={onClose}>
              <CloseIcon />
            </s.buttonClose>
            {title && <s.title>{title}</s.title>}
            {children}
            {footer || footer === null ? (
              footer
            ) : (
              <s.wrapFooter>
                <s.buttonFooter onClick={onClose}>Отмена</s.buttonFooter>
                <s.buttonFooter onClick={onOk}>Ок</s.buttonFooter>
              </s.wrapFooter>
            )}
          </s.modalBlock>
        </s.modal>
      )}
    </>
  );
};

export default Modal;
