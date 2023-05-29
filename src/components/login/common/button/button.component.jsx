import "./button.css";

const Button = ({ name, ...element_props }) => {
  return (
    <div className="button-container">
      <button {...element_props}>{name}</button>
    </div>
  );
};

export default Button;