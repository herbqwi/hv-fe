import Button from "../../login/common/button/button.component";
import "./select-button.css";

interface IProps {
  isSelected?: boolean,
  toggleSelected: any,
  disabled?: boolean,
}

const SelectButton = ({ isSelected, toggleSelected, disabled }: IProps) => {
  return (
    <div className="select-button">
      {isSelected ? <Button disabled={disabled} style={{ backgroundColor: '#e63946', borderColor: `#e63946` }} onClick={toggleSelected} name="UNSELECT"></Button> : <Button disabled={disabled} onClick={toggleSelected} name={`${disabled ? `VOTED` : `SELECT`}`}></Button>}
    </div>
  );
};

export default SelectButton;