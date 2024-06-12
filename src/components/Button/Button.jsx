import PropTypes from "prop-types";

/**
 * Button component renders a styled button with customizable content and behavior.
 * @param {string} props.children - The content of the button
 * @param {function} props.onClick - The function to be executed when the button is clicked
 * @param {string} props.style - The style of the button
 * @returns {JSX.Element}
 */

function Button({ children, onClick = () => {}, style = "btn-secondary text-white" }) {
  return (
    <button className={"text-lg btn " + style} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  style: PropTypes.string,
}

export default Button;
