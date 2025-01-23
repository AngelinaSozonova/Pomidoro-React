import { useEffect, useRef, useState } from "react";
import * as s from "./style";

type placementType = "left" | "right" | "center";

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  setIsOpen?: (open: boolean) => void;
  placement?: placementType;
}

const NOOP = () => {};

const Dropdown = ({
  button,
  children,
  isOpen,
  onOpen = NOOP,
  onClose = NOOP,
  setIsOpen,
  placement = "left",
}: IDropdownProps) => {
  const [isOpenDropdownState, setIsOpenDropdownState] = useState(isOpen);
  const isOpenDropdown = isOpen ? isOpen : isOpenDropdownState;
  const setIsOpenDropdown = setIsOpen ? setIsOpen : setIsOpenDropdownState;

  const [widthButton, setWidthButton] = useState({
    width: 0,
    height: 0,
  });

  const [widthList, setWidthList] = useState({
    width: 0,
    height: 0,
  });

  const refButton = useRef<HTMLDivElement>(null);
  const refList = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsOpenDropdown(isOpen);
    }
  }, [isOpen, setIsOpenDropdown]);

  useEffect(
    () => (isOpenDropdown ? onOpen() : onClose()),
    [isOpenDropdown, onClose, onOpen]
  );

  useEffect(() => {
    if (isOpenDropdown && placement === "center") {
      if (refButton?.current) {
        setWidthButton({
          width: refButton.current.offsetWidth,
          height: refButton.current.offsetHeight,
        });
      }

      if (refList?.current) {
        const firstChild = refList.current.firstChild;

        if (firstChild instanceof HTMLElement) {
          setWidthList({
            width: firstChild.offsetWidth,
            height: firstChild.offsetHeight,
          });
        }
      }
    }
  }, [isOpenDropdown, placement]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        refList.current &&
        !refList.current.contains(event.target) &&
        refButton.current &&
        !refButton.current.contains(event.target)
      ) {
        setIsOpenDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setIsOpenDropdown]);

  const handleOpen = () => {
    if (isOpen === undefined) setIsOpenDropdown(!isOpenDropdown);
  };

  return (
    <div style={{ position: "relative" }}>
      <div onClick={handleOpen} ref={refButton}>
        {button}
      </div>
      {isOpenDropdown && (
        <s.listContainer>
          <s.list
            ref={refList}
            $widthButton={widthButton.width}
            $heightButton={widthButton.height}
            $widthList={widthList.width}
            $placement={placement}
            onClick={() => setIsOpenDropdown(false)}
          >
            {children}
          </s.list>
        </s.listContainer>
      )}
    </div>
  );
};

export default Dropdown;
