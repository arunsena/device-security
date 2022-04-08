import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

// Styles
const StyledButton = styled.button`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #eee;
  color: ${({ disabled }) => (disabled ? "#eee" : "#666")};
  cursor: pointer;
  font-size: 1em;
  min-width: 100px;
  padding: 15px;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#fff" : "#eee")};
    color: ${({ disabled }) => disabled && "#eee"};
  }
`;

// Button Component
const Button = (props) => {
  const { buttonProps, disabled, label, handleOnClick } = props;

  const onClick = (event) => {
    event.preventDefault();
    handleOnClick && handleOnClick(event);
  };

  return (
    <StyledButton
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={(event) => onClick(event)}
      type="button"
      {...buttonProps}
    >
      {label}
    </StyledButton>
  );
};

// PropTypes
Button.propTypes = {
  buttonProps: PropTypes.object,
  disabled: PropTypes.bool,
  handleOnClick: PropTypes.func,
  label: PropTypes.string,
};

// Default props
Button.defaultProps = {
  disabled: false,
  label: "Button",
};

export default Button;
