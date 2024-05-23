import propTypes from "prop-types";

function Button({ children, onClick = () => {}, style = "btn-secondary text-white" }) {
  return (
    <button className={"text-lg btn " + style} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  text: propTypes.string.isRequired,
  onClick: propTypes.func,
  style: propTypes.string,
}

export default Button;
