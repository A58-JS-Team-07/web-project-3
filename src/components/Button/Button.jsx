import propTypes from "prop-types";

function Button({ children, onClick = () => {}, style = "btn-secondary text-white" }) {
  return (
    <button className={"text-lg btn " + style} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: propTypes.any.isRequired,
  onClick: propTypes.func,
  style: propTypes.string,
}

export default Button;
