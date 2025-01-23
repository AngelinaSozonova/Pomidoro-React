import * as s from "./style";

interface ISwitch {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  size?: "small" | "middle" | "large";
  className?: string;
}

const Switch = ({ label, onChange, checked, size = "middle", className }: ISwitch) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange && onChange(e);
  };

  return (
    <s.wrap className={className}>
      {label && (
        <s.label htmlFor="checkbox" className="label">
          {label}
        </s.label>
      )}
      <s.checkbox
        className="checkbox"
        type="checkbox"
        id="checkbox"
        onChange={(e) => handleChange(e)}
        checked={checked || false}
        $size={size}
      />
    </s.wrap>
  );
};

export default Switch;
