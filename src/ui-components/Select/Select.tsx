import { ReactNode, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as s from "./style";

export interface IOptions {
  label: string;
  value: string;
}

interface ISelect {
  className?: string;
  options?: IOptions[];
  arrow?: ReactNode;
  value?: IOptions;
  onChange?: (option: IOptions) => void;
}

const Select = ({ className, options, arrow, value, onChange }: ISelect) => {
  const [isOpenList, setIsOpenList] = useState(false);
  const [selectOption, setSelectOption] = useState<IOptions | null>(value || null);
  const ref = useRef<HTMLDivElement>(null);

  const onOpenList = () => setIsOpenList(!isOpenList);

  const onSelectOption = (option: IOptions) => {
    setSelectOption(option);
    setIsOpenList(false);
    onChange && onChange(option);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setIsOpenList(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <s.wrap ref={ref} className={className} $isOpen={isOpenList}>
      <s.resultBlock
        onClick={onOpenList}
        $selectOption={selectOption}
        className="result"
      >
        <span>{selectOption?.label}</span>
        {arrow ? (
          arrow
        ) : (
          <s.arrowBottom
            $isOpenList={isOpenList}
            className="arrow"
          />
        )}
      </s.resultBlock>
      {isOpenList && (
        <s.list className="list">
          {options?.map((item) => {
            if (item.value !== selectOption?.value) {
              return (
                <s.item key={uuidv4()} onClick={() => onSelectOption(item)} className="item">
                  {item.label}
                </s.item>
              );
            }
          })}
        </s.list>
      )}
    </s.wrap>
  );
};

export default Select;
