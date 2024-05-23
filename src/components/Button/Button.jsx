import PropTypes from "prop-types";

function Button({ children, onClick = () => {}, style = "btn-secondary text-white" }) {
  return (
    <button className={"text-lg btn " + style} onClick={onClick}>
      {children}
    </button>
  );
}

Button.PropTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.string,
}

export default Button;
